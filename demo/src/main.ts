import { createElement } from 'react'
import { render } from 'react-dom'

import { App } from './app';

const bootstrap = () => {
  const mountTo = document.querySelector('#app')
  render(createElement(App, {message:'Hello World'}), mountTo)
}

bootstrap()
