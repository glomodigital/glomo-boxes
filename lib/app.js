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
   <Carousel height={550}>
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
      reelItems={[
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/peter-schmeichel.jpg',
            title: 'Peter Schmeichel',
            excerpt:
               'With all due respect to Petr Cech, Schmeichel is the greatest goalkeeper of the Premier League era, a man almost as important as Eric Cantona in giving Manchester United the presence, charisma and quality they needed to reassert themselves as the best team in the country in the 1990s. Won five titles at United, and played for Aston Villa and Manchester City afterwards.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/luis-suarez-0.jpg',
            title: 'Luis Suarez',
            excerpt:
               'Only played in the Premier League for three and a half years and yet he was so unforgettably good during his brief spell at Liverpool that he demands inclusion. His 2013-14 season remains the greatest single season by a player in Premier League history, when he scored 31 brilliant goals and came within inches of winning Liverpool’s first title for a generation. Wonder what he could have done in a better team? In his first year at Barcelona he won the Champions League.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/sol-campbell.jpg',
            title: 'Sol Campbell',
            excerpt:
               'During his long peak, Campbell was a mix of athleticism, bravery and intelligence, anchoring the Spurs defence for six seasons, Arsenal for five and Portsmouth, at their very best, for another three. He was one of the crucial signings who helped to take Arsenal to the next level, and to the 2001-02 and 2003-04 titles, even if that controversial free transfer move will never be forgiven by Tottenham fans.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/michael-owen.jpg',
            title: 'Michael Owen',
            excerpt:
               'Like Rooney, a striker who almost suffered by achieving so much so early: Owen won two Premier League Golden Boots as a teenager and was electric between breaking into the Liverpool first team at 17 and leaving for Real Madrid at 24. He even won the Ballon d’Or. Did eventually get his medal, with Manchester United, but it is the first half of his career for which he will always be remembered.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/paul-scholes-0.jpg',
            title: 'Paul Scholes',
            excerpt:
               'Perhaps underappreciated at the peak of his powers, Scholes was the pass and move specialist at the heart of United’s great teams. He played some of his best football in the final years of his career, after overcoming an eye injury, and even came out of retirement in 2012, helping United to the 2012-13 Premier League title, the sixth of his career.',
         },
         {
            imagePath:
               'https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2017/08/10/15/dennis-bergkamp.jpg',
            title: 'Dennis Bergkamp',
            excerpt:
               'As important as Thierry Henry to the style and success of the early Arsene Wenger years, Bergkamp predated Wenger’s arrival but was his perfect representative on the pitch. Bergkamp was, in his own words, the ‘technical leader’ of those Arsenal teams and those three Premier League titles before his retirement would have been unimaginable without him.',
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
      tileColor="#323232"
      fullWidthShowcase="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
      tileItems={[
         {
            tileColor: '#323232',
            contentColor: '#fff',
            title: 'Title One',
            subTitle: '01',
            excerpt:
               'From an introductory paragraph to the final product, Glomo provides you with strategic guidance to help you meeting your business goals!',
            image:
               'https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg',
         },
         {
            tileColor: '#323232',
            contentColor: '#fff',
            title: 'Title Two',
            subTitle: '02',
            excerpt:
               'Design led innovation and usable prototypes is part of our service to ensure your product has more than just a good looking design.',
            image:
               'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
         },
         {
            tileColor: '#323232',
            contentColor: '#fff',
            title: 'Title Three',
            subTitle: '03',
            excerpt:
               'Some say it`s the toughest of all, we love the challenge! Wheter you need one resource or a whole team our genius developers, testers and project managers work wtih the latest technologies, tools and frameworks',
            // <img
            //    src="https://static.pexels.com/photos/450271/pexels-photo-450271.jpeg"
            //    alt="this thing"
            // />
            image:
               'https://static.pexels.com/photos/450271/pexels-photo-450271.jpeg',
         },
         {
            tileColor: '#323232',
            contentColor: '#fff',
            title: 'Title Four',
            subTitle: '04',
            excerpt:
               'Our work doesn`t stop once your site goes live so we provide the updates and enhancements you need to keep growing',
            image:
               'https://static.pexels.com/photos/48770/business-time-clock-clocks-48770.jpeg',
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
