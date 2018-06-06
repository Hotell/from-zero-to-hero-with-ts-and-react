export declare namespace WebpackDevServer {
  interface Config {
    overlay: boolean
    /**
     * static file location
     */
    contentBase: boolean | string | string[]
    /**
     * enable gzip compression
     */
    compress: boolean
    /**
     * true for index.html upon 404, object for multiple paths
     */
    historyApiFallback: boolean
    /**
     * hot module replacement. Depends on HotModuleReplacementPlugin
     */
    hot: boolean
    /**
     * true for self-signed, object for cert authority
     */
    https: boolean
    /**
     * only errors & warns on hot reload
     */
    noInfo: boolean
  }
}
