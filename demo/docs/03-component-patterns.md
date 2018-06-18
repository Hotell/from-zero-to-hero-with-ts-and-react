# React Component patterns using TypeScript

So in real app, you don't write one root component with everything inside.

Let's refactor our app and introduce some good patterns along the way.

1.  Create statelles Heading component

- extract props from App to Heading

```sh
touch src/heading.tsx
```

```tsx
import React, { SFC } from 'react'

type Props = { message: string }

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

1.  Extract logic to Counter

```sh
touch src/counter.tsx
```

```tsx
// counter.tsx

import React, { Component, ReactNode } from 'react'

type State = Readonly<typeof initialState>
type Props = {
  children: (api: Api) => ReactNode
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
    return (
      <>
        <p>{this.props.count}</p>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
      </>
    )
  }
}
```

2.  Decouple rendering from Counter and introduce `render props/CaaF` pattern

```tsx
// counter.tsx

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
```

```tsx
// app.tsx

export class App extends Component {
  render() {
    return (
      <div>
        <Heading message="Hello World" />
        <Counter>
          {({ count, onDecrement, onIncrement }) => {
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

3.  Add Interval Component

Now we have statefull Counter component which handles only logic and rendering is purely on consumer of our component. This makes our app even more clean and extensible. Let's leverage our Counter for some other component - Interval.

```tsx
// Interval
type Props = {
  count: number
  onInc(): void
}

export class Interval extends Component<Props> {
  intervalId = -1
  render() {
    return <div>{this.props.count}</div>
  }
  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.props.onInc()
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId)
  }
}
```

```tsx
// app.tsx

export class App extends Component {
  render() {
    return (
      <div>
        <Heading message="Hello World" />
        <Counter>
          {({ count, onDecrement, onIncrement }) => {
            return (
              <>
                <p>{count}</p>
                <button onClick={onIncrement}>Increment</button>
                <button onClick={onDecrement}>Decrement</button>
              </>
            )
          }}
        </Counter>
        <Counter>
          {({ count, onIncrement }) => {
            return <Interval count={count} onInc={onIncrement} />
          }}
        </Counter>
      </div>
    )
  }
}
```

4.  Extract children as a function to local static components, to make render more clean

```tsx
export class App extends Component {
  static SimpleCounter = () => (
    <Counter>
      {({ count, onDec, onInc }) => {
        return (
          <>
            <p>{count}</p>
            <button onClick={onDec}>inc</button>
            <button onClick={onInc}>dec</button>
          </>
        )
      }}
    </Counter>
  )
  static IntervalCounter = () => (
    <Counter>
      {({ count, onInc }) => {
        return <Interval count={count} onInc={onInc} />
      }}
    </Counter>
  )
  render() {
    return (
      <div>
        <Heading message="Hello Devel.cz !" />
        <App.SimpleCounter />
        <App.IntervalCounter />
      </div>
    )
  }
}
```

5.  Bonus - add `type` prop to Heading + defaultProps pattern

- use this within our static App compound components

```tsx
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
```
