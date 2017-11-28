import React from 'react'
import PropType from 'prop-types'

import styles from './Divider.css'

const Divider = ({
   height = '3px',
   width = '66px',
   background = '#fff',
   style,
}) => {
   const styleObj = { width, height, background, ...style }
   return <div style={styleObj} className={styles['divider']} />
}

Divider.propTypes = {
   height: PropType.string,
   width: PropType.string,
   background: PropType.string,
}

export default Divider
