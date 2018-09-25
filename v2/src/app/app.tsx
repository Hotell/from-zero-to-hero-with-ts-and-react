import React, { Component } from 'react'

import { Search } from './search'
import { Profile } from './profile'
import { HttpClient } from './api.service'
import { GithubUser, GithubUserRepo } from './models'
import { Debug } from './debug'

const httpClient = new HttpClient('https://api.github.com')

type Data = {
  bio: GithubUser
  repos: GithubUserRepo
} | null

const initialState = {
  data: null as Data,
  loading: false,
  error: null as object | null
}
type State = Readonly<typeof initialState>
type Props = {}

export class App extends Component<Props, State> {
  readonly state = initialState
  private fetchUser = (username: string) => {
    this.setState({ loading: true, error: null })

    const userData = httpClient.get<GithubUser>(`users/${username}`)
    const userRepos = httpClient.get<GithubUserRepo>(`users/${username}/repos`)

    const result = Promise.all([userData, userRepos]).then(([bio, repos]) => {
      return { bio, repos }
    })

    result
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
