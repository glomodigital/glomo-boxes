import React, { Component } from 'react'
import PropType from 'prop-types'

import styles from './ShowcaseTileGroup.css'
import ShowcaseTile from './ShowcaseTile'

import { resize } from '../../utils/helpers'

const BREAKPOINT = 900

export default class ShowcaseTileGroup extends Component {
   static propTypes = {
      tileItems: PropType.arrayOf(PropType.shape(ShowcaseTile.propTypes))
         .isRequired,
      style: PropType.shape({}),
   }

   state = {
      isDesktop: window.innerWidth < BREAKPOINT ? false : true,
      loading: true,
      loadedImages: [],
   }

   componentDidMount() {
      resize.add(this.resize)

      if (this.showcaseTileGroup != null) {
         const containerX = this.showcaseTileGroup.getBoundingClientRect().width
         this.setState({ isDesktop: containerX < BREAKPOINT ? false : true })
      }
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false })
      }
   }

   generateStyles = () => {
      const { isDesktop } = this.state

      let style = {
         wrapper: {
            display: 'flex',
            flexDirection: 'column',
         },
         inner: {
            padding: '10% 7.5%',
         },
      }

      if (isDesktop) {
         style = {
            wrapper: {
               ...style.wrapper,
               flexDirection: 'row',
            },
            inner: {
               ...style.inner,
               padding: '20% 15% 30% 15%',
            },
         }
      }

      return style
   }

   handleImageChange = e => {
      e.persist()
      const image = e.target
      const showcaseGroup = this.showcaseTileGroup

      this.setState(({ loadedImages }) => {
         return { loadedImages: loadedImages.concat(image.currentSrc) }
      })
      // this.setState({
      //    loading: !this.imagesLoaded(showcaseGroup),
      // })
   }

   imagesLoaded = node => {
      const imageElements = node.querySelectorAll('img')
      imageElements.forEach(element => {
         if (!element.complete) {
            return false
         }
      })
      return true
   }

   renderPlaceholder() {
      return (
         <div className={styles['showcase-placeholder']}>
            <span>Showcase Tile Group Loading...</span>
         </div>
      )
   }

   render() {
      const { loading, loadedImages } = this.state
      const { tileItems, style } = this.props

      if (tileItems == null || tileItems.length < 0) {
         return
      }

      let compStyles = this.generateStyles()

      return (
         <section
            style={{ ...compStyles.wrapper, ...style }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {tileItems.length > loadedImages.length && this.renderPlaceholder()}

            {tileItems.map((item, index) => (
               <ShowcaseTile
                  key={`tile-item-${index}`}
                  tileColor={item.tileColor}
                  contentColor={item.contentColor}
                  title={item.title}
                  subTitle={item.subTitle}
                  excerpt={item.excerpt}
                  image={item.image}
                  style={compStyles.inner}
               />
            ))}

            <div className={styles.hidden}>
               {tileItems.map((item, index) => {
                  return (
                     <img
                        src={item.image}
                        alt="hidden for lazy loading"
                        key={index}
                        onLoad={this.handleImageChange}
                     />
                  )
               })}
            </div>
         </section>
      )
   }
}
