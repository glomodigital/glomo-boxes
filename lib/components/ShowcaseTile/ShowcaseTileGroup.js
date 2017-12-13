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
      showcaseTileGroupActive: false,
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
      const { isDesktop, selectedItem } = this.state

      const borderActive = '1px solid rgba(169, 169, 169, 0.5)'
      const borderDefault = '1px solid transparent'

      let style = {
         inner: {
            padding: '34px 34px 68px 34px',
            borderLeft: borderDefault,
            borderBottom: selectedItem != null ? borderActive : borderDefault,
         },
      }

      if (isDesktop) {
         style = {
            inner: {
               padding: '34px 50px 110px 50px',
               borderLeft: selectedItem != null ? borderActive : borderDefault,
               borderBottom: borderDefault,
            },
         }
      }

      return style
   }

   handleMouseEnter = item => {
      this.setState({ selectedItem: item })
   }

   handleMouseLeave = e => {
      this.setState({ selectedItem: null, showcaseOffset: null })
   }

   handleOnTap = item => {
      const previousItem = this.state.selectedItem

      this.setState(
         { selectedItem: item === previousItem ? null : item },
         () => {
            this.showcaseTileGroupOnTap()
         }
      )
   }

   showcaseTileGroupMouseEnter = e => {
      this.setState({ showcaseTileGroupActive: true })
   }

   showcaseTileGroupMouseLeave = e => {
      this.setState({ showcaseTileGroupActive: false })
   }

   showcaseTileGroupOnTap = e => {
      this.setState({
         showcaseTileGroupActive:
            this.state.selectedItem != null ? true : false,
      })
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
      const { showcaseTileGroupActive } = this.state

      if (fullWidthShowcase == null) return null

      const className = [
         styles['showcase-fullwidth'],
         showcaseTileGroupActive ? styles['showcase-fullwidth--active'] : '',
      ].join(' ')

      return (
         <div
            className={className}
            style={{
               backgroundImage: `url(${fullWidthShowcase})`,
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

      return (
         <section
            style={{ height: height, ...style }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
            onMouseEnter={this.showcaseTileGroupMouseEnter}
            onMouseLeave={this.showcaseTileGroupMouseLeave}
         >
            {' '}
            {this.renderPlaceholder()}
            {this.renderOverlay()}
            {isDesktop && this.renderFullWidthShowcase()}
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
                  const tileStyle = {}
                  return (
                     <div
                        className={[
                           styles['showcase-tile-section'],
                           isDesktop
                              ? styles['showcase-tile-section-desktop']
                              : '',
                        ].join(' ')}
                     >
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
                           onTap={e => this.handleOnTap(index)}
                        />
                     </div>
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
                  const isNotHovered =
                     selectedItem != null ? selectedItem != index : null
                  const tileImageClassName = [
                     styles['showcase-tile-bgimage-item'],
                     loaded
                        ? styles['showcase-tile-bgimage-item--visible']
                        : '',
                     isHovered && isDesktop
                        ? styles['showcase-tile-bgimage-item--active']
                        : '',
                     isNotHovered && isDesktop
                        ? styles['showcase-tile-bgimage-item--inactive']
                        : '',
                  ].join(' ')
                  const imageElement = (
                     <div
                        className={styles['showcase-bgimage']}
                        style={{ backgroundImage: `url(${item.image})` }}
                     />
                  )

                  return (
                     <div
                        className={tileImageClassName}
                        // style={{
                        //    transitionDelay: delay,
                        // }}
                        key={index}
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
