import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import wawoff2 from 'wawoff2'

const root = process.cwd()
const fontCache = path.join(root, 'node_modules', '.cache', 'plex-ttf')

const C = {
  top: '#0C1A2B',
  mid: '#0E2137',
  bottom: '#0A1522',
  client: '#31B0E6',
  server: '#F5B335',
  ink: '#F2F7FB',
  secondary: '#9FB8CE',
  muted: '#5F7C97',
  hairline: '#1E3A55',
}

async function plexFonts() {
  await mkdir(fontCache, { recursive: true })
  const wanted = [
    ['ibm-plex-mono-latin-400-normal.woff2', 'plex-mono-400.ttf'],
    ['ibm-plex-mono-latin-600-normal.woff2', 'plex-mono-600.ttf'],
  ]

  const files = []
  for (const [source, output] of wanted) {
    const target = path.join(fontCache, output)
    if (!existsSync(target)) {
      const woff2 = await readFile(
        path.join(
          root,
          'node_modules',
          '@fontsource',
          'ibm-plex-mono',
          'files',
          source,
        ),
      )
      await writeFile(target, Buffer.from(await wawoff2.decompress(woff2)))
    }
    files.push(target)
  }
  return files
}

const panelGradient = `
  <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${C.top}"/>
    <stop offset="55%" stop-color="${C.mid}"/>
    <stop offset="100%" stop-color="${C.bottom}"/>
  </linearGradient>`

const plate = `
  <rect width="64" height="64" rx="14" fill="url(#panel)"/>
  <rect x="1" y="1" width="62" height="62" rx="13" fill="none"
        stroke="${C.client}" stroke-opacity="0.25" stroke-width="1.5"/>`

const icons = {
  monogram: `${plate}
    <text x="26" y="45" font-family="IBM Plex Mono" font-size="42" font-weight="600"
          fill="${C.ink}" text-anchor="middle">E</text>
    <rect x="40" y="39" width="14" height="5" rx="2" fill="${C.server}"/>`,

  roundtrip: `${plate}
    <line x1="18" y1="32" x2="46" y2="32" stroke="${C.hairline}" stroke-width="4"
          stroke-linecap="round"/>
    <circle cx="18" cy="32" r="8" fill="${C.client}"/>
    <circle cx="46" cy="32" r="8" fill="${C.server}"/>`,

  diagonal: `${plate}
    <line x1="20" y1="20" x2="44" y2="44" stroke="${C.hairline}" stroke-width="4"
          stroke-linecap="round"/>
    <circle cx="20" cy="20" r="8" fill="${C.client}"/>
    <circle cx="44" cy="44" r="8" fill="${C.server}"/>`,
}

function iconSvg(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>${panelGradient}</defs>
  ${icons[name]}
</svg>`
}

function placed(name, x, y, size) {
  const scale = size / 64
  return `<g transform="translate(${x} ${y}) scale(${scale})">${icons[name]}</g>`
}

function contactSheet() {
  const names = Object.keys(icons)
  const rows = names
    .map((name, i) => {
      const y = 18 + i * 62
      return [
        placed(name, 20, y, 48),
        placed(name, 84, y + 12, 24),
        placed(name, 124, y + 16, 16),
        placed(name, 200, y, 48),
        placed(name, 264, y + 12, 24),
        placed(name, 304, y + 16, 16),
        `<text x="152" y="${y + 30}" font-family="IBM Plex Mono" font-size="9"
               fill="${C.muted}">${name}</text>`,
      ].join('\n')
    })
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 204" width="360" height="204">
  <defs>${panelGradient}</defs>
  <rect width="180" height="204" fill="#0d1117"/>
  <rect x="180" width="180" height="204" fill="#f0f3f7"/>
  ${rows}
</svg>`
}

function ogImage() {
  const mono = 'IBM Plex Mono'
  const sep = `<tspan fill="${C.server}"> · </tspan>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.top}"/>
      <stop offset="55%" stop-color="${C.mid}"/>
      <stop offset="100%" stop-color="${C.bottom}"/>
    </linearGradient>
    <linearGradient id="trail" gradientUnits="userSpaceOnUse"
                    x1="240" y1="460" x2="618" y2="460">
      <stop offset="0%" stop-color="${C.client}" stop-opacity="0"/>
      <stop offset="70%" stop-color="${C.client}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${C.client}" stop-opacity="1"/>
    </linearGradient>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#panel)"/>
  <rect x="90" y="150" width="4" height="196" fill="${C.server}"/>

  <g font-family="${mono}">
    <text x="126" y="182" font-size="20" letter-spacing="6" font-weight="600"
          fill="${C.client}">FULL STACK SOFTWARE ENGINEER</text>

    <text x="126" y="256" font-size="58" letter-spacing="1" font-weight="600"
          fill="${C.ink}">Edmel John Linaugo<tspan fill="${C.server}">_</tspan></text>

    <text x="126" y="302" font-size="24" fill="${C.secondary}" xml:space="preserve">TypeScript${sep}Node.js${sep}React${sep}PostgreSQL${sep}AWS</text>

    <text x="126" y="340" font-size="19" fill="${C.muted}">AI-powered features in production · React Native · Docker · Fargate</text>

    <line x1="126" y1="460" x2="1110" y2="460" stroke="${C.hairline}" stroke-width="3"/>
    <line x1="240" y1="460" x2="618" y2="460" stroke="url(#trail)" stroke-width="4"
          stroke-linecap="round"/>

    <circle cx="126" cy="460" r="6" fill="${C.hairline}"/>
    <circle cx="618" cy="460" r="8" fill="${C.client}" filter="url(#glow)"/>
    <circle cx="1110" cy="460" r="6" fill="${C.hairline}"/>

    <text x="126" y="494" font-size="16" letter-spacing="4" font-weight="600"
          fill="${C.muted}">CLIENT</text>
    <text x="618" y="494" font-size="16" letter-spacing="4" font-weight="600"
          fill="${C.client}" text-anchor="middle">API</text>
    <text x="1110" y="494" font-size="16" letter-spacing="4" font-weight="600"
          fill="${C.muted}" text-anchor="end">DATA</text>

    <text x="126" y="556" font-size="17" letter-spacing="3"
          fill="${C.muted}">ILOILO, PH<tspan fill="${C.server}"> // </tspan>GITHUB.COM/EDMELKUN</text>
  </g>
</svg>`
}

async function render(svg, outfile, width, fonts) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      fontFiles: fonts,
      loadSystemFonts: false,
      defaultFontFamily: 'IBM Plex Mono',
    },
  })
  await writeFile(outfile, resvg.render().asPng())
  return outfile
}

const fonts = await plexFonts()
const target = process.argv[2]

if (target === 'preview') {
  const out = path.join(root, 'src', 'assets', 'brand', 'favicon-preview.png')
  await render(contactSheet(), out, 1440, fonts)
  console.log(`wrote ${out}`)
} else if (target === 'og') {
  const svg = ogImage()
  await writeFile(path.join(root, 'src', 'assets', 'brand', 'og.svg'), svg)
  await render(svg, path.join(root, 'public', 'og.png'), 1200, fonts)
  console.log('wrote og.svg and og.png')
} else if (target) {
  const svg = iconSvg(target)
  await writeFile(path.join(root, 'public', 'favicon.svg'), svg)
  await render(
    svg,
    path.join(root, 'public', 'apple-touch-icon.png'),
    180,
    fonts,
  )
  await render(svg, path.join(root, 'public', 'favicon-96.png'), 96, fonts)
  console.log(`wrote favicon.svg, apple-touch-icon.png and favicon-96.png from "${target}"`)
} else {
  console.log('usage: node generate-assets.mjs <preview|monogram|roundtrip|diagonal>')
}
