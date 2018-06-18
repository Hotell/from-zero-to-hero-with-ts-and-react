import React from 'react'
import { mount } from 'enzyme'
import { App } from './app'

describe(`<App/>`, () => {
  jest.useFakeTimers()

  it(`should render`, () => {
    const wrapper = mount(<App />)

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it(`should work as a whole`, () => {
    const wrapper = mount(<App />)
    const incBtn = wrapper.find('button').at(0)
    const decBtn = wrapper.find('button').at(1)
    const intervalCount = wrapper.find('[className="interval-count"]')

    expect(wrapper.find('h1').text()).toBe('Hello World')
    expect(wrapper.find('p').text()).toBe('0')
    expect(intervalCount.text()).toBe('0')

    incBtn.simulate('click')
    incBtn.simulate('click')
    incBtn.simulate('click')
    decBtn.simulate('click')

    expect(wrapper.find('p').text()).toBe('2')

    decBtn.simulate('click')

    expect(wrapper.find('p').text()).toBe('1')

    // test interval
    jest.advanceTimersByTime(1200)
    expect(intervalCount.text()).toBe('1')

    jest.advanceTimersByTime(700)
    expect(intervalCount.text()).toBe('1')

    jest.advanceTimersByTime(200)
    expect(intervalCount.text()).toBe('2')

    // unmount so interval is cleared

    wrapper.unmount()
  })
})
