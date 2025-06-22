#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// PERFECT SQUARE ANIMATION - 3 seconds exactly
const TOTAL_DURATION_MS = 3000;  // Exactly 3 seconds
const FRAMERATE_MS = 20;         // 50fps for smooth animation
const FRAME_COUNT = TOTAL_DURATION_MS / FRAMERATE_MS; // 150 frames

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 60;

// Bold lowercase letters: o, j, u, s, g (using Unicode bold)
const CHARS = ['𝐨', '𝐣', '𝐮', '𝐬', '𝐠'];

function getChar(variation) {
  return CHARS[variation % CHARS.length];
}

// Simple smooth easing - no complex curves that could cause alternating behavior
function easeOut(t) {
  return 1 - Math.pow(1 - t, 2);
}

function createSquareFrame(frame, totalFrames) {
  const canvas = Array(CANVAS_HEIGHT).fill().map(() => Array(CANVAS_WIDTH).fill(' '));
  
  const progress = frame / (totalFrames - 1);
  const centerX = Math.floor(CANVAS_WIDTH / 2);
  const centerY = Math.floor(CANVAS_HEIGHT / 2);
  
  if (progress <= 0.85) {
    // Phase 1: ONLY zoom out (85% of animation)
    const zoomProgress = progress / 0.85;
    
    // Simple zoom out calculation - start big, end small
    const startSize = 45;
    const endSize = 8;
    const easedProgress = easeOut(zoomProgress);
    const currentSize = startSize - (startSize - endSize) * easedProgress;
    
    // Calculate perfect square dimensions
    // ASCII chars are roughly 2:1 width:height ratio, so for visual square:
    const charWidth = Math.floor(currentSize * 0.8);   // Horizontal char count
    const charHeight = Math.floor(currentSize * 0.4);  // Vertical char count
    
    // Ensure minimum size
    const safeWidth = Math.max(2, charWidth);
    const safeHeight = Math.max(1, charHeight);
    
    // Draw solid square - no fancy patterns that could cause shape distortion
    for (let y = centerY - safeHeight; y <= centerY + safeHeight; y++) {
      for (let x = centerX - safeWidth; x <= centerX + safeWidth; x++) {
        if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
          // Simple character variation based on position
          const variation = (x + y + Math.floor(frame / 10)) % 5;
          canvas[y][x] = getChar(variation);
        }
      }
    }
    
  } else {
    // Phase 2: Single smooth flip (15% of animation)
    const flipProgress = (progress - 0.85) / 0.15;
    
    const baseSize = 8;
    const baseWidth = Math.floor(baseSize * 0.8);
    const baseHeight = Math.floor(baseSize * 0.4);
    
    // Single flip: compress width using sine wave (0 to PI for single flip)
    const flipAngle = flipProgress * Math.PI;
    const compression = Math.abs(Math.cos(flipAngle)); // Goes from 1 to 0 to 1 (single flip)
    
    const compressedWidth = Math.max(1, Math.floor(baseWidth * compression));
    
    // Draw flipping square
    for (let y = centerY - baseHeight; y <= centerY + baseHeight; y++) {
      for (let x = centerX - compressedWidth; x <= centerX + compressedWidth; x++) {
        if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
          const variation = (x + y + Math.floor(frame / 10)) % 5;
          canvas[y][x] = getChar(variation);
        }
      }
    }
  }
  
  return canvas.map(row => row.join('')).join('\n');
}

async function generateFrames() {
  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt');
  
  // Backup existing
  const backupDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt-backup');
  if (fs.existsSync(outputDir) && !fs.existsSync(backupDir)) {
    console.log('🔄 Backing up existing frames...');
    fs.cpSync(outputDir, backupDir, { recursive: true });
  }
  
  // Create fresh directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log('🎬 Generating PERFECT SQUARE animation...');
  console.log(`⏱️  Duration: Exactly ${TOTAL_DURATION_MS}ms (3 seconds)`);
  console.log(`🎞️  Framerate: ${FRAMERATE_MS}ms per frame (${1000/FRAMERATE_MS}fps)`);
  console.log(`📊 Total Frames: ${FRAME_COUNT}`);
  console.log('🔤 Characters: Bold lowercase 𝐨, 𝐣, 𝐮, 𝐬, 𝐠');
  console.log('✨ Animation: Zoom OUT only + Single flip');
  
  for (let frame = 0; frame < FRAME_COUNT; frame++) {
    const frameContent = createSquareFrame(frame, FRAME_COUNT);
    
    // Compress and encode
    const compressed = zlib.gzipSync(Buffer.from(frameContent, 'utf8'));
    const base64Compressed = compressed.toString('base64');
    
    // Save frame (starting from 7 to match existing system)
    const frameNumber = frame + 7;
    const filename = `frame-${String(frameNumber).padStart(6, '0')}.txt.gz`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, base64Compressed);
    
    if (frame % 25 === 0 || frame === FRAME_COUNT - 1) {
      console.log(`✅ Generated frame ${frameNumber} (${Math.round(frame/FRAME_COUNT*100)}%)`);
    }
  }
  
  console.log('\n🎉 PERFECT SQUARE animation complete!');
  console.log(`📁 ${FRAME_COUNT} frames saved to: ${outputDir}`);
  console.log(`🎯 Frame range: 000007 to ${String(FRAME_COUNT + 6).padStart(6, '0')}`);
  
  // Preview key frames
  console.log('\n🎬 Animation Preview:');
  
  console.log('\n=== START: Large Square ===');
  console.log(createSquareFrame(0, FRAME_COUNT));
  
  console.log('\n=== MIDDLE: Medium Square ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.4), FRAME_COUNT));
  
  console.log('\n=== END OF ZOOM: Small Square ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.85), FRAME_COUNT));
  
  console.log('\n=== DURING FLIP: Compressed ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.925), FRAME_COUNT));
  
  console.log('\n=== FINAL: End State ===');
  console.log(createSquareFrame(FRAME_COUNT - 1, FRAME_COUNT));
  
  console.log(`\n🚀 Ready for playback at ${FRAMERATE_MS}ms intervals!`);
  console.log(`📋 Update header.tsx: totalFrames = ${FRAME_COUNT + 6}, frameRate = ${FRAMERATE_MS}`);
}

// Execute
generateFrames().catch(console.error);
