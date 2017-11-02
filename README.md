# Glomo Boxes 

![Build Status](https://travis-ci.org/globalmouth/glomo-boxes.svg?branch=master)
![npm package](https://img.shields.io/npm/v/glomo-boxes.svg)


> Glomo-Boxes is a set of [React](http://facebook.github.io/react/) components that implement Glomo UI and UX vision for desktop and mobile applications.

## Installation

Glomo-Boxes is available as an [npm package](https://www.npmjs.com/package/glomo-boxes)

**via npm**
```bash
npm install glomo-boxes --save 
```

**via yarn**
```bash
yarn add glomo-boxes
```

## Usage

Here is a quick example of how to get started:

```jsx
import React from 'react'
import { render } from 'react-dom'

// Glomo box component
import { ShowcaseReel } from 'glomo-boxes'

const App = () => (
   <ShowcaseReel>
      ...items
   </ShowcaseReel>
)

render(<App/>, document.querySelector('#root'))
```

## Developing Locally

This project does not come with a built in development environment for the time being. In that case, for local development we will need to go through some steps.

1. Install `create-react-app` on your machine.

```bash
npm i -g create-react-app
```

2. Instantiate a *CRA* project.

```bash
create-react-app <name-of-your-test-project>
cd <name-of-your-test-project>
```

3. Now we want to create a symbolic link to our **modules** that will eventually live in *npm*.

```bash
# inside /glomo-boxes
yarn link

# start webpack for development
yarn start
```

4. Next we want to add the symbolic link from our modules inside our *CRA test app*.

```bash
# inside /<name-of-your-test-project>
yarn link glomo-boxes

# start the test app
yarn start
```

5. Now you are able to make changes in **glomo-boxes** and see those changes reflected in the *CRA test app*. 

6. Once you're happy with the changes you can **unlink** the glomo-boxes module from the test app

```bash
# inside /<name-of-your-test-project>
yarn unlink glomo-boxes

# install dependency from npm
yarn add glomo-boxes
```
