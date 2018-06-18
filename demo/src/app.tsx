import React, { SFC, Component } from 'react'

import { Heading } from './heading'
import { Counter } from './counter'
import { Interval } from './interval'

// ========== STATELESS ===========
//
// export const App: SFC<Props> = (props) => {
//   return <div>{props.message}</div>
// }

// ========== STATEFULL ===========
export class App extends Component {
  static SimpleCounter = () => (
    <Counter>
      {({ count, onDecrement, onIncrement }) => {
        return (
          <>
            <Heading message="Simple Counter" type="h2" />
            <p>{count}</p>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
          </>
        )
      }}
    </Counter>
  )
  static IntervalCounter = () => (
    <Counter>
      {({ count, onIncrement }) => {
        return (
          <>
            <Heading message="Interval Counter" type="h2" />
            <Interval count={count} onInc={onIncrement} />
          </>
        )
      }}
    </Counter>
  )
  render() {
    return (
      <div>
        <Heading message="Hello World" />
        <App.SimpleCounter />
        <App.IntervalCounter />
      </div>
    )
  }
}
