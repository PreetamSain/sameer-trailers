const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const base = 'C:/Files/VS/Sameer Trailer/brochure/3d/Initial Scene - 2026-09-02';
const outDir = path.join(__dirname, '..', 'public', 'assets', 'trailer-frames-webp');

const p1 = path.join(base, '1');
const pngFiles = fs.readdirSync(p1).filter(f => f.endsWith('.png')).sort();

console.log(`Found ${pngFiles.length} transparent PNGs in folder 1:`, pngFiles);

async function convertTransparentPngs() {
  for (let i = 0; i < pngFiles.length; i++) {
    const f = pngFiles[i];
    const src = path.join(p1, f);
    const dst = path.join(outDir, `frame_${String(i + 1).padStart(4, '0')}.webp`);

    await sharp(src)
      .resize(1280, 720, { fit: 'inside' })
      .webp({ quality: 85, effort: 4, alphaQuality: 90 })
      .toFile(dst);
  }
  console.log(`Updated first ${pngFiles.length} frames with transparent WebP!`);
}

convertTransparentPngs();
