declare namespace WebpackConfigUtils {
  type RemoveEmpty = <T extends object | any[]>(input: T) => T
  type GetIfUtils = (env: object | string, vars?: any[]) => IfUtils
  type PropIf = <A, I, E>(add: A, value: I, alternate: E) => I | E
  type PropIfNot = PropIf
  // type IfUtilsFn = <Y, N>(value?: Y, alternate?: N) => Y | N
  interface IfUtilsFn {
    <Y, N>(value?: Y, alternate?: N): Y | N
    (): boolean
  }
  interface IfUtils {
    ifDevelopment: IfUtilsFn
    ifNotDevelopment: IfUtilsFn
    ifDev: IfUtilsFn
    ifNotDev: IfUtilsFn
    ifProduction: IfUtilsFn
    ifNotProduction: IfUtilsFn
    ifProd: IfUtilsFn
    ifNotProd: IfUtilsFn
    ifTest: IfUtilsFn
    ifNotTest: IfUtilsFn
  }
}

export declare const getIfUtils: WebpackConfigUtils.GetIfUtils
export declare const removeEmpty: WebpackConfigUtils.RemoveEmpty
