/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
