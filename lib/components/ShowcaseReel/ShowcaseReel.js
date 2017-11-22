import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import throttle from 'lodash/throttle'
import PropType from 'prop-types'
import styles from './ShowcaseReel.css'

import ShowcaseReelItem from './ShowcaseReelItem'

import { resize } from '../../utils/helpers'

const BREAKPOINT = 900

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

      this.state = {
         isDesktop: window.innerWidth < BREAKPOINT ? false : true,
         windowWidth: window.innerWidth,
         reelItems: props.reelItems,
         selectedItem: props.selected,
         xPos: null,
         selectedShowcase: null,
         hovering: false,
      }
   }

   componentDidMount() {
      resize.add(this.resize)
      const node = findDOMNode(this.eyeshot)

      if (this.scrollContainer != null) {
         this.scrollContainer.addEventListener('scroll', this.onScroll)
      }

      this.setState({ xPos: findDOMNode(this.eyeshot).offsetWidth })
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.reelItems !== nextProps.reelItems) {
         this.setState({ reelItems: nextProps.reelItems })
      }
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true, windowWidth: window.innerWidth })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false, windowWidth: window.innerWidth })
      }
   }

   onScroll = throttle(e => {
      console.log(e.srcElement.scrollLeft)
   }, 150)

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

   render() {
      const { reelItems, isDesktop, hovering } = this.state
      if (reelItems == null) return null

      let iterableItems = reelItems
      let width = 275
      let height = 240
      let compStyles = {
         container: {
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'hidden',
            alignItems: 'center',

            // Testing
            height: '325px',
         },
         item: {
            flex: '0 0 auto',
            marginRight: '3px',
            WebkitOverflowScrolling: 'touch',
         },
      }

      if (isDesktop) {
         iterableItems = reelItems.slice(0, 2)
         width = 450
         height = 420
         compStyles = {
            container: {
               display: 'block',
               // Testing
               height: '740px',
            },
            item: {
               position: 'absolute',
            },
         }
      }

      const posX = this.eyeshotWidth

      return (
         <div className={styles.wrapper}>
            {this.showLeftOverlay ? (
               <div
                  className={[
                     styles['mobile-overlay'],
                     styles['mobile-overlay--left'],
                  ].join(' ')}
               />
            ) : null}
            <div
               className={styles['showcase-reel']}
               style={compStyles.container}
               ref={node => (this.scrollContainer = node)}
            >
               {iterableItems.map((item, index) => {
                  const isHovered = this.state.selectedShowcase === index
                  const isEven = this.isEven(index) ? 'even' : 'odd'

                  let iterStyles = null

                  if (isDesktop) {
                     iterStyles = this.computeHexPos()
                  }

                  const hoverStyles = {
                     zIndex: isHovered ? 20 : 10,
                     opacity: hovering ? (isHovered ? 1 : 0.9) : 1,
                  }

                  const styleObject =
                     iterStyles != null
                        ? {
                             ...compStyles.item,
                             ...iterStyles[isEven],
                          }
                        : { ...compStyles.item }

                  const dropShadow = isHovered
                     ? 'drop-shadow(0 0 20px rgb(0, 0, 0))'
                     : 'drop-shadow(0 0 10px rgb(0, 0, 0))'

                  const underlayStyle = {
                     width: '400px',
                     position: 'absolute',
                     top: '-20%',
                     bottom: '-20%',
                     pointerEvents: 'none',
                     [this.isEven(index) ? 'left' : 'right']: '-15%',
                     opacity: !isHovered ? 0 : 0.75,
                     zIndex: 4,
                     transition: 'opacity .15s ease-in-out',
                     background: this.isEven(index)
                        ? 'linear-gradient(-90deg, transparent, #fff 75%)'
                        : 'linear-gradient(90deg, transparent, #fff 75%)',
                  }

                  return (
                     <div
                        key={`showcase-reel-item-${index}`}
                        className={styles['showcase-reel-inner']}
                        ref={node => (this.eyeshot = node)}
                        style={{ ...hoverStyles, ...styleObject }}
                     >
                        <div style={underlayStyle} />
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
                           onMouseEnter={() => {
                              this.setState({
                                 selectedShowcase: index,
                                 hovering: true,
                              })
                           }}
                           onMouseLeave={() => {
                              this.setState({
                                 selectedShowcase: null,
                                 hovering: false,
                              })
                           }}
                        />
                     </div>
                  )
               })}
            </div>
            {this.showRightOverlay ? (
               <div
                  className={[
                     styles['mobile-overlay'],
                     styles['mobile-overlay--right'],
                  ].join(' ')}
               />
            ) : null}
         </div>
      )
   }
}
