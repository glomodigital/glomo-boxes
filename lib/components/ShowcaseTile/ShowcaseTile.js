import React, { Component, cloneElement } from 'react'
import PropType from 'prop-types'
import Tappable from 'react-tappable/lib/Tappable'

import styles from './ShowcaseTile.css'
import Divider from '../Divider'

import { resize } from '../../utils/helpers'

export default class ShowcaseTile extends Component {
   static propTypes = {
      subTitle: PropType.oneOfType([PropType.string, PropType.number]),
      title: PropType.node,
      excerpt: PropType.string,
      tileColor: PropType.string,
      contentColor: PropType.string,
      image: PropType.oneOfType([PropType.string, PropType.node]),
   }

   componentDidMount() {
      resize.add(() => this.forceUpdate())
   }

   tileBackground() {
      if (this.showcaseTile == null) return null

      const { image } = this.props

      const { width, height } = this.showcaseTile.getBoundingClientRect()

      let props
      if (width > height) {
         props = {
            width: '100%',
            height: 'auto',
         }
      } else if (width < height) {
         props = {
            width: 'auto',
            height: '100%',
         }
      }

      let imageComponent = <img src={image} {...props} alt="showcase tile" />

      if (image.target === 'img') {
         imageComponent = cloneElement(image, { ...props })
      }

      return (
         <div className={styles['showcase-tile-image']}>{imageComponent}</div>
      )
   }

   render() {
      const {
         subTitle,
         title,
         excerpt,
         contentColor,
         image,
         style,
         className,
         delay,
         active,
         onTap,
      } = this.props

      let TitleProp = title
      if (typeof TitleProp === 'string') {
         TitleProp = <span className={styles.title}>{title}</span>
      } else {
         TitleProp = <TitleProp />
      }

      const compStyle = {
         color: contentColor,
      }

      return (
         <Tappable onTap={onTap}>
            <div
               className={[
                  'showcase-tile-wrapper',
                  styles['tile-wrapper'],
                  active != null && !active
                     ? styles['tile-wrapper--inactive']
                     : '',
               ].join(' ')}
               ref={node => (this.showcaseTile = node)}
               onMouseEnter={this.props.handleMouseEnter}
               onMouseLeave={this.props.handleMouseLeave}
            >
               <div className={className} style={{ transitionDelay: delay }}>
                  <div
                     style={{ ...compStyle, ...style }}
                     className={styles['showcase-tile']}
                  >
                     <span className={styles.subtitle}>{subTitle}</span>
                     {TitleProp}
                     <div
                        className={[
                           styles['inner-content'],
                           active && styles['inner-content--active'],
                           active && 'tile-activated',
                        ].join(' ')}
                     >
                        <Divider />
                        <span className={styles['showcase-excerpt']}>
                           {excerpt}
                        </span>
                     </div>
                  </div>
                  {image != null && this.tileBackground()}
               </div>
            </div>
         </Tappable>
      )
   }
}
