import { createElement } from 'react'
import { render } from 'react-dom'

const bootstrap = () => {
  const mountTo = document.querySelector('#app')
  render(createElement('div', null, 'Hello World'), mountTo)
}

bootstrap()
