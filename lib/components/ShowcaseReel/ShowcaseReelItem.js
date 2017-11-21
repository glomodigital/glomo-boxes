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
      isHovered: false,
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
      let transformCalc = innerWidth / 8

      if (windowWidth > 1000) {
         transformCalc = innerWidth / 3
      } else if (windowWidth > 1200) {
         transformCalc = innerWidth / 2.5
      }

      return {
         transform: isLeft
            ? `translateX(-${transformCalc}px)`
            : `translateX(${transformCalc}px)`,
      }
   }

   renderInnerContent() {
      const { excerpt, title, innerContentPositionX, isHovered } = this.props

      const isLeft = innerContentPositionX === 'LEFT'

      let innerClassName = [
         styles['item-inner'],
         isLeft ? styles['item-inner--left'] : styles['item-inner--right'],
      ].join(' ')

      let dividerStyle = {
         opacity: 0,
         transition: 'all 0.2s ease-in',
         transform: 'translateY(15px)',
      }

      return (
         <div
            className={innerClassName}
            style={this.innerContentStyle != null ? this.innerContentStyle : {}}
            ref={node => (this.showcaseInnerContent = node)}
         >
            {this.renderUnderlay(isLeft)}
            <span className={styles.title}>{title}</span>

            <div>
               {!isHovered ? (
                  <Divider background="#000" style={dividerStyle} />
               ) : (
                  <Divider
                     background="#000"
                     style={{
                        ...dividerStyle,
                        ...{ transform: 'translateY(0px)', opacity: 1 },
                     }}
                  />
               )}
               <span
                  className={
                     !isHovered
                        ? styles.excerpt
                        : [styles.excerpt, styles['excerpt--active']].join(' ')
                  }
               >
                  {excerpt}
               </span>
            </div>
         </div>
      )
   }

   renderUnderlay(isLeft) {
      const { isHovered } = this.props
      const style = {
         width: '125%',
         position: 'absolute',
         top: '-10%',
         bottom: '-10%',
         [isLeft ? 'left' : 'right']: 0,
         opacity: !isHovered ? 0 : 1,
         zIndex: -2,
         transition: 'opacity .15s ease-in-out',
         background: isLeft
            ? 'linear-gradient(-90deg, transparent, #fff 75%)'
            : 'linear-gradient(90deg, transparent, #fff 75%)',
      }

      return !isHovered ? (
         <div style={style} className={styles['showcase-reel-underlay']} />
      ) : (
         <div
            style={style}
            className={styles['showcase-reel-underlay--active']}
         />
      )
   }

   render() {
      const { imagePath, backgroundColor, width, showInnerContent } = this.props

      let hexProps = {
         backgroundColor,
      }

      if (imagePath != null) {
         hexProps['backgroundImage'] = imagePath
      }

      return (
         <div
            className={styles['showcase-reel-item']}
            ref={node => (this.showcaseWrapper = node)}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
         >
            {showInnerContent && this.renderInnerContent()}
            <div style={{ width: width }}>
               <Hexagon shadow={this.props.shadow} {...hexProps} />
            </div>
         </div>
      )
   }
}
