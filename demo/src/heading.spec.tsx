import React from 'react'
import { shallow } from 'enzyme'

import { Heading, Props } from './heading'

describe(`<Heading/>`, () => {
  it(`should render`, () => {
    const wrapper = shallow(<Heading message="Hello" />)

    expect(wrapper.contains(<h1>Hello</h1>)).toBeTruthy()
  })

  it(`should assert via snapshot`, () => {
    const wrapper = shallow<Heading>(<Heading message="React is great!" />)

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ message: 'Foo Bar' })

    expect(wrapper).toMatchSnapshot()
  })

  it(`should render various h tags based on type prop`, () => {
    const wrapper = shallow<Heading>(<Heading message="React is great!" />)

    expect(wrapper.find('h1').length).toBe(1)

    wrapper.setProps({ type: 'h2' })

    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('h2').length).toBe(1)
  })
})
