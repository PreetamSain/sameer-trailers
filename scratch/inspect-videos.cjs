const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

const base = 'C:/Files/VS/Sameer Trailer/brochure/3d/Initial Scene - 2026-09-02';

['1.mp4', '2.mp4', '3.mp4'].forEach(v => {
  const filePath = path.join(base, v);
  try {
    const res = execSync(`"${ffmpeg.path}" -i "${filePath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    console.log(v, res);
  } catch (err) {
    const output = (err.stderr || err.stdout || '').toString();
    const duration = output.match(/Duration: [^,]+/);
    const video = output.match(/Video: [^\n]+/);
    console.log(v, duration ? duration[0] : 'No duration', video ? video[0] : 'No video stream');
  }
});
