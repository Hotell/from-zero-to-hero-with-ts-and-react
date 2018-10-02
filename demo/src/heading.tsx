import React, { SFC } from 'react'
import { createPropsGetter, DefaultProps } from '@martin_hotell/rex-tils'

export type Props = {
  message: string
} & DefaultProps<typeof defaultProps>

const defaultProps = DefaultProps({
  type: 'h1' as 'h1' | 'h2' | 'h3' | 'h4'
})
const getProps = createPropsGetter(defaultProps)

export const Heading: SFC<Props> = (props) => {
  const { type: Type, message } = getProps(props)
  return <Type>{message}</Type>
}
Heading.defaultProps = defaultProps
Heading.displayName = `Heading`
