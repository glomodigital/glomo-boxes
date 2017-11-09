import React from 'react'
import renderer from 'react-test-renderer'

import { Carousel } from '../../lib'

test('renders without crashing', () => {
   const component = renderer.create(
      <Carousel height={330}>
         <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />
         <div
            style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
         />
         <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }} />
      </Carousel>
   )
   
   expect(component).toMatchSnapshot()
})