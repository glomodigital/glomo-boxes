import React, { Component } from 'react'
import PropType from 'prop-types'
import styles from './Hexagon.css'

const hexRatio = 0.868217054
let bgIndex = 0

function round(num) {
   return Number(num.toFixed(3))
}

class Hexagon extends Component {
   static defaultProps = {
      width: '100%',
      gradientOpacity: 1,
      gradientColors: [],
   }

   static propTypes = {
      width: PropType.string,
      backgroundColor: PropType.string,
      gradientColors: PropType.arrayOf(PropType.string),
      gradientOpacity: PropType.number,
      gradientAngle: PropType.number,
      backgroundImage: PropType.string,
      icon: PropType.string,
      shadow: PropType.string,
      style: PropType.shape({}),
   }

   state = {
      center: null,
   }

   componentDidMount() {
      const { width, height } = this.svgWrapper.getBBox()

      this.setState({
         center: {
            x: width / 2,
            y: height / 2,
         },
      })
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
      const { center } = this.state
      const {
         backgroundImage,
         backgroundColor,
         gradientColors,
         gradientOpacity,
         icon,
         iconSize,
         shadow,
         style,
         gradientAngle,
      } = this.props
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

      // const { width, height } = this.getSize(diagonal)
      // const hasSize = width !== diagonal
      // const imgHeight = hasSize ? height : '100%'
      // const imgWidth = hasSize ? width : '100%'
      // const xOffset = 0 - imgWidth * 0.065

      const bgId = bgIndex++

      const anglePI = gradientAngle * (Math.PI / 180)
      const angleCoords = {
         x1: Math.round(50 + Math.sin(anglePI) * 50) + '%',
         y1: Math.round(50 + Math.cos(anglePI) * 50) + '%',
         x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
         y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
      }

      let rectStyle = {
         fill: 'transparent',
      }

      if (backgroundColor) {
         rectStyle['fill'] = backgroundColor
      }

      if (gradientColors.length !== 0) {
         if (gradientColors.length === 1) {
            throw Error(
               'You must supply more than just one color for a gradient to work'
            )
         }
         rectStyle['fill'] = `url(#hexGradient${bgId})`
      }

      return (
         <div
            className={styles.hex}
            style={{ width: this.props.width, filter: shadow && shadow }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               version="1.1"
               viewBox={viewBox}
               className={styles['svg-wrapper']}
               ref={node => (this.svgWrapper = node)}
            >
               <defs>
                  <pattern
                     id={`hex${bgId}`}
                     width={'100%'}
                     height={'100%'}
                     patternContentUnits="objectBoundingBox"
                     preserveAspectRatio="xMidYMid slice"
                     viewBox={'0 0 1 1'}
                  >
                     {backgroundImage && (
                        <image
                           width="1"
                           height="1"
                           xlinkHref={backgroundImage}
                           preserveAspectRatio="xMidYMid slice"
                        />
                     )}
                     <rect width="1" height="1" style={rectStyle} />
                  </pattern>
                  {gradientColors.length !== 0 && (
                     <linearGradient
                        id={`hexGradient${bgId}`}
                        x1={angleCoords.x1}
                        y1={angleCoords.y1}
                        x2={angleCoords.x2}
                        y2={angleCoords.y2}
                     >
                        {gradientColors.map((color, index) => {
                           const lastColor = gradientColors.length - 1

                           const offset =
                              index === lastColor
                                 ? 100
                                 : index / (gradientColors.length - 1) * 100

                           return (
                              <stop
                                 key={index}
                                 offset={`${offset}%`}
                                 stopColor={color}
                                 stopOpacity={gradientOpacity}
                              />
                           )
                        })}
                     </linearGradient>
                  )}
               </defs>
               <polygon
                  points={points.map(point => point.join(',')).join(' ')}
                  fill={`url(#hex${bgId})`}
               />
               {center != null &&
                  icon != null && (
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        className={styles['icon-svg']}
                        width="50%"
                        height="50%"
                        x={center.x / 2}
                        y={center.y / 1.6}
                     >
                        <image width="100%" height="100%" xlinkHref={icon} />
                     </svg>
                  )}
            </svg>

            <div className={styles['hex-inner']} style={style}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
export default Hexagon
