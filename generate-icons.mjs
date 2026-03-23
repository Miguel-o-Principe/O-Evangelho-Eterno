import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, 'public/images/capa.jpg');
const sizes = [192, 512];

for (const size of sizes) {
  const img = await Jimp.read(src);
  const min = Math.min(img.width, img.height);
  img
    .crop({ x: Math.floor((img.width - min) / 2), y: Math.floor((img.height - min) / 2), w: min, h: min })
    .resize({ w: size, h: size })
    .write(path.join(__dirname, `public/images/icon-${size}.png`));
  console.log(`✔ icon-${size}.png gerado`);
}
