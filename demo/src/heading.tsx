import React, { SFC } from 'react';

export type Props = {message: string}
export const Heading: SFC<Props> = (props) => {
  return <h1>{props.message}</h1>
}
