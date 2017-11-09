import React from 'react'
import renderer from 'react-test-renderer'

import { ButtonBase, IconButton, Button } from '../../lib'

test('Button.js component renders without crashing', () => {
   const component = renderer.create(
      <Button>I am a button</Button>
   )
   
   expect(component).toMatchSnapshot()
})

test('IconButton.js component renders without crashing', () => {
   const component = renderer.create(
      <IconButton>I am an icon</IconButton>
   )
   
   expect(component).toMatchSnapshot()
})