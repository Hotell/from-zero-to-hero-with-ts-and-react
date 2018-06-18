// @ts-check

const HTMLWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        include: resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new HTMLWebpackPlugin({ template: resolve(__dirname, 'src/index.html') })]
}

module.exports = config
