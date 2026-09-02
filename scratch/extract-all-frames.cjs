const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

const base = 'C:/Files/VS/Sameer Trailer/brochure/3d/Initial Scene - 2026-09-02';
const outDir = path.join(__dirname, '..', 'public', 'assets', 'trailer-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean old files
fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));

console.log('Extracting frames from 1.mp4, 2.mp4, 3.mp4...');

// Extract frames at 10 fps (smooth 60-100 frames per 10s video, high fidelity)
const temp1 = path.join(__dirname, 'temp1');
const temp2 = path.join(__dirname, 'temp2');
const temp3 = path.join(__dirname, 'temp3');

[temp1, temp2, temp3].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.readdirSync(d).forEach(f => fs.unlinkSync(path.join(d, f)));
});

execSync(`"${ffmpeg.path}" -i "${path.join(base, '1.mp4')}" -r 8 -q:v 3 "${path.join(temp1, 'frame_%04d.jpg')}"`);
execSync(`"${ffmpeg.path}" -i "${path.join(base, '2.mp4')}" -r 8 -q:v 3 "${path.join(temp2, 'frame_%04d.jpg')}"`);
execSync(`"${ffmpeg.path}" -i "${path.join(base, '3.mp4')}" -r 8 -q:v 3 "${path.join(temp3, 'frame_%04d.jpg')}"`);

const f1 = fs.readdirSync(temp1).sort();
const f2 = fs.readdirSync(temp2).sort();
const f3 = fs.readdirSync(temp3).sort();

console.log(`Extracted: 1.mp4=${f1.length}, 2.mp4=${f2.length}, 3.mp4=${f3.length}`);

// Combine sequentially
let index = 1;

f1.forEach(f => {
  const target = path.join(outDir, `frame_${String(index).padStart(4, '0')}.jpg`);
  fs.copyFileSync(path.join(temp1, f), target);
  index++;
});

f2.forEach(f => {
  const target = path.join(outDir, `frame_${String(index).padStart(4, '0')}.jpg`);
  fs.copyFileSync(path.join(temp2, f), target);
  index++;
});

f3.forEach(f => {
  const target = path.join(outDir, `frame_${String(index).padStart(4, '0')}.jpg`);
  fs.copyFileSync(path.join(temp3, f), target);
  index++;
});

console.log(`Total combined frames: ${index - 1}`);
