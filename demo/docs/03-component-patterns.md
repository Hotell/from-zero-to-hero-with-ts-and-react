# React Component patterns using TypeScript

So in real app, you don't write one root component with everything inside.

Let's refactor our app and introduce some good patterns along the way.

1. Create statelles Heading component

- extract props from App to Heading

```sh
touch src/heading.tsx
```

```tsx
import React, { SFC } from 'react';

type Props = {message: string}

export const Heading: SFC<Props> = (props) => {
  return <h1>{props.message}</h1>
}
```

```diff
// main.ts
-  render(createElement(App, {message: 'Hello World'}), mountTo)
+  render(createElement(App), mountTo)

// app.tsx
-export class App extends Component<Props, State> {
+export class App extends Component<{}, State> {
  render() {
    return (
-      <h1>{this.props.message}</h1>
+      <Heading message="Hello World"/>
    )
  }
}
```

1. Extract logic to Counter and introduce children as a function

```sh
touch src/counter.tsx
```

```tsx
// counter.tsx

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
```

```tsx
// app.tsx

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
```
