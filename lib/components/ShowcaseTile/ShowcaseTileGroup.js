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
      loaded: false,
      loadedImages: [],
      selectedItem: null,
   }

   componentDidMount() {
      resize.add(this.resize)

      if (this.showcaseTileGroup != null) {
         const containerX = this.showcaseTileGroup.getBoundingClientRect().width
         this.setState({
            isDesktop: containerX < BREAKPOINT ? false : true,
         })
      }
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({
            isDesktop: true,
         })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({
            isDesktop: false,
         })
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
               padding: '34px 50px 110px 50px',
            },
         }
      }

      return style
   }

   handleMouseEnter = item => {
      this.setState({ selectedItem: item })
   }

   handleMouseLeave = e => {
      this.setState({ selectedItem: null })
   }

   handleImageChange = e => {
      e.persist()
      const image = e.target
      this.setState(({ loadedImages }) => {
         const images = loadedImages.concat(image.currentSrc)
         return {
            loadedImages: images,
            loaded: images.length === this.props.tileItems.length,
         }
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
      const { loaded } = this.state
      const className = [
         styles['showcase-placeholder'],
         loaded ? styles['showcase-placeholder--hidden'] : '',
      ].join(' ')

      return (
         <div className={className}>
            <span> Showcase Tile Group Loading... </span>{' '}
         </div>
      )
   }

   render() {
      const { loaded, selectedItem } = this.state
      const { tileItems, style } = this.props

      if (tileItems == null || tileItems.length < 0) {
         return
      }

      let compStyles = this.generateStyles()

      const tileClassName = [
         styles['showcase-tile-item'],
         loaded ? styles['showcase-tile-item--visible'] : '',
      ].join(' ')

      return (
         <section
            style={{
               ...compStyles.wrapper,
               ...style,
            }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {' '}
            {this.renderPlaceholder()}
            {tileItems.map((item, index) => {
               const delay = `${index * 0.1}s`
               const isHovered =
                  selectedItem != null ? selectedItem === index : null
               return (
                  <ShowcaseTile
                     key={`tile-item-${index}`}
                     tileColor={item.tileColor}
                     contentColor={item.contentColor}
                     title={item.title}
                     subTitle={item.subTitle}
                     excerpt={item.excerpt}
                     image={item.image}
                     style={compStyles.inner}
                     delay={delay}
                     className={tileClassName}
                     active={isHovered}
                     handleMouseEnter={e => this.handleMouseEnter(index)}
                     handleMouseLeave={this.handleMouseLeave}
                  />
               )
            })}
            <div className={styles.hidden}>
               {' '}
               {tileItems.map((item, index) => {
                  return (
                     <img
                        src={item.image}
                        alt="hidden for lazy loading"
                        key={index}
                        onLoad={this.handleImageChange}
                     />
                  )
               })}{' '}
            </div>{' '}
         </section>
      )
   }
}
