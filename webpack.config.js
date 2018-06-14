// @ts-check
const { resolve, join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

/**
 * @typedef {Partial<import('webpack-dev-server').WebpackDevServer.Config>} WebpackDevServerConfig
 */

/**
 * @typedef {import('webpack').Configuration & {devServer: WebpackDevServerConfig}} WebpackConfig
 */

const ROOT = resolve(__dirname)
const SRC_PATH = resolve(ROOT, 'src')
const PATHS = {
  entry: resolve(SRC_PATH, 'main.ts'),
  output: resolve(ROOT, 'dist'),
  tsConfig: resolve(ROOT, 'tsconfig.prod.json'),
  content: resolve(SRC_PATH, 'public'),
  html: resolve(SRC_PATH, 'index.html')
}

/**
 * @type {Partial<import('ts-loader').Options>}
 */
const tsLoaderOptionsRules = {
  configFile: PATHS.tsConfig,
  transpileOnly: true
}

/**
 * @type {WebpackDevServerConfig}
 */
const devServer = {
  overlay: true,
  contentBase: PATHS.content,
  historyApiFallback: true,
  hot: true
}

/**
 *
 * @param {{prod:boolean} | {dev:boolean}} env
 * @returns {WebpackConfig}
 */
const config = (env) => {
  const { ifProd, ifDev } = getIfUtils(env)

  return {
    entry: {
      main: PATHS.entry
    },
    output: {
      filename: '[name].[hash].js',
      path: PATHS.output
    },
    mode: ifProd('production', 'development'),
    devtool: ifProd('source-map', 'inline-source-map'),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    stats: 'minimal',
    module: {
      rules: [
        {
          include: resolve(__dirname, 'src'),
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: tsLoaderOptionsRules
        }
      ]
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        title: 'React + TS',
        template: PATHS.html
      }),
      ifDev(new webpack.NamedModulesPlugin()),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: PATHS.tsConfig,
        formatter: 'codeframe',
        checkSyntacticErrors: true,
        watch: ['./src']
      })
    ]),
    devServer
  }
}

module.exports = config
