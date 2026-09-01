const sharp = require('sharp');
const path = require('path');

async function generatePerfectSafeOG() {
  const logoPath = path.join(__dirname, 'public', 'assets', 'extracted', 'img_1.png');
  const metadata = await sharp(logoPath).metadata();
  console.log('Original Logo:', metadata.width, 'x', metadata.height);

  // Canvas size for OpenGraph
  const ogWidth = 1200;
  const ogHeight = 630;

  // WhatsApp square crop window is 630x630 in the exact center (x from 285 to 915).
  // Therefore, the maximum logo width must be <= 520px so it never gets clipped in square view!
  const targetLogoWidth = 520;

  const logoOgBuffer = await sharp(logoPath)
    .resize({
      width: targetLogoWidth,
      fit: 'inside',
      kernel: sharp.kernel.lanczos3,
    })
    .toBuffer();

  const resizedOgMeta = await sharp(logoOgBuffer).metadata();
  console.log('Resized Logo Dimensions:', resizedOgMeta.width, 'x', resizedOgMeta.height);

  // Background Canvas (#FFFBF7)
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

  console.log('Generated public/og-image.png (1200x630 with 520px safe center logo)');

  // Also 512x512 square icon with 440px logo width
  const squareLogoBuffer = await sharp(logoPath)
    .resize({
      width: 440,
      fit: 'inside',
      kernel: sharp.kernel.lanczos3,
    })
    .toBuffer();

  const squareMeta = await sharp(squareLogoBuffer).metadata();

  const squareBgSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#FFFBF7"/>
    </svg>
  `;

  await sharp(Buffer.from(squareBgSvg))
    .composite([
      {
        input: squareLogoBuffer,
        top: Math.round((512 - squareMeta.height) / 2),
        left: Math.round((512 - squareMeta.width) / 2),
      },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(__dirname, 'public', 'logo.png'));

  console.log('Generated public/logo.png (512x512 with safe padding)');
}

generatePerfectSafeOG().catch(console.error);
