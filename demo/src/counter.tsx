import React, { Component, ReactNode } from 'react';
type State = Readonly<typeof initialState>
const initialState = {
  count: 0
}

type Props = {
  children: (api: Api)=>ReactNode
}

interface Api {
  count: number
  onIncrement(): void
  onDecrement(): void
}

const inc = (state: State): State => ({count:state.count+1})
const dec = (state: State): State => ({count:state.count-1})

export class Counter extends Component<Props,State> {
  state = initialState
  handleIncrement = () => this.setState(inc)
  handleDecrement = () => this.setState(dec)
  render(){
    return this.props.children({
      count: this.state.count,
      onDecrement: this.handleDecrement,
      onIncrement: this.handleIncrement
    })
  }
}