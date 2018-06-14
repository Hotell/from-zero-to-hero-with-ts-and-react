import React, { Component } from 'react'

export type AppProps = {
  hide?: boolean
}
export type AppState = typeof initialState
const initialState = {
  on: false,
  input: '',
  mainColor: 'blue' as 'blue' | 'red',
  lifeCycle: ''
}
export class App extends Component<AppProps, AppState> {
  state = initialState

  private readonly toggleOnState = () =>
    this.setState((state) => ({ on: !state.on }))

  handleStrings(value: string) {
    return value === 'Hello World' ? true : false
  }
  componentWillReceiveProps() {
    this.setState({ lifeCycle: 'componentWillReceiveProps' })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is Welcome!</h3>
        </header>
        <p className="App-intro">Hello</p>
        <p className="button-state">{this.state.on ? 'Yes!' : 'No!'}</p>
        <button onClick={this.toggleOnState}>Click</button>
        <h2>{this.state.input}</h2>
        <input
          onChange={(e) => this.setState({ input: e.currentTarget.value })}
          type="text"
        />
        <p className="lifeCycle">{this.state.lifeCycle}</p>
      </div>
    )
  }

  componentDidMount() {
    // console.log('CDM!')
    this.setState({ lifeCycle: 'componentDidMount' })
  }
}

export type LinkProps = {
  address: string
  hide?: boolean
}
export class Link extends Component<LinkProps> {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}
