declare namespace Plugin {
  interface NormalizedMessage {}
  type Formatter = (message: NormalizedMessage, useColors: boolean) => string

  interface Options {
    tsconfig: string
    tslint: string | true
    watch: string | string[]
    async: boolean
    ignoreDiagnostics: number[]
    ignoreLints: string[]
    colors: boolean
    logger: Console
    formatter: 'default' | 'codeframe' | Formatter
    formatterOptions: any
    silent: boolean
    checkSyntacticErrors: boolean
    memoryLimit: number
    workers: number
    vue: boolean
  }
}

declare class WebpackPluginCtor {
  constructor(public config: Partial<Plugin.Options>) {}
}
export = WebpackPluginCtor
