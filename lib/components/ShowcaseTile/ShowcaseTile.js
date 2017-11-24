import React, { Component, cloneElement } from 'react'
import PropType from 'prop-types'

import styles from './ShowcaseTile.css'
import Divider from '../Divider'

export default class ShowcaseTile extends Component {
   static propTypes = {
      subTitle: PropType.oneOfType([PropType.string, PropType.number]),
      title: PropType.node,
      excerpt: PropType.string,
      tileColor: PropType.string,
      contentColor: PropType.string,
      image: PropType.oneOfType([PropType.string, PropType.node]),
   }

   tileBackground() {
      const { image, handleImageChange } = this.props

      const props = {
         width: 'auto',
         height: '100%',
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
         tileColor,
         contentColor,
         image,
         style,
      } = this.props

      let TitleProp = title
      if (typeof TitleProp === 'string') {
         TitleProp = <h3>{title}</h3>
      } else {
         TitleProp = <TitleProp />
      }

      const compStyle = {
         background: tileColor,
         color: contentColor,
      }

      return (
         <div className={styles['tile-wrapper']}>
            <div
               style={{ ...compStyle, ...style }}
               id="showcase-tile"
               className={styles['showcase-tile']}
            >
               <span>{subTitle}</span>
               {TitleProp}
               <div className={styles['inner-content']}>
                  <Divider />
                  <p className={styles['showcase-excerpt']}>{excerpt}</p>
               </div>
            </div>
            {image != null && this.tileBackground()}
         </div>
      )
   }
}
