const fs = require('fs');
const zlib = require('zlib');

console.log('Decoding frames from dris-frames-alt...\n');

for(let i = 7; i <= 15; i++) {
  try {
    const framePath = `public/assets/dris-frames-alt/frame-${i.toString().padStart(6, '0')}.txt.gz`;
    const frame = fs.readFileSync(framePath, 'utf8');
    const compressed = Buffer.from(frame, 'base64');
    const decompressed = zlib.gunzipSync(compressed);
    console.log(`=== FRAME ${i} ===`);
    console.log(decompressed.toString());
    console.log('\n');
  } catch (error) {
    console.log(`Error reading frame ${i}:`, error.message);
  }
}
