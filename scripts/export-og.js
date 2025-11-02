// Simple helper to convert SVG social preview to PNG using sharp
// Usage: npm run export-og
// Requires: npm install --save-dev sharp

const fs = require('fs');
const path = require('path');

(async function main(){
  const svgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
  const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
  if (!fs.existsSync(svgPath)){
    console.error('SVG source not found:', svgPath);
    process.exit(1);
  }

  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.error('sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
  }

  try {
    const data = fs.readFileSync(svgPath);
    await sharp(data)
      .resize(1200, 630, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outPath);
    console.log('Exported PNG to', outPath);
  } catch (err) {
    console.error('Failed to export PNG:', err);
    process.exit(1);
  }
})();
