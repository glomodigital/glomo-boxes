import React from 'react'
import renderer from 'react-test-renderer'

import { ProfileCard } from '../../lib'

test('renders without crashing', () => {
   const component = renderer.create(
      <ProfileCard
         title="Sales & Business Development"
         firstName="Cecilia"
         lastName="Ydremark"
         text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
         phone="+46 76 123 45 67"
         email="example@glomo.se"
         colorTheme="light"
         backgroundColor="#333333"
         backgroundGradientColor="#003439"
         buttonColor="#FFF"
      />
   )

   expect(component).toMatchSnapshot()
})
