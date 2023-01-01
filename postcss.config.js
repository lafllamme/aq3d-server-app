// eslint-disable-next-line @typescript-eslint/no-var-requires
let tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('postcss-import'),
    require('autoprefixer'),
  ],
}
