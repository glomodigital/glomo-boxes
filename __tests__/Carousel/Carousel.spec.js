import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Carousel } from '../../lib'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('renders without crashing', () => {
   let carousel = (
      <Carousel height={330}>
         <div
            style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}
         />
         <div
            style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
         />
         <div
            style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
         />
      </Carousel>
   )

   const component = mount(carousel)

   expect(toJson(component)).toMatchSnapshot()
})
