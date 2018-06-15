# Bootstrap a TypeScript + React project

> Learn how to setup a TypeScript + React project from scratch. Understand the reason behind every line involved in the configuration allowing you to customize it at will in the future.

1.  We start of with a bare bones project by creating package.json file

```sh
yarn init -y
```

```json
{
  "name": "demo",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Martin Hochel <mailto:hochelmartin@gmail.com>",
  "license": "MIT"
}
```

2.  Install everything we need in one go.

```sh
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin typescript ts-loader

yarn add react react-dom

yarn add -D @types/react @types/react-dom
```

3.  Lets kick off by wrapping up all modifications needed for package.json by simply adding two script targets.

```json
{
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server -d"
  }
}
```

4.  Next we add a webpack.config.js.

- First we specify an application entry point
- Up next is the output location for our built bundle.
- Next we tell Webpack to support .ts and .tsx file extensions along with the original .js extension.
- Finally we tell webpack that for .ts and .tsx files, it should use ts-loader and we narrow the loader to only include files within `/src`.

```js
// webpack.config.js
const HTMLWebpackPlugin = require('html-webpak-pluginn')
const { resolve } = require('path')

const config = {
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  modules: {
    rule: [
      {
        include: resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new HTMLWebpackPlugin(resolve(__dirname, 'src/index.html'))]
}

module.exports = config
```

5.  Next we create a basic html file in the `src/index.html`.
    > We'll use Emmet `!` and TAB

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React + TS</title>
</head>

<body>
  <div id="app"></div>
</body>

</html>
```

6.  Add a `tsconfig.json` to setup the TypeScript compiler options

- We enable sourcemaps so we can debug TypeScript files in the browser.
- We will be transpiling our code to standard nodejs style commonjs modules.
- We want our generated JavaScript to be compatible with ES5.
- Finally for JSX code we want TypeScript to transpile into React.createElement calls.
- Our source code will be present in the src folder.
- And we disable TypeScript's compileOnSave as that will be handled by webpack.

```json
{
  "compilerOptions": {
    // compile to EcmaScript 5 version ( IE >=9 )
    "target": "es5",
    // tree-shaking
    "module": "es2015",
    // node package aquisition algorithm
    "moduleResolution": "node",
    "sourceMap": true,
    // compile JSX
    "jsx": "react",
    // resolve 3rd party type commonJS definition default imports
    "allowSyntheticDefaultImports": true,
    // buckle up
    "strict": true,
    // where to put output
    "outDir": "out-tsc"
  },
  "exclude": ["node_modules", "dist"]
}
```

7.  That's it for the configuration. Now lets write some demo code.

- Now I'll create our `src/main.ts` file.
- We'll write `bootstrap` function for our initalization logic
- We simply import react and react-dom.
- And finally use `render` from `react-dom` to render hello world to our root div.
  - > we're not using JSX here ;) just createElement calls

```tsx
// main.ts

import { createElement } from 'react'
import { render } from 'react-dom'

const bootstrap = () => {
  const mountTo = document.querySelector('#app')
  render(createElement('div', null, 'Hello World'), mountTo)
}

bootstrap()
```

8.  Type checking webpack.config/JS Files

- Run our app via `yarn start`

> ### IT WILL FAIL ! WOOOT 😱

- We will fix our webpack config by adding TS 💪

- Add `allowJS: true` and exclude "out-tsc" within tsconfig, so TS will consume vanilla js as well

```diff
{
  "compilerOptions": {
+    "allowJs": true,
  },
  "exclude": [
   "node_modules",
   "dist",
+  "out-tsc"
  ]
}
```

- add `// @ts-check` pragma to `webpack.config.js` and behold ! there are errors !
- fix errors
  1.  add 3rd party definitions `yarn add -D @types/{html-webpack-plugin,webpack}`
  2.  fix webpack

```js
// webpack.config.js FIXED

// @ts-check

const HTMLWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        include: resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new HTMLWebpackPlugin({ template: resolve(__dirname, 'src/index.html') })]
}

module.exports = config
```

- verify that everything is type correct `yarn tsc`
- now run our app `yarn start` we're ready !

9.  running app

- If we run npm start it will start up the wepack dev server. It will serve the public folder up at `http://localhost:8080`
- If we open that url, we can see our application running.
- If we make an edit to the file (Hello world again), webpack will will transpile it on the fly and reload the browser automatically.

Now, when you are ready to deploy your application, you can execute `yarn build`.

This time webpack will compile our code and write the `main.js` with `index.html` file to `dist` folder.

If we wanted we could ship the whole `dist` folder to some hosting service provider as it contains our built file along with index.html.
