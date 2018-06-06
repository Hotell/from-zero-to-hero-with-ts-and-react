import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render, unmountComponentAtNode } from 'react-dom'

import { App } from './app'

configure({ adapter: new Adapter() })

describe(`<${App.name}/>`, () => {
  it(`should render App`, () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains('hello')).toBeTruthy()
  })

  it(`renders without crashing`, () => {
    const root = document.createElement('div')
    render(<App />, root)
    unmountComponentAtNode(root)
  })
})
