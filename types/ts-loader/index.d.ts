export declare namespace TsLoader {
  interface ErrorInfo {}
  interface TransformerFactory {}
  interface Options {
    transpileOnly: boolean
    happyPackMode: boolean
    getCustomTransformers: () => {
      before?: TransformerFactory[]
      after?: TransformerFactory[]
    }
    logInfoToStdOut: boolean
    logLevel: 'warn' | 'info' | 'error'
    silent: boolean
    ignoreDiagnostics: number[]
    reportFiles: string[]
    compiler: string
    configFile: string
    colors: boolean
    errorFormatter: ((message: ErrorInfo, colors: boolean) => string)
    compilerOptions: import('typescript').CompilerOptions
    instance: string
    appendTsSuffixTo: RegExp[]
    appendTsxSuffixTo: RegExp[]
    onlyCompileBundledFiles: boolean
    allowTsInNodeModules: boolean
    context: string
  }
}
