#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// MAXIMUM smoothness parameters
const FRAME_COUNT = 240; // 4x more frames for ultra-smooth ending
const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 65;

// Bold Unicode lowercase letters as requested: o, j, u, s, g
const CHARS = {
  primary: ['𝐨', '𝐣', '𝐮', '𝐬', '𝐠'], // Bold lowercase Unicode
  fill: ['𝐬', '𝐨', '𝐮', '𝐣', '𝐠'],    // Bold fill variations
  accent: ['𝐠', '𝐣', '𝐬', '𝐮', '𝐨']   // Bold accent variations
};

function getChar(frame, type, variation = 0) {
  const chars = CHARS[type] || CHARS.primary;
  const index = (frame + variation) % chars.length;
  return chars[index];
}

// Ultra-premium easing functions for maximum smoothness
function ultraSmoothEaseOut(t) {
  // Combines multiple premium easing curves
  const cubic = 1 - Math.pow(1 - t, 3);
  const sine = Math.sin(t * Math.PI * 0.5);
  const quart = 1 - Math.pow(1 - t, 4);
  const expo = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  
  // Weighted blend for ultimate smoothness
  return (cubic * 0.25 + sine * 0.25 + quart * 0.25 + expo * 0.25);
}

function createSquareFrame(frame, totalFrames) {
  const canvas = Array(CANVAS_HEIGHT).fill().map(() => Array(CANVAS_WIDTH).fill(' '));
  
  const progress = frame / (totalFrames - 1);
  const centerX = Math.floor(CANVAS_WIDTH * 0.5);
  const centerY = Math.floor(CANVAS_HEIGHT * 0.5);
  
  if (progress <= 0.88) {
    // Phase 1: ULTRA-smooth zoom-out (88% of animation for maximum smoothness)
    const zoomProgress = progress / 0.88;
    
    // Ultra-smooth size calculation with high precision
    const startSize = 48;
    const endSize = 12;
    const sizeRange = startSize - endSize;
    
    // Apply premium easing with sub-pixel precision
    let easedProgress = ultraSmoothEaseOut(zoomProgress);
    
    // Add high-frequency micro-smoothing for 240 frames
    const microSmooth1 = Math.sin(frame * 0.1) * 0.15;
    const microSmooth2 = Math.cos(frame * 0.07) * 0.1;
    const microSmooth3 = Math.sin(frame * 0.13) * 0.05;
    
    easedProgress += microSmooth1 + microSmooth2 + microSmooth3;
    easedProgress = Math.max(0, Math.min(1, easedProgress));
    
    let currentSize = startSize - (sizeRange * easedProgress);
    currentSize = Math.max(6, currentSize);
    
    // Perfect square proportions with fine-tuned precision
    const visualWidth = Math.floor(currentSize * 1.12);  // Perfect square width
    const visualHeight = Math.floor(currentSize * 0.56); // Perfect square height
    
    const safeWidth = Math.max(2, visualWidth);
    const safeHeight = Math.max(1, visualHeight);
    
    // Draw ultra-smooth filled square
    for (let y = centerY - safeHeight; y <= centerY + safeHeight; y++) {
      for (let x = centerX - safeWidth; x <= centerX + safeWidth; x++) {
        if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
          const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          const variation = Math.floor((x * 1.3 + y * 1.7 + frame * 0.2 + distanceFromCenter * 0.1) % 5);
          
          // Smooth edge detection
          const isEdge = (y === centerY - safeHeight) || (y === centerY + safeHeight) || 
                        (x === centerX - safeWidth) || (x === centerX + safeWidth);
          
          if (isEdge) {
            canvas[y][x] = getChar(frame, 'primary', variation);
          } else {
            const interiorVariation = (variation + Math.floor(distanceFromCenter / 2)) % 5;
            canvas[y][x] = getChar(frame, 'fill', interiorVariation);
          }
        }
      }
    }
    
  } else {
    // Phase 2: ULTRA-smooth single flip (12% of animation - longer for smoother flip)
    const flipProgress = (progress - 0.88) / 0.12;
    
    const baseSize = 12;
    const baseWidth = Math.floor(baseSize * 1.12);
    const baseHeight = Math.floor(baseSize * 0.56);
    
    // Ultra-smooth single flip with high precision
    const flipCycle = Math.sin(flipProgress * Math.PI); // Perfect single flip
    const compressionFactor = Math.abs(flipCycle);
    
    // Ultra-smooth width transition with micro-adjustments
    const minWidth = 1;
    const maxCompressionFactor = 0.98; // More dramatic but smooth compression
    let compressedWidth = baseWidth * (0.02 + compressionFactor * maxCompressionFactor);
    
    // Add micro-smoothing to flip transition
    const flipMicroSmooth = Math.sin(flipProgress * Math.PI * 6) * 0.3;
    compressedWidth += flipMicroSmooth;
    compressedWidth = Math.max(minWidth, Math.floor(compressedWidth));
    
    // Ultra-subtle motion blur for premium smoothness
    const blurIntensity = Math.pow(flipCycle, 4) * 0.1; // Very subtle
    
    // Draw ultra-smooth compressed square
    for (let y = centerY - baseHeight; y <= centerY + baseHeight; y++) {
      for (let x = centerX - compressedWidth; x <= centerX + compressedWidth; x++) {
        if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
          const variation = (x + y + frame) % 5;
          
          // Premium blur effect
          const distanceFromEdge = Math.min(
            Math.abs(x - (centerX - compressedWidth)), 
            Math.abs(x - (centerX + compressedWidth))
          );
          const normalizedDistance = distanceFromEdge / Math.max(1, compressedWidth);
          const blurChance = blurIntensity * (1 - normalizedDistance) * 0.2;
          
          if (Math.random() < blurChance) {
            canvas[y][x] = getChar(frame, 'accent', variation);
          } else {
            canvas[y][x] = getChar(frame, 'primary', variation);
          }
        }
      }
    }
  }
  
  return canvas.map(row => row.join('')).join('\n');
}

async function generateFrames() {
  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt');
  
  // Backup existing
  const backupDir = path.join(__dirname, '..', 'public', 'assets', 'dris-frames-alt-backup2');
  if (fs.existsSync(outputDir) && !fs.existsSync(backupDir)) {
    console.log('🔄 Backing up existing frames...');
    fs.cpSync(outputDir, backupDir, { recursive: true });
  }
  
  // Create fresh directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log('🎬 Generating ULTIMATE SMOOTH square animation...');
  console.log(`📊 Frames: ${FRAME_COUNT} (4x more for maximum smoothness)`);
  console.log('🔤 Characters: Bold lowercase 𝐨, 𝐣, 𝐮, 𝐬, 𝐠');
  console.log('⚡ Features: Ultra-smooth ending + perfect square + bold Unicode');
  
  for (let frame = 0; frame < FRAME_COUNT; frame++) {
    const frameContent = createSquareFrame(frame, FRAME_COUNT);
    
    // Compress and encode
    const compressed = zlib.gzipSync(Buffer.from(frameContent, 'utf8'));
    const base64Compressed = compressed.toString('base64');
    
    // Save frame (starting from 7)
    const frameNumber = frame + 7;
    const filename = `frame-${String(frameNumber).padStart(6, '0')}.txt.gz`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, base64Compressed);
    
    if (frame % 30 === 0) {
      console.log(`✅ Generated frame ${frameNumber}/${FRAME_COUNT + 6} (${Math.round(frame/FRAME_COUNT*100)}%)`);
    }
  }
  
  console.log('\n🎉 ULTIMATE SMOOTH animation complete!');
  console.log(`📁 ${FRAME_COUNT} frames saved to: ${outputDir}`);
  console.log(`🎯 Frame range: 000007 to ${String(FRAME_COUNT + 6).padStart(6, '0')}`);
  
  // Preview
  console.log('\n🎬 Ultra-Smooth Animation Preview:');
  console.log('\n=== Large Bold Square (Start) ===');
  console.log(createSquareFrame(10, FRAME_COUNT));
  
  console.log('\n=== Medium Square (Smooth Transition) ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.5), FRAME_COUNT));
  
  console.log('\n=== End of Zoom (Ultra-Smooth) ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.87), FRAME_COUNT));
  
  console.log('\n=== During Flip (Smooth Compression) ===');
  console.log(createSquareFrame(Math.floor(FRAME_COUNT * 0.94), FRAME_COUNT));
  
  console.log('\n=== Final Frame (Bold) ===');
  console.log(createSquareFrame(FRAME_COUNT - 1, FRAME_COUNT));
  
  console.log('\n🚀 Ready for ultra-smooth 60fps playback!');
  console.log('💡 Recommended: Use 16ms framerate for 60fps smoothness');
}

// Execute
generateFrames().catch(console.error);
