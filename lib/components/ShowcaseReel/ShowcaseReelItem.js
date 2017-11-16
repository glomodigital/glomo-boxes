import React, { Component } from 'react'
import PropType from 'prop-types'

import styles from './ShowcaseReelItem.css'
import Hexagon from '../Hexagon'
import Divider from '../Divider'

export default class ShowcaseReelItem extends Component {
   static propTypes = {
      imagePath: PropType.string,
      backgroundColor: PropType.string,
      title: PropType.string,
      excerpt: PropType.string,
      underlayColor: PropType.string,
      width: PropType.number,
      height: PropType.number,
      showInnerContent: PropType.bool,
      innerContentPositionX: PropType.oneOf(['LEFT', 'RIGHT']),
   }

   static defaultProps = {
      imagePath: null,
      underlayColor: '#fff',
   }

   constructor() {
      super()

      this.state = {
         innerWidth: null,
      }
   }

   componentDidMount() {
      if (!this.showcaseInnerContent || !this.props.showInnerContent) {
         return null
      }

      this.setState({
         innerWidth: this.showcaseInnerContent.getBoundingClientRect().width,
      })
   }

   get innerContentStyle() {
      if (!this.showcaseInnerContent || !this.props.showInnerContent) {
         return null
      }

      const isLeft = this.props.innerContentPositionX === 'LEFT'
      const innerWidth = this.showcaseInnerContent.getBoundingClientRect().width
      const windowWidth = window.innerWidth
      const transformCalc = windowWidth > 1000 ? innerWidth / 3 : innerWidth / 8

      return {
         transform: isLeft
            ? `translateX(-${transformCalc}px)`
            : `translateX(${transformCalc}px)`,
      }
   }

   render() {
      const {
         imagePath,
         backgroundColor,
         width,
         height,
         title,
         excerpt,
         showInnerContent,
         innerContentPositionX,
      } = this.props

      let hexProps = {
         backgroundColor,
         width,
         height,
      }

      if (imagePath != null) {
         hexProps['backgroundImage'] = imagePath
      }

      const isLeft = innerContentPositionX === 'LEFT'

      let innerClassName = [
         styles['item-inner'],
         isLeft ? styles['item-inner--left'] : styles['item-inner--right'],
         !showInnerContent ? styles['item-inner--hidden'] : '',
      ].join(' ')

      return (
         <div
            className={styles['showcase-reel-item']}
            ref={node => (this.showcaseWrapper = node)}
         >
            <div
               className={innerClassName}
               style={
                  this.innerContentStyle != null ? this.innerContentStyle : {}
               }
               ref={node => (this.showcaseInnerContent = node)}
            >
               <span className={styles.title}>{title}</span>
               <Divider background={'#000'} />
               <span className={styles.excerpt}>{excerpt}</span>
            </div>
            <Hexagon {...hexProps} />
         </div>
      )
   }
}
