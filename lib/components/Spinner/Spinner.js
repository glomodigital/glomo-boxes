import React from 'react'
import PropTypes from 'prop-types'
import styles from './Spinner.css'

const injectKeyframes = (thickness, PI = Math.PI) => {
   const animationStyle = `@-webkit-keyframes progressCircle {
         8% {
            stroke-dasharray: 1, calc((100% - ${thickness}px) * ${PI});
            stroke-dashoffset: 0;
         }
         50%, 58% {
            stroke-dasharray: calc((65% - ${thickness}px) * ${PI}), calc((100% - ${thickness}px) * ${PI});
            stroke-dashoffset: calc((25% - ${thickness}px) * -${PI});
         }
         100% {
            stroke-dasharray: calc((65% - ${thickness}px) * ${PI}), calc((100% - ${thickness}px) * ${PI});
            stroke-dashoffset: calc((99% - ${thickness}px) * -${PI});
         }
      }
   `

   const rotateCircle = `@-webkit-keyframes rotateCircle {
      0% {
         transform: rotate(-90deg);
      }
      100% {
         transform: rotate(270deg);
      }
   }`

   const styleElement = document.createElement('style')
   document.head.appendChild(styleElement)

   const styleSheet = styleElement.sheet

   styleSheet.insertRule(animationStyle, styleSheet.cssRules.length)
   styleSheet.insertRule(rotateCircle, styleSheet.cssRules.length)
}

const Spinner = ({ ...props }) => {
   const { size, thickness, spinnerColor } = props
   const { PI } = Math

   injectKeyframes(thickness)

   const svgStyle = {
      transform: 'rotate(-90deg)',
      animation: 'rotateCircle 1733ms linear infinite',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
   }

   const circleStyle = {
      strokeDasharray: `1, calc((100% - ${thickness}px) * ${PI})`,
      animation: `progressCircle 1300ms ease-in-out infinite`,
   }

   const radius = size / 2

   return (
      <div
         className={styles.spinner}
         style={{
            width: size,
            height: size,
            display: 'inline-block',
            color: spinnerColor,
         }}
      >
         <svg style={svgStyle} viewBox={`0 0 ${size} ${size}`}>
            <circle
               className={styles['spinner-circle']}
               style={circleStyle}
               cx={radius}
               cy={radius}
               r={radius - thickness / 2}
               fill="none"
               strokeWidth={thickness}
               strokeMiterlimit="20"
            />
         </svg>
      </div>
   )
}

Spinner.defaultProps = {
   size: 40,
   thickness: 4,
}

Spinner.propTypes = {
   size: PropTypes.number,
   thickness: PropTypes.number,
   spinnerColor: PropTypes.string,
}

export default Spinner
