import { createElement } from 'react'
import { render } from 'react-dom'
import { App } from './app/app'

bootstrap()

function bootstrap() {
  const mountTo = document.querySelector('#app')
  render(createElement(App), mountTo)
}
