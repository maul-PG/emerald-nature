const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

const input = path.resolve(__dirname, '../src/app/globals.css')
const output = path.resolve(__dirname, '../tmp-tailwind.css')
const configPath = path.resolve(__dirname, '../tailwind.config.js')

async function build() {
  try {
    const css = fs.readFileSync(input, 'utf8')
  const processor = postcss([tailwindcss({ config: configPath }), autoprefixer])
    const result = await processor.process(css, { from: input, to: output })
    fs.writeFileSync(output, result.css)
    if (result.map) fs.writeFileSync(output + '.map', result.map.toString())
    console.log('Tailwind build completed — wrote:', output)
  } catch (err) {
    console.error('Tailwind build failed:')
    console.error(err)
    process.exit(1)
  }
}

build()
