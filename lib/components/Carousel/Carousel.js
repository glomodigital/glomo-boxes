import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Carousel.css'
import { clearTimeout } from 'timers'

console.log(styles['carousel-wrapper'])

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
      items: PropTypes.arrayOf(
         PropTypes.shape({
            imagePath: PropTypes.string,
            imagePositionX: PropTypes.oneOf(['left', 'right', 'center']),
            imagePositionY: PropTypes.oneOf(['top', 'bottom', 'center']),
            backgroundSize: PropTypes.oneOf(['contain', 'cover']),
            legend: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            button: PropTypes.string,
            redirectUrl: PropTypes.string,
            itemId: PropTypes.number,
         })
      ),
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
      infiniteLoop: true,
      legendClassName: null,
      wrapperClassName: null,
      cssEase: 'ease',
      animationType: 'slide',
      selectedItem: 0,
      height: 0,
      autoPlay: true,
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
         carouselItems: null,
         cssAnimation: {},
         initialized: false,
         fromChildren: false,
      }
   }

   componentDidMount() {
      if (
         (this.props.items == null || this.props.items.length < 1) &&
         (this.props.children == null || this.props.children.length === 0)
      ) {
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
      this.setupCarouselItems()

      if (this.props.autoPlay) {
         this.setupAutoPlay()
      }

      this.setState(
         {
            initialized: true,
         },
         () => this.props.initializedCarousel(true)
      )
   }

   setupCarouselItems() {
      if (this.props.children == null) {
         const itemsArray = this.props.items

         if (itemsArray != null && Array.isArray(itemsArray)) {
            const items = [...itemsArray, itemsArray[0]]

            const images = itemsArray.map(item => item.imagePath)

            Promise.all(images.map(checkImage))
               .then(() => {
                  this.props.imagesLoaded()
                  this.setState({
                     carouselItems: items,
                     lastPosition: items.length - 1,
                  })
               })
               .catch(e => {
                  console.log(e)
               })
         }
      } else {
         const items = [...this.props.children, this.props.children[0]]
         this.setState({
            lastPosition: items.length - 1,
            carouselItems: items,
            fromChildren: true,
         })
      }
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

   decrement(positions) {
      this.moveTo(
         this.state.currentPosition -
            (typeof positions === 'Number' ? positions : 1)
      )
   }

   increment(positions) {
      this.moveTo(
         this.state.currentPosition +
            (typeof positions === 'Number' ? positions : 1)
      )
   }

   moveTo(position) {
      if (position < 0) {
         position = this.props.infiniteLoop ? this.state.lastPosition : 1
      }

      if (position > this.state.lastPosition) {
         position = this.props.infiniteLoop ? 1 : this.state.lastPosition
      }

      console.log(position)
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
                     transform: 'translate3d(0%, 0, 0)',
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

   renderImage(item, index) {
      if (item.hasOwnProperty('imagePath')) {
         const styleObject = {
            backgroundPosition: `${item.imagePositionX} ${item.imagePositionY}`,
            backgroundImage: `url(${item.imagePath})`,
            backgroundSize: item.backgroundSize,
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
         }

         return <div className="img" style={styleObject} />
      }
   }

   renderLegend(content) {
      const legend = content.hasOwnProperty('legend')
      const button = content.hasOwnProperty('button')

      if (
         (legend || button) &&
         (content.legend != null || content.button != null)
      ) {
         let legend = null

         if (content.legend != null) {
            if (React.isValidElement(content.legend)) {
               legend = content.legend
            } else if (typeof content.legend === 'string') {
               legend = (
                  <span className="carousel-legend">{content.legend}</span>
               )
            }
         }

         return (
            <div className="carousel-legend-wrapper">
               {legend != null && legend}
            </div>
         )
      } else {
         return null
      }
   }

   itemStyles(index) {
      let style = {}

      if (this.props.animationType === 'fade') {
         style = {
            left: `${-index * 100}%`,
            opacity: 0,
            zIndex: -1,
            transition: `opacity ${this.props.transitionDuration}ms ${this.props
               .cssEase}`,
         }

         if (this.state.currentPosition === index) {
            style = Object.assign({}, style, {
               opacity: 1,
               zIndex: 1,
            })
         }
      }

      return style
   }

   item = (id, index, content) => {
      return (
         <li
            key={`item-${index}`}
            className={
               this.state.currentPosition === index
                  ? 'carousel-item selected'
                  : 'carousel-item'
            }
            id={`item-${index}`}
            ref={el => (this[`item${index}`] = el)}
            style={this.itemStyles(index)}
            onClick={() => this.props.onCarouselItemClick(id)}
            onKeyPress={e => {
               console.log(e)
            }}
         >
            {content}
         </li>
      )
   }

   changeItem = e => {
      const { lastPosition, currentPosition } = this.state
      const { value } = e.target
      const newValue = value === 0 ? lastPosition : value

      if (newValue === currentPosition) {
         if (this.props.autoPlay) {
            this.resetAutoPlay()
         }
      }

      newValue > currentPosition ? this.increment() : this.decrement()
   }

   renderItems() {
      return this.state.carouselItems.map((item, index) => {
         const redirectMarkup =
            this.props.redirectCallback != null ? (
               <div
                  className="pseudo-anchor"
                  onClick={() => this.props.redirectCallback(item.redirectUrl)}
                  onKeyPress={e => {
                     console.log(e)
                  }}
                  role="button"
               >
                  {this.renderImage(item, index)}
                  {this.renderLegend(item)}
               </div>
            ) : (
               <a href={item.redirectUrl} target="_blank">
                  {this.renderImage(item, index)}
                  {this.renderLegend(item)}
               </a>
            )

         return this.item(item.itemId, index, redirectMarkup)
      })
   }

   renderChildren() {
      return this.state.carouselItems.map((item, index) => {
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

   renderControls() {
      if (!this.props.showIndicators) {
         return null
      }

      return (
         <ul className={styles['control-dots']}>
            {this.state.carouselItems.slice(0, -1).map((item, index) => {
               const activeDot = [styles.dot, styles['dot-selected']].join(' ')

               let liClassName =
                  this.state.currentPosition !== index ? styles.dot : activeDot

               if (this.state.currentPosition === this.state.lastPosition) {
                  liClassName = index !== 0 ? styles.dot : activeDot
               }

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

   checkItems() {
      if (this.state.fromChildren) {
         return this.renderChildren()
      } else if (this.state.carouselItems != null) {
         return this.renderItems()
      }
   }

   render() {
      if (this.state.carouselItems == null) {
         return null
      }

      const height = `${this.props.height}px`

      let sliderStyle
      if (this.props.animationType === 'fade') {
         sliderStyle = {
            transform: 'translate3d(0%, 0, 0)',
         }
      } else {
         sliderStyle = this.state.cssAnimation
      }

      return (
         <div
            className={this.props.wrapperClassName}
            ref={el => (this.carouselWrapper = el)}
         >
            <div className={styles['carousel-wrapper']} style={{ height }}>
               <div className={styles['slider-wrapper']}>
                  <ul
                     className={styles.slider}
                     style={{ ...sliderStyle, height: '100%' }}
                  >
                     {/* Render Carousel Items */}
                     {this.checkItems()}
                  </ul>
               </div>

               {this.renderControls()}
            </div>
         </div>
      )
   }
}
