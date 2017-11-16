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
         0: {
            top: `${containerHeight - elemHeight}px`,
            left: `${containerWidth - elemWidth}px`,
            transform: `translate(-${elemWidth / 1.5}px, -${elemHeight / 2}px)`,
         },
         1: {
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

   render() {
      const { reelItems, isDesktop } = this.state
      if (reelItems == null) return null

      let iterableItems = reelItems
      let width = 275
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
                  let iterStyles = null

                  if (isDesktop) {
                     iterStyles = this.computeHexPos()
                  }

                  return (
                     <div
                        key={`showcase-reel-item-${index}`}
                        className={styles['showcase-reel-inner']}
                        ref={node => (this.eyeshot = node)}
                        style={
                           iterStyles != null
                              ? { ...compStyles.item, ...iterStyles[index] }
                              : { ...compStyles.item }
                        }
                     >
                        <ShowcaseReelItem
                           width={width}
                           {...item}
                           showInnerContent={isDesktop ? true : false}
                           innerContentPositionX={
                              isDesktop && index === 0 ? 'LEFT' : 'RIGHT'
                           }
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
