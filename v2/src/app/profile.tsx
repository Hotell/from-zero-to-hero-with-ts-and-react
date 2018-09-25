import React, { Component } from 'react'

import { GithubUser, GithubUserRepo } from './models'
import { Debug } from './debug'
import { UserProfile } from './user-profile'
import { UserRepos } from './user-repos'

type Props = {
  data: { bio: GithubUser; repos: GithubUserRepo[] }
}
export class Profile extends Component<Props> {
  render() {
    const { bio, repos } = this.props.data
    return (
      <div className="row">
        <div className="col sm-12 md-6">
          <UserProfile bio={bio} />
        </div>
        <div className="col sm-12 md-6">
          <UserRepos repos={repos} />
        </div>
      </div>
    )
  }
}
