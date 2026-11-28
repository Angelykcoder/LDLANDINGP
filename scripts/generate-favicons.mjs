import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { deflateSync } from "node:zlib";

const output = resolve(import.meta.dirname, "..", "assets", "icons");
const navy = [7, 27, 52];
const white = [255, 255, 255];
const samplesPerAxis = 4;
const wShape = [
  [7, 17], [14, 17], [18, 47], [26, 47], [31, 27], [36, 47], [44, 47],
  [51, 17], [44, 17], [40, 38], [35, 17], [27, 17], [22, 38], [18, 17]
];

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current, current += 1) {
    const [currentX, currentY] = polygon[current];
    const [previousX, previousY] = polygon[previous];
    if (
      (currentY > y) !== (previousY > y)
      && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX
    ) inside = !inside;
  }
  return inside;
}

function insideRoundedSquare(x, y) {
  const radius = 12;
  if (x >= radius && x <= 64 - radius) return y >= 0 && y <= 64;
  if (y >= radius && y <= 64 - radius) return x >= 0 && x <= 64;
  const centerX = x < radius ? radius : 64 - radius;
  const centerY = y < radius ? radius : 64 - radius;
  return (x - centerX) ** 2 + (y - centerY) ** 2 <= radius ** 2;
}

function insideLetters(x, y) {
  return pointInPolygon(x, y, wShape) || (x >= 53 && x <= 60 && y >= 17 && y <= 47);
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function makePng(size) {
  const stride = 1 + size * 4;
  const raw = Buffer.alloc(stride * size);
  const sampleCount = samplesPerAxis ** 2;

  for (let y = 0; y < size; y += 1) {
    const row = y * stride;
    raw[row] = 0;
    for (let x = 0; x < size; x += 1) {
      let backgroundSamples = 0;
      let letterSamples = 0;
      for (let sampleY = 0; sampleY < samplesPerAxis; sampleY += 1) {
        for (let sampleX = 0; sampleX < samplesPerAxis; sampleX += 1) {
          const sourceX = (x + (sampleX + 0.5) / samplesPerAxis) * 64 / size;
          const sourceY = (y + (sampleY + 0.5) / samplesPerAxis) * 64 / size;
          if (!insideRoundedSquare(sourceX, sourceY)) continue;
          backgroundSamples += 1;
          if (insideLetters(sourceX, sourceY)) letterSamples += 1;
        }
      }

      const offset = row + 1 + x * 4;
      if (!backgroundSamples) continue;
      const letterRatio = letterSamples / backgroundSamples;
      raw[offset] = Math.round(navy[0] + (white[0] - navy[0]) * letterRatio);
      raw[offset + 1] = Math.round(navy[1] + (white[1] - navy[1]) * letterRatio);
      raw[offset + 2] = Math.round(navy[2] + (white[2] - navy[2]) * letterRatio);
      raw[offset + 3] = Math.round(255 * backgroundSamples / sampleCount);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}

function makeIco(images) {
  const headerSize = 6 + images.length * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = headerSize;

  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const images = [16, 32, 48].map((size) => ({ size, data: makePng(size) }));
images.forEach(({ size, data }) => writeFileSync(join(output, `favicon-${size}x${size}.png`), data));
writeFileSync(join(output, "apple-touch-icon.png"), makePng(180));
writeFileSync(join(output, "favicon.ico"), makeIco(images));
console.log("Favicons WI generados en assets/icons.");
