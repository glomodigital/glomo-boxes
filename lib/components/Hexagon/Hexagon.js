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
   makeId = () => {
      var text = ''
      var possible =
         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (var i = 0; i < 5; i++)
         text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
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
      }
      polygonStyle = {
         background: backgroundImage
            ? `url(${backgroundImage}) center / cover no-repeat`
            : backgroundColor,
      }
      const id = this.makeId()
      return (
         <div className={styles.hex} style={hexStyle}>
            <svg className={styles.svg} viewBox="0 0 100 90">
               <defs>
                  <pattern
                     id={`pattern${id}`}
                     height="100%"
                     width="100%"
                     patternContentUnits="objectBoundingBox"
                  >
                     <image
                        height="1"
                        width="1"
                        preserveAspectRatio="none"
                        href={backgroundImage}
                     />
                  </pattern>
               </defs>
               <polygon
                  fill={`url(#pattern${id})`}
                  points="25 0, 75 0, 100 50, 75 90, 25 90, 0 50"
               />
            </svg>
         </div>
      )
   }
}
export default Hexagon

// <div className={styles.hex} style={hexStyle}>
//    <svg className={styles['image-svg']} viewBox="0 0 100 86" >
//      <image className={styles['img-1']} height="100%" width="100%" href={backgroundImage} />
//    </svg>
//    <svg id="svg-defs" viewBox="0 0 100 86" >
//       <defs>
//          <clipPath id="clip-triangle" clipPathUnits="objectBoundingBox">
//             <polygon
//                points="0.25 0, 0.75 0, 1 0.5, 0.75 1, 0.25 1, 0 0.5"
//             />
//          </clipPath>
//       </defs>
//    </svg>
// </div>
