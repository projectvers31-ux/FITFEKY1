/* eslint-disable */
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const PUBLIC = path.join(__dirname, "..", "public")
const OUT_BLUR = path.join(__dirname, "..", "src", "lib", "blur-data-urls.ts")

// Files to (re)compress: source path -> max width, quality
const RECOMPRESS = [
  ["images/hero-yoga-sunset.jpg", 1200, 80],
  ["images/hero-yoga-mat.jpg", 1600, 80],
  ["images/yoga-balance.jpg", 1200, 80],
  ["images/meditation-mindful.jpg", 1200, 80],
  ["images/wellness-warm.jpg", 1200, 80],
  ["images/story-postpartum.jpg", 1200, 80],
  ["images/story-perimenopause.jpg", 1200, 80],
  ["images/story-pcos.jpg", 1200, 80],
  ["images/blog/cover-home-gym.jpg", 1200, 78],
  ["images/blog/cover-protein-targets.jpg", 1200, 78],
  ["images/blog/cover-pms-cravings.jpg", 1200, 78],
  ["images/blog/cover-strength-training.jpg", 1200, 78],
  ["images/blog/cover-pcos.jpg", 1200, 78],
  ["images/blog/cover-postpartum.jpg", 1200, 78],
  ["images/blog/cover-perimenopause.jpg", 1200, 78],
  ["images/blog/cover-meal-prep.jpg", 1200, 78],
  ["images/blog/cover-1500-calories.jpg", 1200, 78],
  ["images/blog/cover-cycle-syncing.jpg", 1200, 78],
  ["testimonials/amy-chase.webp", 384, 80],
  ["testimonials/kevin-yam.webp", 384, 80],
  ["testimonials/kundo-marta.webp", 384, 80],
  ["testimonials/jonas-kotara.webp", 384, 80],
]

// Files to generate blur placeholders for
const BLUR_FILES = [
  "images/hero-yoga-sunset.jpg",
  "images/hero-yoga-mat.jpg",
  "images/yoga-balance.jpg",
  "images/meditation-mindful.jpg",
  "images/wellness-warm.jpg",
  "images/story-postpartum.jpg",
  "images/story-perimenopause.jpg",
  "images/story-pcos.jpg",
  "images/blog/cover-home-gym.jpg",
  "images/blog/cover-protein-targets.jpg",
  "images/blog/cover-pms-cravings.jpg",
  "images/blog/cover-strength-training.jpg",
  "images/blog/cover-pcos.jpg",
  "images/blog/cover-postpartum.jpg",
  "images/blog/cover-perimenopause.jpg",
  "images/blog/cover-meal-prep.jpg",
  "images/blog/cover-1500-calories.jpg",
  "images/blog/cover-cycle-syncing.jpg",
  "images/reviews/reviewer-1.jpg",
  "images/reviews/reviewer-2.jpg",
  "images/reviews/reviewer-3.jpg",
  "images/reviews/reviewer-4.jpg",
  "images/reviews/reviewer-5.jpg",
  "images/reviews/reviewer-6.jpg",
  "images/reviews/reviewer-7.jpg",
  "images/reviews/reviewer-8.jpg",
  "images/reviews/before-1.jpg",
  "images/reviews/before-2.jpg",
  "images/reviews/before-3.jpg",
  "images/reviews/after-1.jpg",
  "images/reviews/after-2.jpg",
  "images/reviews/after-3.jpg",
  "testimonials/amy-chase.webp",
  "testimonials/jonas-kotara.webp",
  "testimonials/kevin-yam.webp",
  "testimonials/kundo-marta.webp",
  "og-image.jpg",
]

const toBytes = (n) => {
  if (n < 1024) return `${n}B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`
  return `${(n / 1024 / 1024).toFixed(2)}MB`
}

async function recompress() {
  console.log("--- RECOMPRESS ---")
  let totalBefore = 0
  let totalAfter = 0
  for (const [rel, maxW, q] of RECOMPRESS) {
    const abs = path.join(PUBLIC, rel)
    if (!fs.existsSync(abs)) {
      console.warn(`  skip (missing): ${rel}`)
      continue
    }
    const before = fs.statSync(abs).size
    totalBefore += before
    const isWebp = rel.endsWith(".webp")
    const pipeline = sharp(abs).rotate().resize({
      width: maxW,
      withoutEnlargement: true,
      fit: "inside",
    })
    const buf = isWebp
      ? await pipeline.webp({ quality: q, effort: 4 }).toBuffer()
      : await pipeline.jpeg({ quality: q, mozjpeg: true }).toBuffer()
    const tmp = abs + ".tmp"
    let saved = false
    try {
      fs.writeFileSync(tmp, buf)
      try {
        fs.unlinkSync(abs)
      } catch {}
      fs.renameSync(tmp, abs)
      saved = true
    } catch (err) {
      try {
        if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
      } catch {}
    }
    if (!saved) {
      try {
        const fh = fs.openSync(abs, "r+")
        fs.writeSync(fh, buf, 0, buf.length, 0)
        fs.ftruncateSync(fh, buf.length)
        fs.closeSync(fh)
        saved = true
      } catch (err2) {
        console.warn(`  skip (locked): ${rel} (${err2.code || err2.message})`)
        continue
      }
    }
    const after = buf.length
    totalAfter += after
    const pct = ((1 - after / before) * 100).toFixed(0)
    console.log(
      `  ${rel}: ${toBytes(before)} -> ${toBytes(after)} (-${pct}%)`,
    )
  }
  console.log(
    `  TOTAL: ${toBytes(totalBefore)} -> ${toBytes(totalAfter)} (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)\n`,
  )
}

async function buildBlur() {
  console.log("--- BLUR PLACEHOLDERS ---")
  const map = new Map()
  for (const rel of BLUR_FILES) {
    const abs = path.join(PUBLIC, rel)
    if (!fs.existsSync(abs)) continue
    const dataUrl = await sharp(abs)
      .rotate()
      .resize({ width: 16, fit: "inside" })
      .blur(2)
      .jpeg({ quality: 40 })
      .toBuffer()
      .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
    map.set(rel, dataUrl)
    console.log(`  ${rel}: ${dataUrl.length}B`)
  }

  const lines = [
    "// Auto-generated by scripts/optimize-images.cjs",
    "// Tiny LQIP placeholders used as blurDataURL for next/image.",
    "// Keep the key format identical to the public/ path (no leading slash).",
    "",
  ]
  for (const [rel, url] of map) {
    const key = "/" + rel.replace(/\.(jpe?g|png|webp|avif)$/i, "")
    lines.push(`export const ${keyToConst(key)} = ${JSON.stringify(url)}`)
  }
  lines.push("")
  lines.push("export const BLUR_DATA_URLS: Record<string, string> = {")
  for (const [rel, url] of map) {
    const key = "/" + rel.replace(/\.(jpe?g|png|webp|avif)$/i, "")
    lines.push(`  ${JSON.stringify(key)}: ${keyToConst(key)},`)
  }
  lines.push("}")
  lines.push("")

  fs.writeFileSync(OUT_BLUR, lines.join("\n"))
  console.log(`\n  Wrote ${map.size} entries to ${path.relative(process.cwd(), OUT_BLUR)}`)
}

function keyToConst(key) {
  return key
    .replace(/^\//, "")
    .replace(/[\/\-\.]/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toUpperCase()
}

;(async () => {
  try {
    await recompress()
    await buildBlur()
    console.log("\nDone.")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
