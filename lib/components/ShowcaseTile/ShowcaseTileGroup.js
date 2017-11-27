import React, { Component, cloneElement } from 'react'
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
         inner: {
            padding: '10% 7.5%',
         },
      }

      if (isDesktop) {
         style = {
            inner: {
               padding: '34px 50px 110px 50px',
               borderLeft:
                  this.state.selectedItem != null
                     ? '1px solid rgba(169, 169, 169, 0.5)'
                     : '1px solid transparent',
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
            loaded:
               images.length === this.props.tileItems.length &&
               this.imagesLoaded(this.showcaseTileGroup),
         }
      })
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

   renderOverlay() {
      const { tileColor } = this.props
      const className = styles['showcase-overlay']

      return (
         <div className={className} style={{ backgroundColor: tileColor }} />
      )
   }

   renderFullWidthShowcase() {
      const { fullWidthShowcase } = this.props
      const { selectedItem } = this.state

      if (fullWidthShowcase == null) return null

      const offset = selectedItem / this.props.tileItems.length * 100

      const className = [
         styles['showcase-fullwidth'],
         selectedItem != null ? styles['showcase-fullwidth--active'] : '',
      ].join(' ')

      return (
         <div
            className={className}
            style={{
               backgroundImage: `url(${fullWidthShowcase})`,
               left: `${offset}%`,
            }}
         />
      )
   }

   render() {
      const { loaded, selectedItem, isDesktop } = this.state
      const { tileItems, style, height } = this.props

      if (tileItems == null || tileItems.length < 0) {
         return
      }

      let compStyles = this.generateStyles()

      const tileClassName = [
         styles['showcase-tile-item'],
         loaded ? styles['showcase-tile-item--visible'] : '',
      ].join(' ')

      const tileImageClassName = [
         styles['showcase-tile-bgimage-item'],
         loaded ? styles['showcase-tile-bgimage-item--visible'] : '',
      ].join(' ')

      return (
         <section
            style={{ height: height, ...style }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {' '}
            {this.renderPlaceholder()}
            {this.renderOverlay()}
            {this.renderFullWidthShowcase()}
            <div
               className={[
                  styles['showcase-tile-content'],
                  isDesktop ? styles['showcase-tile-content--desktop'] : '',
               ].join(' ')}
            >
               {tileItems.map((item, index) => {
                  const delay = `${index * 0.1}s`
                  const isHovered =
                     selectedItem != null ? selectedItem === index : null
                  return (
                     <ShowcaseTile
                        key={`tile-item-${index}`}
                        contentColor={item.contentColor}
                        title={item.title}
                        subTitle={item.subTitle}
                        excerpt={item.excerpt}
                        style={compStyles.inner}
                        delay={delay}
                        className={tileClassName}
                        active={isHovered}
                        handleMouseEnter={e => this.handleMouseEnter(index)}
                        handleMouseLeave={this.handleMouseLeave}
                     />
                  )
               })}
            </div>
            <div
               className={[
                  styles['showcase-tile-bgimage'],
                  isDesktop ? styles['showcase-tile-bgimage--desktop'] : '',
               ].join(' ')}
            >
               {tileItems.map((item, index) => {
                  if (item.image == null) return null
                  const delay = `${index * 0.2}s`
                  const isHovered =
                     selectedItem != null ? selectedItem === index : null

                  const imageElement = (
                     <div
                        className={styles['showcase-bgimage']}
                        key={index}
                        style={{ backgroundImage: `url(${item.image})` }}
                     />
                  )

                  return (
                     <div
                        className={tileImageClassName}
                        style={{
                           transitionDelay: delay,
                        }}
                     >
                        {imageElement}
                     </div>
                  )
               })}
            </div>
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
