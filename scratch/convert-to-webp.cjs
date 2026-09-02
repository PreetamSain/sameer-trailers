const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inDir = path.join(__dirname, '..', 'public', 'assets', 'trailer-frames');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'trailer-frames-webp');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean old files in outDir
fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));

const files = fs.readdirSync(inDir).filter(f => f.endsWith('.jpg')).sort();
console.log(`Converting ${files.length} frames to optimized WebP...`);

async function run() {
  let totalSize = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const src = path.join(inDir, f);
    const dst = path.join(outDir, `frame_${String(i + 1).padStart(4, '0')}.webp`);
    
    // Resize to high-clarity 1280x720 at quality 80
    await sharp(src)
      .resize(1280, 720, { fit: 'inside' })
      .webp({ quality: 80, effort: 4 })
      .toFile(dst);
    
    totalSize += fs.statSync(dst).size;
  }
  console.log(`Converted ${files.length} WebP frames! Total payload size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

run();
