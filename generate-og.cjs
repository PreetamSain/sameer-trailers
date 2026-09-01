const sharp = require('sharp');
const path = require('path');

async function generateCleanOG() {
  const logoPath = path.join(__dirname, 'public', 'assets', 'extracted', 'img_1.png');
  const metadata = await sharp(logoPath).metadata();
  console.log('Original Logo:', metadata.width, 'x', metadata.height);

  // 1. 1200x630 High-Resolution OG Image with ONLY the Logo, perfectly centered, NO extra text
  const ogWidth = 1200;
  const ogHeight = 630;
  
  // Resize logo crisply to 850px width (large, sharp, clear, lanczos3 kernel)
  const logoOgBuffer = await sharp(logoPath)
    .resize({
      width: 860,
      fit: 'inside',
      kernel: sharp.kernel.lanczos3,
    })
    .toBuffer();

  const resizedOgMeta = await sharp(logoOgBuffer).metadata();

  // Create clean solid background (Pure White / #FFFBF7 for highest contrast)
  const bgSvg = `
    <svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${ogWidth}" height="${ogHeight}" fill="#FFFBF7"/>
    </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: logoOgBuffer,
        top: Math.round((ogHeight - resizedOgMeta.height) / 2),
        left: Math.round((ogWidth - resizedOgMeta.width) / 2),
      },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(__dirname, 'public', 'og-image.png'));

  console.log('Generated public/og-image.png (1200x630 - Sharp & Centered, No text)');

  // 2. 600x600 Square High-Res Logo for WhatsApp Square Preview
  const squareSize = 600;
  const squareLogoBuffer = await sharp(logoPath)
    .resize({
      width: 520,
      fit: 'inside',
      kernel: sharp.kernel.lanczos3,
    })
    .toBuffer();

  const squareMeta = await sharp(squareLogoBuffer).metadata();

  const squareBgSvg = `
    <svg width="${squareSize}" height="${squareSize}" viewBox="0 0 ${squareSize} ${squareSize}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${squareSize}" height="${squareSize}" fill="#FFFBF7"/>
    </svg>
  `;

  await sharp(Buffer.from(squareBgSvg))
    .composite([
      {
        input: squareLogoBuffer,
        top: Math.round((squareSize - squareMeta.height) / 2),
        left: Math.round((squareSize - squareMeta.width) / 2),
      },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(__dirname, 'public', 'logo.png'));

  console.log('Generated public/logo.png (600x600 - Sharp & Centered)');

  // 3. Apple touch icon 180x180
  await sharp(path.join(__dirname, 'public', 'logo.png'))
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));

  console.log('Generated public/apple-touch-icon.png');
}

generateCleanOG().catch(console.error);
