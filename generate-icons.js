const sharp = require('sharp');
const path = require('path');

// Use icon.png if it exists, otherwise fall back to icon.svg
const fs = require('fs');
const pngPath = path.join(__dirname, 'icon.png');
const src = fs.existsSync(pngPath) ? pngPath : path.join(__dirname, 'icon.svg');
const base = path.join(__dirname, 'android/app/src/main/res');

const sizes = [
  { dir: 'mipmap-mdpi',    px: 48  },
  { dir: 'mipmap-hdpi',    px: 72  },
  { dir: 'mipmap-xhdpi',   px: 96  },
  { dir: 'mipmap-xxhdpi',  px: 144 },
  { dir: 'mipmap-xxxhdpi', px: 192 },
];

(async () => {
  for (const { dir, px } of sizes) {
    const buf = await sharp(src).resize(px, px).png().toBuffer();
    const dest1 = path.join(base, dir, 'ic_launcher.png');
    const dest2 = path.join(base, dir, 'ic_launcher_round.png');
    await sharp(buf).toFile(dest1);
    await sharp(buf).toFile(dest2);
    console.log(`✓ ${dir} (${px}x${px})`);
  }
  console.log('\nDone! Run: npx react-native run-android');
})();
