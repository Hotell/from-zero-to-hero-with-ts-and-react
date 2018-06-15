# React Component types using TypeScript

We can easily move our raw `createElement` that creates a `div` into a component same content by leveraging JSX.

Let's creat an App component

## State less

> You can create a stateless React component in TypeScript as easily as creating a function.

1. create app.tsx

```sh
touch src/app.tsx
```

```tsx
import React, { SFC } from 'react'

export const App: SFC = (props) => {
  return <div>Hello World</div>
}
```

```diff
+import { App } from './app';

const bootstrap = () => {
  const mountTo = document.querySelector('#app')
-  render(createElement('div', null, 'Hello World'), mountTo)
+  render(createElement(App), mountTo)
}
```

2. add props

Of course one big advantage of components is that you get to use props to change the component behavior.

- e.g we can take the message as a prop by adding it to the function arguments, using it inside the function body.
- And TypeScript tells us that this property needs to be provided
- And helps us pass in the message as a property to the component.

- add props definition
- And you can see that the type specified flows through to the function argument.

```tsx
export const App: SFC<{message:string}> = (props) => {
  return <div>{props.message}</div>
}
```

```diff
const bootstrap = () => {
  const mountTo = document.querySelector('#app')
-  render(createElement('div', null, 'Hello World'), mountTo)
+  render(createElement(App, {message: 'Hello World'}), mountTo)
}
```

```tsx
import React, { SFC } from 'react'

export type Props = {message: string}
export const App: SFC<Props> = (props) => {
  return <div>{props.message}</div>
}
```

3. extract inline prop type

Ofcourse, if you want, you can easily move out this inline prop type definition, into an appropriately named type.

## State full

> You can create stateful React Components in TypeScript by extending from the React.Component class. This parent class takes two generic parameters, Props and State.

Let's refactor our stateless App to state full

1. refactor to class component

Of course one big advantage of components is that you get to use props to change the component behavior.

- Component takes Props as its first generic argument.
- Lets go ahead and add a prop with a member message of type string.
- We can use this prop in our render method.

```tsx
export class App extends Component<Props> {
  render(){
    return <div>{this.props.message}</div>
  }
}
```

- everything still works and our TS prop checking still works!

> Components that extend from `React.Component` are called stateful because they can have their own internal state.

2. add state

- `Component` takes as second generic argument which specifies the type of the State.
- Lets go ahead and setup our state as an object with a member count of type number.
- We can initialize the state in a constant and assign it to state class prop.
- Finally we can use this state in other places like the render method.


```tsx
type State = typeof initialState
const initialState = {
  count: 0
}
export class App extends Component<Props,State> {
  state = initialState
  render(){
    return <div>{this.props.message} {this.state.count}</div>
  }
}
```


The key reason for having local state in a component, is that you get to manage it inside the component. Let's add some behaviour

3. modifing state

- For example, we can call an increment member function whenever the root div is clicked.
- Within the increment function we simply use react.component's setState to increment the count member of the state.
- implement inc/dec functionality for counter

```tsx
type Props = {message: string}
type State = typeof initialState

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
```
