import React, { Component } from 'react'

import { Search } from './search'
import { Profile } from './profile'
import { GithubUser, GithubUserRepo } from './models'
import { Debug } from './debug'
import { UserService } from './user.service'

type Data = {
  bio: GithubUser
  repos: GithubUserRepo[]
} | null

const initialState = {
  data: null as Data,
  loading: false,
  error: null as object | null
}
type State = Readonly<typeof initialState>
type Props = { userService: UserService }

export class App extends Component<Props, State> {
  readonly state = initialState
  private fetchUser = (username: string) => {
    const { userService } = this.props

    this.setState({ ...initialState, loading: true })

    userService
      .getProfile(username)
      .then((data) => {
        this.setState({ data, loading: false })
      })
      .catch((reason) => {
        console.log({ reason })
        this.setState({ loading: false, error: reason, data: null })
      })
  }

  render() {
    const { data, loading, error } = this.state

    return (
      <div className="container margin">
        <h1>Github Users search</h1>
        <Search onSearch={this.fetchUser} />
        {loading ? 'Loading user...' : null}
        {error ? (
          <p className="text-error">
            Oh no panic! <Debug data={error} />
          </p>
        ) : null}
        {data ? <Profile data={data} /> : null}
      </div>
    )
  }
}
