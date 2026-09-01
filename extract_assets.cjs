const fs = require('fs');
const path = require('path');

const htmlPath = 'public/assets/raw/sameer-trailers.full-page.Woblo/sameer-trailers/index.html';
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract all base64 images and save them as actual image files!
  const imgRegex = /<img[^>]+src=["'](data:image\/([^;]+);base64,([^"']+))["'][^>]*>/g;
  let match;
  let count = 0;
  const imgDir = 'public/assets/extracted';
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  const imagesFound = [];
  while ((match = imgRegex.exec(html)) !== null) {
    count++;
    const ext = match[2].includes('svg') ? 'svg' : match[2].includes('webp') ? 'webp' : match[2].includes('png') ? 'png' : 'jpg';
    const buffer = Buffer.from(match[3], 'base64');
    const filename = `img_${count}.${ext}`;
    const filePath = path.join(imgDir, filename);
    fs.writeFileSync(filePath, buffer);
    imagesFound.push({ filename, size: buffer.length, ext });
  }

  // Also clean the HTML text
  const cleanHtml = html.replace(/data:image\/[^;]+;base64,[^"']+/g, '[BASE64]');
  fs.writeFileSync('clean_woblo.html', cleanHtml);
  console.log(`Extracted ${count} images to ${imgDir}. Cleaned HTML length: ${cleanHtml.length}`);
  console.log(JSON.stringify(imagesFound.slice(0, 15), null, 2));
} else {
  console.log('HTML not found at', htmlPath);
}
