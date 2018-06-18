import React, { Component } from 'react'

type Props = {
  count: number
  onInc(): void
}
type State = typeof initialState

const initialState = {
  intervalId: NaN
}

export class Interval extends Component<Props, State> {
  state = initialState
  render() {
    return (
      <div>
        <b className="interval-count">{this.props.count}</b>
        <button onClick={this.handleToggle}>{this.state.intervalId ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
  componentDidMount() {
    this.handleToggle()
  }

  componentWillUnmount() {
    this.handleToggle()
  }

  handleToggle = () => {
    if (this.state.intervalId) {
      this.setState({ intervalId: Number(window.clearInterval(this.state.intervalId)) })
      return
    }

    this.setState({
      intervalId: window.setInterval(() => {
        this.props.onInc()
      }, 1000)
    })
  }
}
