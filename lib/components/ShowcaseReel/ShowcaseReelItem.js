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
         dimensionStyle: 'unmounted',
      }
   }

   componentDidMount() {
      if (!this.showcaseInnerContent || !this.props.showInnerContent) {
         setTimeout(this.mountStyle, 10)
         return null
      }
      this.setState({
         innerWidth: this.showcaseInnerContent.getBoundingClientRect().width,
      })
      setTimeout(this.mountStyle, 10)
   }

   componentWillUnmount() {
      clearTimeout(this.mountStyle)
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

   mountStyle = () => {
      this.setState({
         dimensionStyle: 'mounted',
      })
   }

   mouseEnterStyle = () => {
      this.setState({
         dimensionStyle: 'active',
      })
   }

   mouseLeaveStyle = () => {
      this.setState({
         dimensionStyle: '',
      })
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
                  className={[
                     styles['excerpt'],
                     isHovered ? styles['excerpt--active'] : styles[''],
                  ].join(' ')}
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
         width: !isHovered ? '300px' : '400px',
         // position: 'absolute',
         // top: '-20%',
         // bottom: '-20%',
         // pointerEvents: 'none',
         [isLeft ? 'left' : 'right']: 0,
         opacity: !isHovered ? 0.8 : 1,
         // zIndex: -2,
         // transition: 'opacity .15s ease-in-out',
         background: isLeft
            ? 'linear-gradient(-90deg, transparent, #fff 90%)'
            : 'linear-gradient(90deg, transparent, #fff 90%)',
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
      const {
         imagePath,
         width,
         showInnerContent,
         isHovered,
         gradientAngle,
      } = this.props

      let hexProps = {
         gradientColor1: '#fff',
         gradientColor2: '#fff',
      }
      if (showInnerContent) {
         hexProps = {
            gradientColor1: '#fff',
            stopOneOpacity: 0,
            stopTwoOpacity: 0.5,
            gradientColor2: '#fff',
            gradientAngle,
         }
      }

      if (imagePath != null) {
         hexProps['backgroundImage'] = imagePath
      }

      let style = {
         width: width,
      }

      let hexWrapClassName = [
         styles['hexagon-wrapper'],
         styles[`hexagon-wrapper--${this.state.dimensionStyle}`],
      ].join(' ')

      return (
         <div
            className={styles['showcase-reel-item']}
            ref={node => (this.showcaseWrapper = node)}
            onMouseEnter={() => {
               this.mouseEnterStyle()
               this.props.onMouseEnter()
            }}
            onMouseLeave={() => {
               this.mouseLeaveStyle()
               this.props.onMouseLeave()
            }}
         >
            <div className={hexWrapClassName} style={style}>
               <Hexagon shadow={this.props.shadow} {...hexProps} />
            </div>
            {this.renderInnerContent()}
         </div>
      )
   }
}
