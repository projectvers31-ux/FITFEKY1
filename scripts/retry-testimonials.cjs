/* eslint-disable */
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")
const os = require("os")

const FILES = [
  ["testimonials/amy-chase.webp", 384, 80],
  ["testimonials/kevin-yam.webp", 384, 80],
  ["testimonials/kundo-marta.webp", 384, 80],
  ["testimonials/jonas-kotara.webp", 384, 80],
]

const PUBLIC = path.join(__dirname, "..", "public")

const toBytes = (n) => {
  if (n < 1024) return `${n}B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`
  return `${(n / 1024 / 1024).toFixed(2)}MB`
}

async function tryOnce(abs) {
  const before = fs.statSync(abs).size
  const buf = await sharp(abs)
    .rotate()
    .resize({ width: 384, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 80, effort: 4 })
    .toBuffer()
  // write to temp in OS temp dir, then copy + truncate
  const tmp = path.join(
    os.tmpdir(),
    `opt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`,
  )
  fs.writeFileSync(tmp, buf)
  // try copyFile
  fs.copyFileSync(tmp, abs)
  fs.unlinkSync(tmp)
  const after = fs.statSync(abs).size
  return { before, after }
}

async function main() {
  for (const [rel, _w, _q] of FILES) {
    const abs = path.join(PUBLIC, rel)
    if (!fs.existsSync(abs)) continue
    let success = false
    for (let attempt = 1; attempt <= 5 && !success; attempt++) {
      try {
        const { before, after } = await tryOnce(abs)
        const pct = ((1 - after / before) * 100).toFixed(0)
        console.log(`  ${rel}: ${toBytes(before)} -> ${toBytes(after)} (-${pct}%)`)
        success = true
      } catch (err) {
        console.warn(`  attempt ${attempt} failed for ${rel}: ${err.code || err.message}`)
        await new Promise((r) => setTimeout(r, 250 * attempt))
      }
    }
    if (!success) console.error(`  FAILED: ${rel}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
