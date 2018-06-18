import React, { Component, ReactNode } from 'react'

type State = Readonly<typeof initialState>
type Props = {
  children: (api: Api) => ReactNode
}
interface Api {
  count: State['count']
  onIncrement: Counter['handleIncrement']
  onDecrement: Counter['handleDecrement']
}

const initialState = {
  count: 0
}
const inc = (state: State): State => ({ count: state.count + 1 })
const dec = (state: State): State => ({ count: state.count - 1 })

export class Counter extends Component<Props, State> {
  state = initialState
  handleIncrement = () => this.setState(inc)
  handleDecrement = () => this.setState(dec)
  render() {
    return this.props.children({
      count: this.state.count,
      onDecrement: this.handleDecrement,
      onIncrement: this.handleIncrement
    })
  }
}
