import React from 'react'
import renderer from 'react-test-renderer'

import ShowcaseReel from '../../src/ShowcaseReel'

test('renders without crashing', () => {
   const component = renderer.create(
      <ShowcaseReel value="Showcase Reel" />
   )
   
   expect(component).toMatchSnapshot()
})