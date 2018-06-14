import React, { AnchorHTMLAttributes } from 'react'
import { configure, shallow, ShallowWrapper, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render, unmountComponentAtNode } from 'react-dom'
import toJson from 'enzyme-to-json'

import { App, Link, AppProps, AppState } from './app'

configure({ adapter: new Adapter() })

type LinkProps = import('./app').LinkProps

describe(`shallow rendering`, () => {
  describe(`<${App.name}/>`, () => {
    it(`should render App`, () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true })
      // expect(wrapper.contains('hello')).toBeTruthy()
      // console.log(wrapper.debug())
    })

    it(`should contain 1 p element`, () => {
      const wrapper = shallow(<App />)
      expect(wrapper.find({ className: 'App-intro' })).toHaveLength(1)
    })
    it(`should match the snapshot`, () => {
      const tree = shallow(<App />)
      expect(toJson(tree)).toMatchSnapshot()
    })

    // it(`renders without crashing`, () => {
    //   const root = document.createElement('div')
    //   render(<App />, root)
    //   unmountComponentAtNode(root)
    // })

    it(`should changes p text on button click`, () => {
      const wrapper = shallow(<App />)
      const button = wrapper.find('button')

      expect(wrapper.find('.button-state').text()).toBe('No!')

      button.simulate('click')

      expect(wrapper.find('.button-state').text()).toBe('Yes!')
    })

    it(`should change title text on input change`, () => {
      const wrapper = shallow(<App />)
      const input = wrapper.find('input')

      expect(wrapper.find('h2').text()).toBe('')

      input.simulate('change', { currentTarget: { value: 'Tyler' } })

      expect(wrapper.find('h2').text()).toBe('Tyler')
    })

    it(`should update className with new State`, () => {
      const wrapper = shallow<{}, import('./app').AppState>(<App />)

      expect(wrapper.find('.blue').length).toBe(1)
      expect(wrapper.find('.red').length).toBe(0)

      wrapper.setState({ mainColor: 'red' })

      expect(wrapper.find('.blue').length).toBe(0)
      expect(wrapper.find('.red').length).toBe(1)
    })

    it(`should call componentDidMount`, () => {
      jest.spyOn(App.prototype, 'componentDidMount')
      const wrapper = shallow(<App />)

      expect(App.prototype.componentDidMount).toHaveBeenCalled()
      expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
    })

    it(`should call componentWillReceiveProps via setProps`, () => {
      const componentWillReceivePropsSpy = jest.spyOn(
        App.prototype,
        'componentWillReceiveProps'
      )
      const wrapper = shallow<AppProps, AppState>(<App />)
      wrapper.setProps({ hide: false })

      expect(componentWillReceivePropsSpy.mock.calls.length).toBe(1)
      expect(wrapper.find('.lifeCycle').text()).toBe(
        'componentWillReceiveProps'
      )
    })

    it(`should return correctly when handleStrings function is called`, () => {
      const wrapper = shallow<AppProps, AppState>(<App />)
      const instance: App = wrapper.instance() as App
      const trueReturn = instance.handleStrings('Hello World')
      const falseReturn = (wrapper.instance() as App).handleStrings('')

      expect(trueReturn).toBe(true)
      expect(falseReturn).toBe(false)
    })
  })

  describe(`<Link/>`, () => {
    it(`should link`, () => {
      const el = <Link address="www.google.com" />
      const wrapper = shallow<LinkProps>(<Link address="www.google.com" />)

      expect(wrapper.instance().props.address).toBe('www.google.com')
    })
    it(`should render href correctly on a tag`, () => {
      const wrapper = shallow<LinkProps & AnchorHTMLAttributes<{}>>(
        <Link address="www.google.com" />
      )

      expect(wrapper.props().href).toBe('www.google.com')
    })

    it(`should return null with true hide prop`, () => {
      const wrapper = shallow<LinkProps>(<Link address="''" hide={false} />)
      expect(wrapper.find('a')).toHaveLength(1)

      wrapper.setProps({ hide: true })
      expect(wrapper.get(0)).toBeNull()
    })
  })
})

describe(`mount rendering`, () => {
  it(`should contain correct text in h1`, () => {
    const wrapper = mount(<App />)
    expect(wrapper.find({ className: 'App-intro' })).toHaveLength(1)
  })

  it(`should match the snapshot`, () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    // tree.unmount()
  })
})
