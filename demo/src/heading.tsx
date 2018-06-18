import React, { SFC } from 'react'
import { createPropsGetter } from './utils'

export type Props = {
  message: string
} & Partial<typeof defaultProps>

const defaultProps = {
  type: 'h1' as 'h1' | 'h2' | 'h3' | 'h4'
}
const getProps = createPropsGetter(defaultProps)

export const Heading: SFC<Props> = (props) => {
  const { type: Type, message } = getProps(props)
  return <Type>{message}</Type>
}
Heading.defaultProps = defaultProps
Heading.displayName = `Heading`
