import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const IMAGES_DIR = 'public/images'
const QUALITY = 80

const files = await readdir(IMAGES_DIR)
const imageFiles = files.filter((f) =>
  ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
)

console.log(`Converting ${imageFiles.length} images to WebP...\n`)

for (const file of imageFiles) {
  const inputPath = join(IMAGES_DIR, file)
  const outputPath = join(IMAGES_DIR, basename(file, extname(file)) + '.webp')

  const info = await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath)

  const inputSize = (await sharp(inputPath).metadata()).size
  const saved = inputSize ? Math.round((1 - info.size / inputSize) * 100) : '?'

  console.log(
    `  ${file} → ${basename(outputPath)}  (${(inputSize / 1024).toFixed(0)} KB → ${(info.size / 1024).toFixed(0)} KB, -${saved}%)`
  )

  await unlink(inputPath)
}

console.log('\nDone.')
