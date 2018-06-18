# React + TypeScript Testing

> Let's introduce testing for the functionality of a React components using Jest and Ezyme.

1.  install deps

We start off by installing jest, types for jest, typescript preprocessor for jest, enzyme, types for enzyme, and an adator for enzyme for our react version to our example react typescript application.

```sh
yarn add -D jest @types/jest ts-jest enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 enzyme-to-json
```

2.  configure jest and enzyme

```sh
touch jest.config.js
touch src/setup-enzyme.js
```

This file just tells jest that all our source is located in the src folder

- For ts and tsx files we will be using ts-jest.
- Jest should pickup files that end with .test
- And that jest should pickup .ts and .tsx files as a part of its module lookup.
- And a configuration file for enzyme.

```js
// @ts-check

/**
 * @type {jest.InitialOptions}
 */
const config = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-enzyme.js',
  snapshotSerializers: ['enzyme-to-json/serializer']
}

module.exports = config
```

```js
// setup-enzyme.js

// @ts-check
const { configure } = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

configure({ adapter: new EnzymeAdapter() })
```

- add npm script for test

```json
{
  "scripts": {
    "test": "jest --watch"
  }
}
```

3.  let's write our tests

### Heading test

```sh
touch heading.spec.tsx
```

```tsx
import React from 'react'
import { shallow } from 'enzyme'

import { Heading, Props } from './heading'

describe(`<Heading/>`, () => {
  it(`should render`, () => {
    const wrapper = shallow(<Heading message="Hello" />)

    expect(wrapper.contains(<h1>Hello</h1>)).toBeTruthy()
  })

  it(`should assert via snapshot`, () => {
    const wrapper = shallow<Props>(<Heading message="React is great!" />)

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ message: 'Foo Bar' })

    expect(wrapper).toMatchSnapshot()
  })
})
```

##### Heading test Bonus for default Props

```tsx
describe(`<Heading/>`, () => {
  it(`should render various h tags based on type prop`, () => {
    const wrapper = shallow<Props>(<Heading message="React is great!" />)

    expect(wrapper.find('h1').length).toBe(1)

    wrapper.setProps({ type: 'h2' })

    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('h2').length).toBe(1)
  })
})
```

### App integration test

```sh
touch src/app.spec.tsx
```

```tsx
// app.spec.tsx
import React from 'react'
import { mount } from 'enzyme'
import { App } from './app'

describe(`<App/>`, () => {
  it(`should work as a whole`, () => {
    const wrapper = mount(<App />)
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
```

##### Bonus: App integration test with Interval component

```tsx
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
```
