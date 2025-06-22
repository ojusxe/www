#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function decompressFrame(frameNumber) {
  const frameDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt');
  const filename = `frame-${String(frameNumber).padStart(6, '0')}.txt.gz`;
  const filepath = path.join(frameDir, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`Frame ${frameNumber} not found`);
    return null;
  }
  
  try {
    const compressedBase64 = fs.readFileSync(filepath, 'utf8');
    const compressedData = Buffer.from(compressedBase64, 'base64');
    const decompressedData = zlib.gunzipSync(compressedData);
    const content = decompressedData.toString('utf8');
    return content;
  } catch (error) {
    console.error(`Error decompressing frame ${frameNumber}:`, error.message);
    return null;
  }
}

function analyzeFrame(content, frameNumber) {
  if (!content) return null;
  
  const lines = content.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);
  
  // Find the actual content bounds
  let minY = lines.length, maxY = -1;
  let minX = Infinity, maxX = -1;
  
  lines.forEach((line, y) => {
    if (line.trim().length > 0) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      
      const firstChar = line.search(/\S/);
      const lastChar = line.search(/\S\s*$/);
      if (firstChar !== -1) {
        minX = Math.min(minX, firstChar);
        maxX = Math.max(maxX, lastChar);
      }
    }
  });
  
  const height = maxY - minY + 1;
  const width = maxX - minX + 1;
  
  // Get unique characters
  const chars = new Set();
  content.split('').forEach(char => {
    if (char !== ' ' && char !== '\n' && char !== '\r') {
      chars.add(char);
    }
  });
  
  return {
    frameNumber,
    totalLines: lines.length,
    contentHeight: height,
    contentWidth: width,
    centerX: Math.round((minX + maxX) / 2),
    centerY: Math.round((minY + maxY) / 2),
    characters: Array.from(chars).sort(),
    bounds: { minX, maxX, minY, maxY }
  };
}

// Analyze key frames
console.log('🔍 ANALYZING ORIGINAL DRIS-FRAMES-ALT...\n');

const keyFrames = [7, 20, 40, 80, 120, 156]; // Start, early, mid, late, end
const analyses = [];

keyFrames.forEach(frameNum => {
  const content = decompressFrame(frameNum);
  const analysis = analyzeFrame(content, frameNum);
  
  if (analysis) {
    analyses.push(analysis);
    console.log(`=== FRAME ${frameNum} ANALYSIS ===`);
    console.log(`Canvas Size: ${analysis.totalLines} lines`);
    console.log(`Content Size: ${analysis.contentWidth}x${analysis.contentHeight} chars`);
    console.log(`Center Position: (${analysis.centerX}, ${analysis.centerY})`);
    console.log(`Characters Used: [${analysis.characters.join(', ')}]`);
    console.log(`Bounds: X(${analysis.bounds.minX}-${analysis.bounds.maxX}) Y(${analysis.bounds.minY}-${analysis.bounds.maxY})`);
    console.log('');
  }
});

// Show actual frame content for first few frames
console.log('\n🎬 ORIGINAL FRAME CONTENT SAMPLES:\n');

[7, 10, 20].forEach(frameNum => {
  const content = decompressFrame(frameNum);
  if (content) {
    console.log(`=== FRAME ${frameNum} CONTENT ===`);
    console.log(content);
    console.log('');
  }
});

// Determine animation pattern
console.log('\n📊 ANIMATION PATTERN ANALYSIS:');
if (analyses.length >= 3) {
  const sizes = analyses.map(a => a.contentWidth * a.contentHeight);
  console.log('Content sizes over time:', sizes);
  
  const isZoomingOut = sizes[1] > sizes[sizes.length - 1];
  console.log('Animation direction:', isZoomingOut ? 'ZOOM OUT' : 'ZOOM IN');
  
  console.log('Characters consistently used:', analyses[0].characters);
}
