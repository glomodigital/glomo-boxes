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
import ShowcaseReel from 'glomo-boxes/ShowcaseReel'

const App = () => (
   <ShowcaseReel>
      ...items
   </ShowcaseReel>
)

render(<App/>, document.querySelector('#root'))
```