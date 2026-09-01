const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOG() {
  const logoPath = path.join(__dirname, 'public', 'assets', 'extracted', 'img_1.png');
  const metadata = await sharp(logoPath).metadata();
  console.log('Original Logo Dimensions:', metadata.width, 'x', metadata.height);

  // 1. Generate 1200x630 OG Banner with logo centered inside the 550x550 safe zone
  // Scale logo so width is ~500px to fit comfortably inside a square crop without touching edges
  const targetLogoWidth = 520;
  const resizedLogo = await sharp(logoPath)
    .resize({ width: targetLogoWidth, fit: 'inside' })
    .toBuffer();

  const resizedMeta = await sharp(resizedLogo).metadata();

  // Create SVG background overlay with subtle styling
  const svgOverlay = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#FFFBF7"/>
      <!-- Outer subtle border -->
      <rect x="20" y="20" width="1160" height="590" rx="24" fill="none" stroke="#EFE8DF" stroke-width="3"/>
      <!-- Bottom Badge -->
      <text x="600" y="520" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#736F6A" text-anchor="middle" letter-spacing="4">HEAVY DUTY COMMERCIAL TRAILER MANUFACTURER</text>
      <text x="600" y="555" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#F68722" text-anchor="middle" letter-spacing="3">BHILWARA, RAJASTHAN • ARAI AIS-113 CERTIFIED</text>
    </svg>
  `;

  const ogImage = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: resizedLogo,
        top: Math.round((630 - resizedMeta.height) / 2) - 40,
        left: Math.round((1200 - targetLogoWidth) / 2),
      },
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'og-image.png'));

  console.log('Generated public/og-image.png (1200x630)');

  // 2. Generate 512x512 Square Logo with generous safe padding for square thumbnail previews
  const squareLogoWidth = 420;
  const squareResizedLogo = await sharp(logoPath)
    .resize({ width: squareLogoWidth, fit: 'inside' })
    .toBuffer();
  const squareMeta = await sharp(squareResizedLogo).metadata();

  const squareSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#FFFBF7"/>
    </svg>
  `;

  await sharp(Buffer.from(squareSvg))
    .composite([
      {
        input: squareResizedLogo,
        top: Math.round((512 - squareMeta.height) / 2),
        left: Math.round((512 - squareLogoWidth) / 2),
      },
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'logo.png'));

  console.log('Generated public/logo.png (512x512 square with padding)');

  // 3. Apple touch icon 180x180
  await sharp(path.join(__dirname, 'public', 'logo.png'))
    .resize(180, 180)
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));

  console.log('Generated public/apple-touch-icon.png');
}

generateOG().catch(console.error);
