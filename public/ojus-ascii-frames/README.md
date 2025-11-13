# ASCII Animation Frames

## Performance Strategy

### Current Setup: Plain `.txt` files with HTTP Compression

**Why this is the fastest approach:**

1. **Automatic HTTP Compression (Brotli/Gzip)**
   - Vercel/Next.js automatically compresses `.txt` files when serving
   - 70-90% size reduction (e.g., 10KB → 1-3KB per frame)
   - Native browser decompression (faster than JavaScript)

2. **Frame Caching**
   - First 10 frames are preloaded for instant animation start
   - All frames are cached after first load
   - Subsequent animations are instant

3. **Network Optimization**
   - Parallel loading of frames during animation
   - HTTP/2 multiplexing for efficient downloads
   - CDN edge caching (Vercel)

### Performance Metrics

**50 frames × ~2KB compressed = ~100KB total**
- Initial 10 frames: ~20KB (preloaded)
- Load time: <100ms on fast connection
- Animation starts: Instant (preloaded frames)

### Alternative Approaches Considered

❌ **Client-side Pako compression**
- Requires 45KB pako.js library
- JavaScript decompression slower than native
- More complex code

✅ **HTTP Server Compression (Current)**
- Zero overhead
- Native browser support
- Automatic, transparent

## File Format

Frames are numbered with 4-digit padding:
- `frame-0001.txt`
- `frame-0002.txt`
- ...
- `frame-0050.txt`

Each frame is plain ASCII art text.
