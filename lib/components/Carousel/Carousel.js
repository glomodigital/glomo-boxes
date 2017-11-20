import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Carousel.css'

import leftChevron from './ic_chevron_left_black_24px.svg'
import rightChevron from './ic_chevron_right_black_24px.svg'

const checkImage = (path, index) => {
   return new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve(path)
      img.onerror = () => {
         console.log(`Image ${index} failed to load`)
         // TODO perhaps handle removing image from carousel array???
         // we don't need to reject and break the promise.all with reject()
         resolve()
      }
      img.src = path
   })
}

export default class Carousel extends Component {
   static displayName = 'Carousel'

   static propTypes = {
      showIndicators: PropTypes.bool,
      infiniteLoop: PropTypes.bool,
      legendClassName: PropTypes.string,
      wrapperClassName: PropTypes.string,
      cssEase: PropTypes.string,
      animationType: PropTypes.oneOf(['fade', 'slide']),
      selectedItem: PropTypes.number,
      height: PropTypes.number,
      autoPlay: PropTypes.bool,
      stopOnHover: PropTypes.bool,
      intervalDuration: PropTypes.number,
      transitionDuration: PropTypes.number,
      children: PropTypes.node,
      redirectCallback: PropTypes.func,
      onCarouselChange: PropTypes.func,
      onCarouselItemClick: PropTypes.func,
      onCarouselMouseEnter: PropTypes.func,
      onCarouselMouseLeave: PropTypes.func,
      initializedCarousel: PropTypes.func,
      imagesLoaded: PropTypes.func,
   }

   static defaultProps = {
      showIndicators: true,
      infinite: true,
      showArrows: true,
      infiniteLoop: true,
      legendClassName: null,
      wrapperClassName: null,
      cssEase: 'ease',
      animationType: 'slide',
      selectedItem: 0,
      height: 0,
      autoPlay: false,
      stopOnHover: true,
      intervalDuration: 3500,
      transitionDuration: 800,
      items: null,
      redirectCallback: null,
      onCarouselChange: () => {},
      onCarouselMouseEnter: () => {},
      onCarouselMouseLeave: () => {},
      onCarouselItemClick: () => {},
      initializedCarousel: () => {},
      imageLoaded: () => {},
   }

   constructor(props) {
      super(props)
      this.timer
      this.changeTimer

      this.state = {
         isMouseEntered: false,
         currentPosition: props.selectedItem,
         lastPosition: null,
         carouselItems: [],
         cssAnimation: {},
         translate3d: null,
         initialized: false,
         fromChildren: false,
      }
   }

   componentDidMount() {
      if (this.props.children == null || this.props.children.length === 0) {
         return null
      }
      this.setupCarousel()
   }

   componentDidUpdate() {
      if (!this.state.initialized) {
         this.setupCarousel()
      }
   }

   componentWillUnmount() {
      clearTimeout(this.changeTimer)
   }

   setupCarousel() {
      const { children, autoPlay } = this.props
      const { currentPosition } = this.state

      const itemWidth = this.sliderNode.getBoundingClientRect().width
      const currentIndex = Math.min(
         currentPosition ? Math.abs(Math.ceil(currentPosition)) : 0,
         children.length - 1
      )

      if (autoPlay) {
         this.setupAutoPlay()
      }

      this.setState(
         {
            currentPosition: currentIndex,
            initialized: true,
            carouselItems: children,
            clones: this.cloneItems(children),
            translate3d: -itemWidth * (1 + currentIndex),
            itemWidth,
         },
         () => this.props.initializedCarousel(true)
      )
   }

   cloneItems = children => {
      const firstChild = children.slice(0, 1)
      const lastChild = children.slice(children.length - 1)

      return [...lastChild, ...children, ...firstChild]
   }

   setupCarouselItems() {
      const items = this.props.children
      this.setState({
         lastPosition: items.length,
         carouselItems: items,
         fromChildren: true,
      })
   }

   setupAutoPlay() {
      this.autoPlay()
      const carouselWrapper = this.carouselWrapper

      if (this.props.stopOnHover && carouselWrapper) {
         // Stop mobile propagation
         // Required so touch/tap events don't cause mouseEnter/mouseLeave to fire
         const mobileTouch = (function isTouch() {
            try {
               document.createEvent('TouchEvent')
               return true
            } catch (e) {
               return false
            }
         })()

         if (!mobileTouch) {
            carouselWrapper.addEventListener(
               'mouseenter',
               ev => {
                  this.stopOnHover()
               },
               false
            )

            carouselWrapper.addEventListener('mouseleave', ev => {
               this.startOnHoverLeave()
            })
         }
      }
   }

   autoPlay() {
      this.timer = setTimeout(() => {
         this.increment()
      }, this.props.intervalDuration)
   }

   clearAutoPlay() {
      clearTimeout(this.timer)
   }

   resetAutoPlay() {
      this.clearAutoPlay()
      this.autoPlay()
   }

   stopOnHover() {
      this.setState({ isMouseEntered: true })
      this.props.onCarouselMouseEnter(
         Date.now(),
         this.state.carouselItems[this.state.currentPosition].itemId
      )
      this.clearAutoPlay()
   }

   startOnHoverLeave() {
      this.setState({ isMouseEntered: false })
      this.props.onCarouselMouseLeave(
         Date.now(),
         this.state.carouselItems[this.state.currentPosition].itemId
      )
      this.autoPlay()
   }

   decrement = () => {
      this.moveTo(this.state.currentPosition - 1)
   }

   increment = () => {
      this.moveTo(this.state.currentPosition + 1)
   }

   moveTo = index => {
      const { itemWidth } = this.state

      const translate = (index + 1) * itemWidth

      this.setState(
         {
            currentPosition: index,
            translate3d: -translate,
            cssAnimation: {
               transition: `transform ${this.props.transitionDuration}ms ${this
                  .props.cssEase}`,
            },
         },
         this.recalculateChecker
      )
   }

   recalculateChecker = () => {
      const { currentPosition, carouselItems } = this.state
      const recalc =
         currentPosition < 0 || currentPosition >= carouselItems.length

      this.calcCheckTimer = setTimeout(() => {
         recalc ? this.calculateSliderPos() : this.onSlideChange()
      }, this.props.transitionDuration)
   }

   calculateSliderPos() {
      const { currentPosition, carouselItems, itemWidth } = this.state

      let newPos = currentPosition < 0 ? carouselItems.length - 1 : 0

      this.setState(
         {
            currentPosition: newPos,
            translate3d: -itemWidth * (newPos === 0 ? 1 : carouselItems.length),
            cssAnimation: {
               transition: 'transform 0ms ease-out',
            },
         },
         this.onSlideChange
      )
   }

   onSlideChange = () => {
      console.log('currentPosition:: ', this.state.currentPosition)
   }

   _moveTo(position) {
      if (position < 0) {
         position = this.props.infiniteLoop ? this.state.lastPosition : 1
      }

      if (position > this.state.lastPosition) {
         position = this.props.infiniteLoop ? 1 : this.state.lastPosition
      }

      console.log('moveTo pos::', position)
      this.setState({
         // if it's not a slider, we don't need to set position here
         currentPosition: position,
      })

      this.setSliderStyles()

      // don't reset auto play when stop on hover is enabled, doing so will trigger a call to auto play more than once
      // and will result in the interval function not being cleared correctly.
      if (this.props.autoPlay && this.state.isMouseEntered === false) {
         this.resetAutoPlay()
      }
   }

   setSliderStyles() {
      const currentPosition = `${-this.state.currentPosition * 100}%`
      let animationObject = {}

      if (this.props.animationType === 'slide') {
         animationObject = {
            transform: `translate3d(${currentPosition}, 0, 0)`,
            transition: `${this.props.transitionDuration}ms ${this.props
               .cssEase}`,
         }

         this.setState(
            {
               cssAnimation: animationObject,
            },
            () => this.props.onCarouselChange(this.state.currentPosition)
         )

         if (this.state.currentPosition === this.state.lastPosition) {
            // Reset the current slide position back to 0% with no transition
            clearTimeout(this.endTimer)
            this.endTimer = setTimeout(() => {
               this.setState({
                  cssAnimation: {
                     transform: 'translate3d(0px, 0, 0)',
                     transition: 'none',
                  },
               })
            }, this.props.transitionDuration)
         }
      } else if (this.props.animationType === 'fade') {
         this.changeTimer = setTimeout(() => {
            this.props.onCarouselChange(this.state.currentPosition)
         }, this.props.transitionDuration)
      } else {
         console.error(
            `You used the animation value ${this.props
               .animationType} which is not currently supported by the carousel. Please use one of 'slide' or 'fade'.`
         )
      }
   }

   itemStyles(index) {
      const { itemWidth, currentPosition } = this.state
      let style = { width: `${itemWidth}px` }

      if (this.props.animationType === 'fade') {
         style = {
            left: `${-index * itemWidth}px`,
            opacity: 0,
            zIndex: -1,
            transition: `opacity ${this.props.transitionDuration}ms ${this.props
               .cssEase}`,
         }

         if (currentPosition === newIndex) {
            style = Object.assign({}, style, {
               opacity: 1,
               zIndex: 1,
            })
         }
      }

      return style
   }

   changeItem = e => {
      const { value } = e.target

      this.moveTo(value)
   }

   renderChildren() {
      const { carouselItems } = this.state
      return carouselItems.map((item, index) => {
         return (
            <li
               key={`item-${index}`}
               className={styles['carousel-item']}
               id={`item-${index}`}
               ref={el => (this[`item${index}`] = el)}
               style={this.itemStyles(index)}
               onClick={() => this.props.onCarouselItemClick(index)}
               onKeyPress={e => {
                  console.log(e)
               }}
            >
               {item}
            </li>
         )
      })
   }

   renderCarouselItems = (item, index) => {
      const { carouselItems } = this.state

      const cloned = index < 1 || index > carouselItems.length + 1 - 1

      const className = [
         styles['carousel-item'],
         cloned && this.props.infinite === false
            ? styles['carousel-item--cloned']
            : '',
      ].join(' ')

      return (
         <li
            key={`item-${index}`}
            className={className}
            id={`item-${index}`}
            ref={el => (this[`item${index}`] = el)}
            style={this.itemStyles(index)}
            onClick={() => this.props.onCarouselItemClick(index)}
            onKeyPress={e => {
               console.log(e)
            }}
         >
            {item}
         </li>
      )
   }

   getActiveDotIndex() {
      const { carouselItems, currentPosition } = this.state

      const currentIndex = currentPosition + 1
      const itemLength = carouselItems.length

      if (currentIndex < 1) {
         return itemLength - 1
      } else if (currentIndex > itemLength) {
         return 0
      } else {
         return currentIndex - 1
      }
   }

   renderDots() {
      const { carouselItems } = this.state

      if (!this.props.showIndicators) {
         return null
      }

      return (
         <ul className={styles['control-dots']}>
            {carouselItems.map((item, index) => {
               const liClassName =
                  this.getActiveDotIndex() !== index
                     ? styles.dot
                     : [styles.dot, styles['dot-selected']].join(' ')

               return (
                  <li
                     className={liClassName}
                     onClick={this.changeItem}
                     value={index}
                     key={index}
                  />
               )
            })}
         </ul>
      )
   }

   renderArrows = action => {
      return (
         <div
            className={[
               styles['arrow-wrapper'],
               styles[`arrow-wrapper--${action}`],
            ].join(' ')}
         >
            <button
               type="button"
               className={[styles['arrow'], styles[`arrow--${action}`]].join(
                  ' '
               )}
               onClick={action === 'previous' ? this.decrement : this.increment}
            >
               <img
                  height={'44px'}
                  width={'44px'}
                  src={action === 'previous' ? leftChevron : rightChevron}
                  alt={`${action} arrow`}
               />
            </button>
         </div>
      )
   }

   render() {
      const { showArrows } = this.props
      const { carouselItems, cssAnimation, clones, translate3d } = this.state

      const items = clones || carouselItems

      const height = `${this.props.height}px`

      let sliderStyle
      if (this.props.animationType === 'fade') {
         sliderStyle = {
            transform: 'translate3d(0px, 0, 0)',
         }
      } else {
         sliderStyle = {
            ...cssAnimation,
            transform: `translate3d(${translate3d}px, 0, 0)`,
         }
      }

      return (
         <div
            className={styles['glomo-carousel']}
            ref={el => (this.carouselWrapper = el)}
         >
            <div className={styles['carousel-wrapper']} style={{ height }}>
               <div className={styles['slider-wrapper']}>
                  <ul
                     className={styles.slider}
                     style={{ ...sliderStyle, height: '100%' }}
                     ref={node => (this.sliderNode = node)}
                  >
                     {/* Render Carousel Items */}
                     {items.map(this.renderCarouselItems)}
                  </ul>
               </div>
            </div>

            {showArrows && this.renderArrows('previous')}
            {showArrows && this.renderArrows('next')}

            {this.renderDots()}
         </div>
      )
   }
}
