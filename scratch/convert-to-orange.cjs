const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { execSync } = require('child_process');
const path = require('path');
const ffmpeg = ffmpegInstaller.path;

console.log('FFmpeg path:', ffmpeg);
// In the source video, the glowing element is cyan/blue (~195 deg).
// We want brand orange (~25 deg). Hue shift is +185 to +190 deg.
const inputPath = path.join(__dirname, 'cula-truck.mp4');
const outputPath = path.join(__dirname, '..', 'public', 'assets', 'weighbridge-telemetry-orange.mp4');

const cmd = `"${ffmpeg}" -y -i "${inputPath}" -vf "hue=h=185:s=1.3" -c:v libx264 -crf 20 -preset fast -pix_fmt yuv420p -an "${outputPath}"`;

console.log('Executing:', cmd);
execSync(cmd, { stdio: 'inherit' });
console.log('Successfully created orange video at:', outputPath);
