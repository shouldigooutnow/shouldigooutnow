const path = require('path')
const { override, addPostcssPlugins, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({ ['@']: path.resolve(__dirname, 'src') }),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')])
)
