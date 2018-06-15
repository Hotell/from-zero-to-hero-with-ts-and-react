import React, { SFC, Component } from 'react'

import { Heading } from './heading';
import { Counter } from './counter';

// ========== STATELESS ===========
//
// export const App: SFC<Props> = (props) => {
//   return <div>{props.message}</div>
// }

// ========== STATEFULL ===========
export class App extends Component {

  render() {
    return (
      <div>
        <Heading message="Hello World"/>
        <Counter>
          {({count,onDecrement,onIncrement})=>{
              return (
                <>
                  <p>{count}</p>
                  <button onClick={onIncrement}>Increment</button>
                  <button onClick={onDecrement}>Decrement</button>
                </>
              )
          }}
        </Counter>
      </div>
    )
  }
}
