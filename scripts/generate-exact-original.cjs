#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// EXACT ORIGINAL SPECIFICATIONS
const FRAME_COUNT = 150;     // Exactly 150 frames (7-156)
const CANVAS_WIDTH = 80;     // Original uses ~80 char width
const CANVAS_HEIGHT = 40;    // Original uses exactly 40 lines

// EXACT original characters: o, j, u, s, g (normal lowercase)
const CHARS = ['o', 'j', 'u', 's', 'g'];

function getChar(x, y, frame) {
  // Same pattern as original - based on position and slight frame variation
  const index = (x + y + Math.floor(frame / 5)) % 5;
  return CHARS[index];
}

// Simple easing function
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function createSquareFrame(frame, totalFrames) {
  // Create exactly 40-line canvas like original
  const canvas = Array(CANVAS_HEIGHT).fill().map(() => Array(CANVAS_WIDTH).fill(' '));
  
  const progress = frame / (totalFrames - 1);
  
  // Center exactly like original (40, 20)
  const centerX = 40;
  const centerY = 20;
  
  // Original size progression analysis:
  // Frame 7: 55x27 chars
  // Frame 156: 5x11 chars
  // This is a smooth zoom-out from large to small
  
  const startWidth = 55;
  const startHeight = 27;
  const endWidth = 5;
  const endHeight = 11;
  
  // Apply easing for smooth zoom
  const easedProgress = easeOut(progress);
  
  const currentWidth = Math.floor(startWidth - (startWidth - endWidth) * easedProgress);
  const currentHeight = Math.floor(startHeight - (startHeight - endHeight) * easedProgress);
  
  // Ensure minimum size
  const safeWidth = Math.max(endWidth, currentWidth);
  const safeHeight = Math.max(endHeight, currentHeight);
  
  // Calculate half-dimensions for centering
  const halfWidth = Math.floor(safeWidth / 2);
  const halfHeight = Math.floor(safeHeight / 2);
  
  // Draw the filled rectangle exactly like original
  for (let y = centerY - halfHeight; y <= centerY + halfHeight; y++) {
    for (let x = centerX - halfWidth; x <= centerX + halfWidth; x++) {
      if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
        canvas[y][x] = getChar(x, y, frame);
      }
    }
  }
  
  return canvas.map(row => row.join('')).join('\n');
}

async function generateFrames() {
  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt');
  
  // Backup existing
  const backupDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt-backup-original');
  if (fs.existsSync(outputDir) && !fs.existsSync(backupDir)) {
    console.log('🔄 Backing up existing frames...');
    fs.cpSync(outputDir, backupDir, { recursive: true });
  }
  
  // Create fresh directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log('🎬 Generating PERFECT SQUARE animation with ORIGINAL SPECS...');
  console.log(`📐 Canvas: ${CANVAS_WIDTH}x${CANVAS_HEIGHT} (exact original)`);
  console.log(`🎞️  Frames: ${FRAME_COUNT} (7-156)`);
  console.log(`🔤 Characters: o, j, u, s, g (exact original)`);
  console.log(`📏 Size progression: 55x27 → 5x11 (exact original)`);
  console.log(`🎯 Center: (40, 20) (exact original)`);
  
  for (let frame = 0; frame < FRAME_COUNT; frame++) {
    const frameContent = createSquareFrame(frame, FRAME_COUNT);
    
    // Compress and encode exactly like original
    const compressed = zlib.gzipSync(Buffer.from(frameContent, 'utf8'));
    const base64Compressed = compressed.toString('base64');
    
    // Save frame starting from 7 (exact original)
    const frameNumber = frame + 7;
    const filename = `frame-${String(frameNumber).padStart(6, '0')}.txt.gz`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, base64Compressed);
    
    if (frame % 25 === 0 || frame === FRAME_COUNT - 1) {
      console.log(`✅ Generated frame ${frameNumber} (${Math.round(frame/FRAME_COUNT*100)}%)`);
    }
  }
  
  console.log('\n🎉 PERFECT SQUARE animation with ORIGINAL SPECS complete!');
  console.log(`📁 ${FRAME_COUNT} frames saved to: ${outputDir}`);
  console.log(`🎯 Frame range: 000007 to ${String(FRAME_COUNT + 6).padStart(6, '0')}`);
  
  // Preview key frames matching original analysis
  console.log('\n🎬 Perfect Square Preview (matching original pattern):');
  
  console.log('\n=== FRAME 7: Large Square ===');
  console.log(createSquareFrame(0, FRAME_COUNT));
  
  console.log('\n=== FRAME 40: Medium Square ===');
  console.log(createSquareFrame(33, FRAME_COUNT));
  
  console.log('\n=== FRAME 80: Small Square ===');
  console.log(createSquareFrame(73, FRAME_COUNT));
  
  console.log('\n=== FRAME 156: Final Square ===');
  console.log(createSquareFrame(FRAME_COUNT - 1, FRAME_COUNT));
  
  console.log('\n🚀 Perfect square animation ready!');
  console.log('📋 Header.tsx should use: frameRate = 20, totalFrames = 156');
}

// Execute
generateFrames().catch(console.error);
