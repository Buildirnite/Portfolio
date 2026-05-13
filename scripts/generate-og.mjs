import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../public/og-image.png');

// 1200×630 SVG — dark violet bg, white name, violet-light role, tech line, URL
const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep violet background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0a2e"/>
      <stop offset="100%" stop-color="#0f0520"/>
    </linearGradient>

    <!-- Radial glow top-right -->
    <radialGradient id="glow1" cx="80%" cy="20%" r="45%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>

    <!-- Radial glow bottom-left -->
    <radialGradient id="glow2" cx="15%" cy="85%" r="40%">
      <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Decorative grid lines (subtle) -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#7c3aed" stroke-opacity="0.06" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#7c3aed" stroke-opacity="0.06" stroke-width="1"/>

  <!-- Top-right accent circle -->
  <circle cx="1080" cy="90" r="200" fill="none" stroke="#7c3aed" stroke-opacity="0.12" stroke-width="1.5"/>
  <circle cx="1080" cy="90" r="140" fill="none" stroke="#7c3aed" stroke-opacity="0.08" stroke-width="1"/>

  <!-- Bottom-left accent circle -->
  <circle cx="120" cy="560" r="160" fill="none" stroke="#6d28d9" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Left accent bar -->
  <rect x="80" y="160" width="4" height="310" rx="2" fill="#7c3aed" fill-opacity="0.8"/>

  <!-- Monospace label -->
  <text x="100" y="192" font-family="'Courier New', Courier, monospace" font-size="18"
        fill="#a78bfa" letter-spacing="4" opacity="0.9">// desarrollador full-stack</text>

  <!-- Name -->
  <text x="96" y="318" font-family="Georgia, 'Times New Roman', serif" font-size="96"
        font-weight="700" fill="#ffffff" letter-spacing="-2">Ronald Trejo</text>

  <!-- Role -->
  <text x="100" y="390" font-family="Georgia, 'Times New Roman', serif" font-size="42"
        font-weight="400" fill="#c4b5fd" letter-spacing="0.5">Desarrollador Full-Stack</text>

  <!-- Divider -->
  <rect x="100" y="428" width="520" height="2" rx="1" fill="#7c3aed" fill-opacity="0.5"/>

  <!-- Tech line -->
  <text x="100" y="476" font-family="'Courier New', Courier, monospace" font-size="26"
        fill="#e2d9f3" letter-spacing="1" opacity="0.85">React · Laravel · Python · React Native</text>

  <!-- URL badge -->
  <rect x="100" y="527" width="500" height="46" rx="8"
        fill="#7c3aed" fill-opacity="0.18" stroke="#7c3aed" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="350" y="557" font-family="'Courier New', Courier, monospace" font-size="20"
        fill="#a78bfa" text-anchor="middle" letter-spacing="1">buildirnite.github.io/portfolio</text>

  <!-- Violet dot in badge -->
  <circle cx="116" cy="550" r="5" fill="#7c3aed"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

sharp(svgBuffer)
  .png()
  .toFile(outPath)
  .then(() => console.log(`✓ og-image.png saved → ${outPath}`))
  .catch((err) => { console.error(err); process.exit(1); });
