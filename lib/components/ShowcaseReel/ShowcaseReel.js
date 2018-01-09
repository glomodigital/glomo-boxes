import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropType from 'prop-types'
import styles from './ShowcaseReel.css'

import ShowcaseReelItem from './ShowcaseReelItem'

import { resize } from '../../utils/helpers'

export default class ShowcaseReel extends Component {
   static propTypes = {
      reelItems: PropType.arrayOf(PropType.shape(ShowcaseReelItem.propTypes))
         .isRequired,
      selected: PropType.number,
   }

   static defaultProps = {
      selected: 0,
   }

   constructor(props) {
      super(props)

      this.itemWidths = []
      this.loopTimer = null
      this.breakpoint = 900
      this.state = {
         isDesktop: window.innerWidth < this.breakpoint ? false : true,
         windowWidth: window.innerWidth,
         reelItems: props.reelItems,
         inViewItems: [0, 1],
         xPos: null,
         selectedShowcase: null,
         hovering: false,
         doUnmount: false,
      }
   }

   componentDidMount() {
      resize.add(this.resize) // what does this do?
      const node = findDOMNode(this.eyeshot)

      if (this.scrollContainer != null) {
         this.scrollContainer.addEventListener('scroll', this.onScroll)
      }

      this.setState({
         xPos: findDOMNode(this.eyeshot).offsetWidth,
      })

      this.startLoop()
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.reelItems !== nextProps.reelItems) {
         this.setState({ reelItems: nextProps.reelItems })
      }
   }

   componentWillUnmount() {
      this.clearLoop()
   }

   handleMouseEnter = index => {
      this.clearLoop()
      this.setState({
         selectedShowcase: index,
         hovering: true,
      })
   }

   handleMouseLeave = () => {
      this.resetLoop()
      this.setState({
         selectedShowcase: null,
         hovering: false,
      })
   }

   resize = () => {
      if (window.innerWidth >= this.breakpoint) {
         this.setState({ isDesktop: true, windowWidth: window.innerWidth })
         this.resetLoop()
      } else if (window.innerWidth < this.breakpoint) {
         this.setState({ isDesktop: false, windowWidth: window.innerWidth })
         this.clearLoop()
      }
   }

   computeItemsWidth(start, end = start) {
      const items = this.itemWidths
         .slice(start, end + 1)
         .reduce((sum, itemWidth) => sum + (itemWidth ? itemWidth : 0), 0)

      return items
   }

   computeHexPos() {
      if (!this.scrollContainer && !this.eyeshot) {
         return null
      }

      const containerWidth = this.scrollContainer.clientWidth / 2
      const containerHeight = this.scrollContainer.clientHeight / 2

      const elemWidth = this.eyeshot.clientWidth / 2
      const elemHeight = this.eyeshot.clientHeight / 2

      return {
         even: {
            top: `${containerHeight - elemHeight}px`,
            left: `${containerWidth - elemWidth}px`,
            transform: `translate(-${elemWidth / 1.5}px, -${elemHeight / 2}px)`,
         },
         odd: {
            top: `${containerHeight - elemHeight}px`,
            left: `${containerWidth - elemWidth}px`,
            transform: `translate(${elemWidth / 1.5}px, ${elemHeight / 2}px)`,
         },
      }
   }

   get showRightOverlay() {
      return this.currentScrollLeft < this.maxScrollLeft
   }

   get showLeftOverlay() {
      return this.currentScrollLeft > 0
   }

   get eyeshotWidth() {
      return this.eyeshot ? this.eyeshot.offsetWidth : null
   }

   get currentScrollLeft() {
      return this.eyeshot ? this.eyeshot.scrollLeft : 0
   }

   get maxScrollLeft() {
      if (!this.eyeshotWidth) {
         return null
      }

      return (
         this.computeItemsWidth(0, this.state.reelItems.length - 1) -
         this.eyeshotWidth
      )
   }

   isEven = n => {
      return n % 2 == 0
   }

   startLoop() {
      this.loopTimer = setTimeout(() => {
         this.loopReelItems()
      }, 5000)
   }

   resetLoop() {
      this.clearLoop()
      this.startLoop()
   }

   clearLoop() {
      clearTimeout(this.loopTimer)
   }

   loopReelItems = () => {
      const { isDesktop, reelItems, inViewItems, hovering } = this.state
      if (isDesktop) {
         this.setState()

         const nextFirstInView =
            inViewItems[0] + 2 < reelItems.length
               ? inViewItems[0] + 2
               : (inViewItems[0] + 2) % reelItems.length
         const nextSecondInView =
            inViewItems[1] + 2 <= reelItems.length
               ? inViewItems[1] + 2
               : (inViewItems[1] + 2) % reelItems.length
         this.setState({
            inViewItems: [nextFirstInView, nextSecondInView],
         })

         if (!hovering) {
            this.resetLoop()
         }
         return
      }

      this.clearLoop()
   }

   render() {
      const { reelItems, isDesktop, hovering, inViewItems } = this.state
      if (reelItems == null) return null

      // ShowcaseReelItem dimensions
      let iterableItems = reelItems
      let width = 275
      let height = 240

      if (isDesktop) {
         iterableItems = [reelItems[inViewItems[0]], reelItems[inViewItems[1]]]
         width = 450
         height = 420
      }

      return (
         <div className={styles.wrapper}>
            {/* {this.showLeftOverlay ? (
               <div
                  className={[
                     styles['mobile-overlay'],
                     styles['mobile-overlay--left'],
                  ].join(' ')}
               />
            ) : null} */}
            <div
               className={styles['showcase-reel']}
               ref={node => (this.scrollContainer = node)}
            >
               {iterableItems.map((item, index) => {
                  const isHovered = this.state.selectedShowcase === index
                  const itemParity = this.isEven(index) ? 'even' : 'odd'

                  // Parity Styles
                  let itemParityStyle = {}
                  if (isDesktop) {
                     const parityStyles = this.computeHexPos()
                     if (parityStyles != null) {
                        itemParityStyle = parityStyles[itemParity]
                     }
                  }

                  // ShowcaseReelItem props
                  const dropShadow = isHovered
                     ? 'drop-shadow(0 0 20px rgb(0, 0, 0))'
                     : 'drop-shadow(0 0 10px rgb(0, 0, 0))'

                  // import CSS by tags
                  const reelInnerClass = [
                     styles['showcase-reel-inner'],
                     isHovered
                        ? styles['showcase-reel-inner--active']
                        : styles['showcase-reel-inner'],
                  ].join(' ')

                  return (
                     <div
                        key={`showcase-reel-item-${item.title}`}
                        className={reelInnerClass}
                        ref={node => (this.eyeshot = node)}
                        style={itemParityStyle}
                     >
                        <ShowcaseReelItem
                           width={width}
                           height={height}
                           {...item}
                           shadow={dropShadow}
                           showInnerContent={isDesktop ? true : false}
                           innerContentPositionX={
                              isDesktop && index === 0 ? 'LEFT' : 'RIGHT'
                           }
                           gradientAngle={this.isEven(index) ? 45 : -45}
                           isHovered={isHovered}
                           onMouseEnter={() => this.handleMouseEnter(index)}
                           onMouseLeave={this.handleMouseLeave}
                        />
                     </div>
                  )
               })}
            </div>
            {/* {this.showRightOverlay ? (
               <div
                  className={[
                     styles['mobile-overlay'],
                     styles['mobile-overlay--right'],
                  ].join(' ')}
               />
            ) : null} */}
         </div>
      )
   }
}
