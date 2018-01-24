/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-danger */
/* eslint-disable no-alert */
import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import reactElementToJSXString from 'react-element-to-jsx-string'
import hljs from 'highlight.js'

import styles from './app.css'
import arrowRight from '../assets/ic_arrow_forward_black_24px.svg'
import facebook from '../assets/facebook.svg'
import caseExample from '../assets/Case_Skanska-ipad.jpg'

import {
   Carousel,
   IconButton,
   Button,
   ShowcaseTile,
   ShowcaseTileGroup,
   ProfileCard,
   Hexagon,
   ShowcaseReel,
} from './index'

const ROOT = document.getElementById('root')

const TestContainer = ({ description, element }) => {
   // NOTE: Not working anymore
   // const elementString = reactElementToJSXString(element)
   const elementString = element.toString()
   return (
      <div className={styles['test-container']}>
         <div className="header">
            <h2>{element.type.name}</h2>
            {description}
         </div>
         <div className="code">
            <h3>Code</h3>
            <pre>
               <code
                  className="language-html"
                  dangerouslySetInnerHTML={{
                     __html: hljs.highlight('html', elementString, true),
                  }}
               />
            </pre>
         </div>
         <div className={styles.example}>
            <h3>Working example</h3>
            <div className={styles.component}>{element}</div>
         </div>
      </div>
   )
}

TestContainer.propTypes = {
   description: PropTypes.string.isRequired,
   element: PropTypes.element,
}

const renderComponent = (description, node) => {
   const mountElement = document.createElement('div')
   mountElement.className = 'mount-element'
   ROOT.appendChild(mountElement)

   ReactDOM.render(
      <TestContainer description={description} element={node} />,
      mountElement
   )
}

renderComponent(
   'Carousel component with default props showing 3x divs of block color.',
   <Carousel height={550} autoPlay={true}>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />
      <div
         style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
      />
      <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }} />
   </Carousel>
)

renderComponent(
   'ShowcaseReel component with football players',
   <ShowcaseReel
      autoLoop={false}
      reelItems={[
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/peter-schmeichel.jpg',
            title: 'Peter Schmeichel',
            excerpt:
               'Specialised widgets reducing production time, lowering costs and allows new products to be faster to market based on the fast, reliable platform developed for Kambi by Globalmouth.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/luis-suarez-0.jpg',
            title: 'Luis Suarez',
            excerpt:
               'End to end digitalisation of the interior design selection process from the consumer to the suppliers and the construction site.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/sol-campbell.jpg',
            title: 'Sol Campbell',
            excerpt:
               'End to end digitalisation of the interior design selection process from the consumer to the suppliers and the construction site.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/michael-owen.jpg',
            title: 'Michael Owen',
            excerpt:
               'Specialised widgets reducing production time, lowering costs and allows new products to be faster to market based on the fast, reliable platform developed for Kambi by Globalmouth.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/paul-scholes-0.jpg',
            title: 'Paul Scholes',
            excerpt:
               'A prototype in React Native helping our clients with early stage development.',
         },
      ]}
   />
)

renderComponent(
   'IconButton with material icons',
   <IconButton
      onMouseDown={e => {
         e.preventDefault()
         alert('IconButton onMouseDown: ' + e.target)
      }}
      onTouchStart={e => {
         e.preventDefault()
         alert('IconButton onTouchStart: ' + e.target)
      }}
      processing={false}
   >
      <img src={arrowRight} alt="arrow right" />
   </IconButton>
)

renderComponent(
   'Button with default primary actionType and styles',
   <Button
      // actionType='secondary'
      type="a"
      href={'http://google.com'}
      onMouseDown={e => {
         e.preventDefault()
         alert('Button onMouseDown: ' + e.target)
      }}
      onTouchStart={e => {
         e.preventDefault()
         alert('Button onTouchStart: ' + e.target)
      }}
      color={'#fff'}
      backgroundColor={'#003439'}
      style={{ fontSize: '18px' }}
   >
      primary
   </Button>
)

renderComponent(
   'Button with default primary actionType and fullWidth',
   <Button
      // actionType='secondary'
      onMouseDown={e => {
         e.preventDefault()
         alert('Button onMouseDown: ' + e.target)
      }}
      onTouchStart={e => {
         e.preventDefault()
         alert('Button onTouchStart: ' + e.target)
      }}
      color={'#fff'}
      backgroundColor={'#003439'}
      style={{ fontSize: '32px' }}
      fullWidth
   >
      full width
   </Button>
)

renderComponent(
   'Button with secondary actionType and styles',
   <Button
      actionType="secondary"
      onMouseDown={e => {
         e.preventDefault()
         alert('Button onMouseDown: ' + e.target)
      }}
      onTouchStart={e => {
         e.preventDefault()
         alert('Button onTouchStart: ' + e.target)
      }}
      color={'#fff'}
      backgroundColor={'#003439'}
      style={{ fontSize: '18px' }}
   >
      secondary
   </Button>
)

renderComponent(
   'ShowcaseTile component',
   <ShowcaseTile
      tileColor={'#323232'}
      contentColor={'#fff'}
      title={'Title One'}
      subTitle={'01'}
      excerpt={
         'Activated charcoal drinking vinegar fingerstache, stumptown ugh butcher organic PBR&B fashion axe tousled locavore. +1 viral iceland farm-to-table truffaut. Craft beer man bun keytar brunch chambray literally paleo small batch DIY iceland tbh cred palo santo tattooed.'
      }
   />
)

renderComponent(
   'Profile Card with light theme and gradiant background',
   <ProfileCard
      image="https://i2-prod.mirror.co.uk/incoming/article8017113.ece/ALTERNATES/s615/PAY-David-Ginola.jpg"
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

renderComponent(
   'ShowcaseTile component',
   <ShowcaseTileGroup
      tileColor="#181818"
      fullWidthShowcase="http://techslides.com/demos/sample-videos/small.mp4"
      video={true}
      loadingNode={
         <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
            <circle id="loading-inner" cx="75" cy="75" r="60" />
         </svg>
      }
      tileItems={[
         {
            tileColor: '#181818',
            contentColor: '#fff',
            title: 'Insight & Strategy',
            subTitle: '01',
            excerpt:
               'From an introductory paragraph to the final product, Glomo provides you with strategic guidance to help you meeting your business goals!',
            image:
               'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
         },
         {
            tileColor: '#181818',
            contentColor: '#fff',
            title: 'Design & Prototyping',
            subTitle: '02',
            excerpt:
               'Design led innovation and usable prototypes is part of our service to ensure your product has more than just a good looking design. ',
            image:
               'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
         },
         {
            tileColor: '#181818',
            contentColor: '#fff',
            title: 'Development & Quality Assurance',
            subTitle: '03',
            excerpt:
               'Some say it`s the toughest of all, we love the challenge! Wheter you need one resource or a whole team our genius developers, testers and project managers work wtih the latest technologies, tools and frameworks',
            image:
               'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
         },
         {
            tileColor: '#181818',
            contentColor: '#fff',
            title: 'Hosting & Support',
            subTitle: '04',
            excerpt:
               'Our work doesn`t stop once your site goes live so we provide the updates and enhancements you need to keep growing',
            image:
               'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
         },
      ]}
   />
)

renderComponent(
   'Profile Card with dark theme',
   <ProfileCard
      image="https://i2-prod.mirror.co.uk/incoming/article8017113.ece/ALTERNATES/s615/PAY-David-Ginola.jpg"
      title="Sales & Business Development"
      firstName="Cecilia"
      lastName="Ydremark"
      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
      phone="+46 76 123 45 67"
      email="example@glomo.se"
      colorTheme="dark"
      backgroundColor="#FFF"
      buttonColor="#003439"
   />
)

renderComponent(
   'Hexagon with background image',
   <Hexagon width="266px" backgroundImage={caseExample} />
)

renderComponent(
   'Hexagon with icon',
   <Hexagon
      width="44px"
      backgroundColor="#3a5998"
      icon={facebook}
      iconSize={22}
   />
)

renderComponent(
   'Hexagon with gradiant color background and drop shadow',
   <Hexagon
      width="50%"
      shadow="drop-shadow(0 0 20px rgb(0, 0, 0))"
      gradientColors={['#4b4b4b', '#167b86', '#4b4b4b']}
      gradientOpacity={0.9}
      gradientAngle={120}
   />
)
// Example
// render('ShowcaseReel Element', <ShowcaseReel value="showcase reel" />)

/**
 * DO NOT REMOVE
 * this is testing a testimonial component with the carousel
 */
// const Testimonial = () => (
//    <section className={styles.section}>
//       <Carousel
//          height={660}
//          autoPlay={true}
//          animationType='slide'
//          intervalDuration={6000}
//       >
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Leggings yuccie truffaut synth, coloring book quinoa hashtag viral
//                banjo man braid raclette. Slow-carb actually selvage fam kale chips
//                organic cred trust fund post-ironic cloud bread ramps pug. Poutine
//                intelligentsia four dollar toast, marfa cliche af swag seitan mlkshk
//                portland thundercats green juice trust fund hammock. Skateboard
//                distillery poke, slow-carb chartreuse drinking vinegar la croix
//                quinoa hexagon selfies pop-up street art.
//             </div>
//          </div>
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Occaecat ex duis ex elit irure quis pariatur tempor consequat
//                laboris magna magna ullamco. Incididunt exercitation sint laboris
//                exercitation voluptate velit esse voluptate laboris officia mollit.
//                Sunt amet anim aute officia deserunt occaecat ipsum ullamco
//                adipisicing cupidatat do.
//             </div>
//          </div>
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Activated charcoal drinking vinegar fingerstache, stumptown ugh
//                butcher organic PBR&B fashion axe tousled locavore. +1 viral iceland
//                farm-to-table truffaut. Craft beer man bun keytar brunch chambray,
//                literally paleo small batch DIY iceland tbh cred palo santo
//                tattooed.
//             </div>
//          </div>
//       </Carousel>
//    </section>
// )

// Initialize highlighting of code
hljs.initHighlighting()
