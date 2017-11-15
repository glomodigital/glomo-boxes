import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Hexagon.css'

class Hexagon extends Component {
   static propTypes = {
      width: PropTypes.number,
      height: PropTypes.number,
      backgroundColor: PropTypes.string,
      backgroundImage: PropTypes.string,
      icon: PropTypes.string,
   }
   render() {
      const {
         width,
         height,
         backgroundColor,
         backgroundImage,
         icon,
      } = this.props

      const hexStyle = {
         width: width,
         height: width * 0.85, // What is this calculation??
      }
      const contentStyle = {
         background: backgroundColor,
      }
      const backgroundImageStyle = {
         backgroundImage: `url(${backgroundImage})`,
      }
      return (
         <div className={styles.hex} style={hexStyle}>
            <div className={styles['hex-l']}>
               <div className={styles['hex-r']}>
                  <div className={styles['hex-content']} style={contentStyle}>
                     {backgroundImage && (
                        <div
                           className={styles['hex-image']}
                           style={backgroundImageStyle}
                        />
                     )}
                     {icon && <img className={styles['hex-icon']} src={icon} />}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default Hexagon
