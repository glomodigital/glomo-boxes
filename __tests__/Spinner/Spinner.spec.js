import React from 'react'
import renderer from 'react-test-renderer'

import { Spinner } from '../../lib'

test('Spinner.js component renders without crashing', () => {
   const component = renderer.create(
      <Spinner/>
   )
   
   expect(component).toMatchSnapshot()
})