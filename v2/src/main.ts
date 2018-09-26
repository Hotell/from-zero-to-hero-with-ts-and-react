import 'papercss/dist/paper.css'
import './styles.css'

import { render } from 'react-dom'
import { createElement } from 'react'

import { App } from './app/app'
import { HttpClient } from './app/api.service'
import { UserService } from './app/user.service'

const bootstrap = () => {
  const mountTo = document.getElementById('app') as HTMLDivElement

  const httpClient = new HttpClient('https://api.github.com')
  const userService = new UserService(httpClient)

  render(createElement(App, { userService }), mountTo)
}

bootstrap()
