import React, { Component } from 'react'
import PropType from 'prop-types'
import styles from './Hexagon.css'

const hexRatio = 0.868217054
let bgIndex = 0

function round(num) {
   return Number(num.toFixed(3))
}

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

   getFlatTopPoints(diagonal, offset) {
      const y = diagonal / 2
      const cx = hexRatio * diagonal / 2
      const x = cx + (y - cx)
      const radius = y

      const cos = hexRatio * radius
      const sin = 0.5 * radius

      return [
         [x - sin, y - cos],
         [x + sin, y - cos],
         [x + radius, y],
         [x + sin, y + cos],
         [x - sin, y + cos],
         [x - radius, y],
      ].map(point => point.map(round))
   }

   substractMinBounds(extremes) {
      return {
         maxX: extremes.maxX - extremes.minX,
         maxY: extremes.maxY - extremes.minY,
         minX: extremes.minX,
         minY: extremes.minY,
      }
   }

   getSize(size) {
      let width = size
      let height = size
      return {
         width: (width *= 1.05),
         height: (height *= 1.05),
      }
   }

   render() {
      const { backgroundImage, shadow } = this.props
      let diagonal = 500

      const offset = diagonal * 0.02
      const points = this.getFlatTopPoints(diagonal, offset)
      const halfStroke = Math.ceil(offset / 2)

      const baseBounds = {
         maxX: -Infinity,
         maxY: -Infinity,
         minX: +Infinity,
         minY: +Infinity,
      }

      function reduceBounds(extremes, point) {
         return {
            maxX: Math.ceil(Math.max(extremes.maxX, point[0] + halfStroke)),
            maxY: Math.ceil(Math.max(extremes.maxY, point[1] + halfStroke)),
            minX: Math.floor(Math.min(extremes.minX, point[0] - halfStroke)),
            minY: Math.floor(Math.min(extremes.minY, point[1] - halfStroke)),
         }
      }

      const bounds = this.substractMinBounds(
         points.reduce(reduceBounds, baseBounds)
      )

      const viewBox = [
         bounds.minX,
         bounds.minY,
         bounds.maxX + (bounds.minX < 0 ? Math.abs(bounds.minX) : 0),
         bounds.maxY + (bounds.minY < 0 ? Math.abs(bounds.minY) : 0),
      ].join(' ')

      const { width, height } = this.getSize(diagonal)
      const hasSize = width !== diagonal
      const imgHeight = hasSize ? height : '100%'
      const imgWidth = hasSize ? width : '100%'
      const xOffset = 0 - imgWidth * 0.065

      const bgId = bgIndex++

      return (
         <div className={[styles.hex, shadow && styles.shadow].join(' ')}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               version="1.1"
               viewBox={viewBox}
               preserveAspectRatio="xMidYMid slice"
            >
               <defs>
                  <pattern
                     id={`${bgId}`}
                     width={'100%'}
                     height={'100%'}
                     patternContentUnits="objectBoundingBox"
                  >
                     <image
                        width="1"
                        height="1"
                        xlinkHref={backgroundImage}
                        preserveAspectRatio="xMidYMid slice"
                     />
                  </pattern>
               </defs>
               <polygon
                  points={points.map(point => point.join(',')).join(' ')}
                  fill={`url(#${bgId})`}
               />
            </svg>
         </div>
      )
   }
}
export default Hexagon
