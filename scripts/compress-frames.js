// Script to pre-compress ASCII frames
import { createReadStream, createWriteStream, readdirSync } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { join } from 'path';

const framesDir = './public/ojus-ascii-frames';
const files = readdirSync(framesDir).filter(f => f.endsWith('.txt'));

console.log(`Compressing ${files.length} frames...`);

for (const file of files) {
  const input = join(framesDir, file);
  const output = join(framesDir, `${file}.gz`);
  
  await pipeline(
    createReadStream(input),
    createGzip({ level: 9 }),
    createWriteStream(output)
  );
}

console.log('Compression complete!');
