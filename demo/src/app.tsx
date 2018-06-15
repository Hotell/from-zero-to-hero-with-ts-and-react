import React, { SFC, Component } from 'react'

type Props = {message: string}

// ========== STATELESS ===========
//
// export const App: SFC<Props> = (props) => {
//   return <div>{props.message}</div>
// }

// ========== STATEFULL ===========

type State = Readonly<typeof initialState>
const initialState = {
  count: 0
}

const inc = (state: State): State => ({count:state.count+1})
const dec = (state: State): State => ({count:state.count-1})
export class App extends Component<Props,State> {
  state = initialState
  handleIncrement = () => this.setState(inc)
  handleDecrement = () => this.setState(dec)
  render() {
    return <div>
      <h1>{this.props.message}</h1>
      <p>{this.state.count}</p>
      <button onClick={this.handleIncrement}>Increment</button>
      <button onClick={this.handleDecrement}>Decrement</button>
    </div>
  }
}
