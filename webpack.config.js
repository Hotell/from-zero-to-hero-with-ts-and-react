// @ts-check
const { resolve, join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const tsConfig = resolve(__dirname, 'tsconfig.build.json')

const tsLoaderOptionsRules = /** @type {import('ts-loader').Options}*/ ({
  configFile: tsConfig,
  transpileOnly: true
})

/**
 * @type {Partial<import('webpack-dev-server').WebpackDevServer.Config>}
 */
const devServer = {
  overlay: true,
  contentBase: join(__dirname, 'src/public'),
  historyApiFallback: true,
  hot: true
}

/**
 * @type {(env:{production?:boolean})=>import('webpack').Configuration & {devServer: Partial<import('webpack-dev-server').WebpackDevServer.Config>}}
 */
const config = (env) => {
  const { ifProd, ifDev } = getIfUtils(env)

  console.log({ ifProd: ifProd(), ifDev: ifDev() })

  return {
    entry: {
      main: resolve(__dirname, 'src', 'main.ts')
    },
    output: {
      filename: '[name].[hash].js',
      path: resolve(__dirname, 'dist')
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
        template: resolve(__dirname, 'src/index.html')
      }),
      ifDev(new webpack.NamedModulesPlugin()),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: tsConfig,
        formatter: 'codeframe',
        checkSyntacticErrors: true,
        watch: ['./src']
      })
    ]),
    devServer
  }
}

module.exports = config
