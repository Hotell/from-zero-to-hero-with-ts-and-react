import 'papercss/dist/paper.css'

import { render } from 'react-dom'
import { createElement } from 'react'

import { App } from './app/app'

const bootstrap = () => {
  const mountTo = document.getElementById('app') as HTMLDivElement
  // const app = document.createElement('div')
  // app.innerHTML = 'IT WORKS !!!'
  // app.className = 'container margin'

  // mountTo.appendChild(app)

  render(createElement(App), mountTo)
}

bootstrap()
