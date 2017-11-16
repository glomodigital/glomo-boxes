import React, { Component } from 'react'
import PropType from 'prop-types'
import styles from './Hexagon.css'

class Hexagon extends Component {
   static propTypes = {
      width: PropType.string,
      height: PropType.string,
      backgroundColor: PropType.string,
      backgroundImage: PropType.string,
      icon: PropType.string,
      shadow: PropType.bool,
      innerStyle: PropType.shape({}),
   }
   render() {
      const {
         width,
         height,
         backgroundColor,
         backgroundImage,
         icon,
         shadow,
         innerStyle,
      } = this.props

      const hexStyle = {
         width: width,
         height: height,
         background: backgroundImage
            ? `url(${backgroundImage}) center / cover no-repeat`
            : backgroundColor,
      }
      return (
         <div
            className={[styles.hex, shadow && styles.shadow].join(' ')}
            style={hexStyle}
         >
            <div className={styles['hex-inner']} style={innerStyle}>
               {this.props.children}
               {icon && <img className={styles.icon} src={icon} />}
            </div>
            <svg width="0" height="0">
               <defs>
                  <clipPath id="myClip" clipPathUnits="objectBoundingBox">
                     <polygon
                        fill="none"
                        points="0.25 0, 0.75 0, 1 0.5, 0.75 1, 0.25 1, 0 0.5"
                     />
                  </clipPath>
               </defs>
            </svg>
         </div>
      )
   }
}
export default Hexagon
