import React from 'react';
import { shallow } from 'enzyme';

import { Heading, Props } from './heading';

describe(`<Heading/>`, () => {
  it(`should render`, () => {
    const wrapper = shallow(<Heading message="Hello"/>)

    expect(wrapper.contains(<h1>Hello</h1>)).toBeTruthy()
  })

  it(`should assert via snapshot`, () => {

    const wrapper = shallow<Props>(<Heading message="React is great!"/>)

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({message:'Foo Bar'})

    expect(wrapper).toMatchSnapshot()
  })
})
