import React from 'react';
import { mount } from 'enzyme';
import { App } from './app';

describe(`<App/>`, () => {
  it(`should render`, () => {
    const wrapper = mount(<App/>)

    expect(wrapper).toMatchSnapshot()
  })

  it(`should work as a whole`, () => {
    const wrapper = mount(<App/>)
    const incBtn = wrapper.find('button').at(0)
    const decBtn = wrapper.find('button').at(1)

    expect(wrapper.find('h1').text()).toBe('Hello World')
    expect(wrapper.find('p').text()).toBe('0')

    incBtn.simulate('click')
    incBtn.simulate('click')
    incBtn.simulate('click')
    decBtn.simulate('click')

    expect(wrapper.find('p').text()).toBe('2')

    decBtn.simulate('click')

    expect(wrapper.find('p').text()).toBe('1')
  })
})
