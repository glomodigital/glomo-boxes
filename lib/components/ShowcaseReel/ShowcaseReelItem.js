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

   constructor(props) {
      super(props)
      this.state = {
         innerWidth: null,
         dimensionStyle: 'unmounted',
      }
      this.isLeft = props.innerContentPositionX.toLowerCase() === 'left'
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

      const innerWidth = this.showcaseInnerContent.getBoundingClientRect().width
      const windowWidth = window.innerWidth
      let transformCalc = innerWidth / 8

      if (windowWidth > 1000) {
         transformCalc = innerWidth / 3
      } else if (windowWidth > 1200) {
         transformCalc = innerWidth / 2.5
      }

      return {
         transform: this.isLeft
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
      const { excerpt, title, isHovered } = this.props

      // import css by tags
      let innerClassName = [
         styles['item-inner'],
         this.isLeft ? styles['item-inner--left'] : styles['item-inner--right'],
      ].join(' ')

      let dividerClassName = [
         styles['divider'],
         isHovered ? styles['divider--active'] : styles[''],
      ].join(' ')

      let excerptClassName = [
         styles['excerpt'],
         isHovered ? styles['excerpt--active'] : styles[''],
      ].join(' ')

      return (
         <div
            className={innerClassName}
            style={this.innerContentStyle != null ? this.innerContentStyle : {}}
            ref={node => (this.showcaseInnerContent = node)}
         >
            {this.renderUnderlay()}
            <span className={styles.title}>{title}</span>

            <div>
               <Divider className={dividerClassName} background="#000" />
               <span className={excerptClassName}>{excerpt}</span>
            </div>
         </div>
      )
   }

   renderUnderlay() {
      const { isHovered, showInnerContent } = this.props

      const style = {
         [this.isLeft ? 'left' : 'right']: showInnerContent ? 0 : '-2em',
      }

      // import css by tag
      let underlayClassName = [
         styles['showcase-reel-underlay'],
         isHovered ? styles['showcase-reel-underlay--active'] : styles[''],
         this.isLeft
            ? styles['showcase-reel-underlay--left']
            : styles['showcase-reel-underlay--right'],
      ].join(' ')

      return <div style={style} className={underlayClassName} />
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
