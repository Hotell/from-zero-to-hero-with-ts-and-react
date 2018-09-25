# V2

## Agenda:

1.  What is React
2.  What is TypeScript
3.  What are we gonna build ( explain architecture )=
4.  Hands down, chin up!
5.  Recap and finish him!

## Code session

## Phase 1

1.  start from scratch

`yarn init -y`

2.  install dependencies

```sh
yarn add react{,-dom} @types/react{,-dom}

yarn add -D typescript parcel-bundler
```

3.  initialize TypeScript

`yarn tsc --init`

And tweak config to:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "lib": ["dom", "es2015"],
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./ts-out",

    /* Strict Type-Checking Options */
    "strict": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    // "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["./src"]
}
```

4.  initialize code structure

```sh
mkdir src && touch src/{index.html,main.ts}
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React + TS = ❤️</title>
</head>

<body>
  <div id="app"></div>
  <script src="main.ts"></script>
</body>

</html>
```

**main.ts**

```ts
const bootstrap = () => {
  const mountTo = document.getElementById('app') as HTMLDivElement
  const app = document.createElement('div')
  app.innerHTML = 'IT WORKS !!!'

  mountTo.appendChild(app)
}

bootstrap()
```

5.  setup Tasks via npm scripts

```json
{
  "scripts": {
    "start": "parcel src/index.html"
  }
}
```

`yarn start`

- BEHOLD IT WORKS!
- BEHOLD HOT MODULE REPLACEMENT!

6.  add papercss

`yarn add papercss`

**main.ts**

```ts
import 'papercss/dist/paper.css'

const bootstrap = () => {
  const mountTo = document.getElementById('app') as HTMLDivElement
  const app = document.createElement('div')
  app.innerHTML = 'IT WORKS !!!'
  app.className = 'container margin'

  mountTo.appendChild(app)
}

bootstrap()
```

## Phase 2 - React

```sh
mkdir src/app &&
touch src/app/app.tsx
```

Create root component and render it to DOM

**app.tsx**

```tsx
import React, { Component } from 'react'

export class App extends Component {
  render() {
    return <div className="container margin">It Works !!!</div>
  }
}
```

mount React tree

**main.ts**

```tsx
import 'papercss/dist/paper.css'

import { render } from 'react-dom'
import { createElement } from 'react'

import { App } from './app/app'

const bootstrap = () => {
  const mountTo = document.getElementById('app') as HTMLDivElement
  render(createElement(App), mountTo)
}

bootstrap()
```

- Explain what just happened
