import React from 'react'
import PropType from 'prop-types'

import styles from './Divider.css'

const Divider = ({
   height = '3px',
   width = '66px',
   background = '#fff',
   className,
}) => {
   const styleObj = { width, height, background }
   return <div style={styleObj} className={className} />
}

Divider.propTypes = {
   height: PropType.string,
   width: PropType.string,
   background: PropType.string,
}

export default Divider
