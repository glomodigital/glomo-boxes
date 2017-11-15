import React from 'react'
import PropType from 'prop-types'

import styles from './Divider.css'

const Divider = ({ height = '3px', width = '25%', background = '#fff' }) => {
   const style = { width, height, background }
   return <div style={style} className={styles['divider']} />
}

Divider.propTypes = {
   height: PropType.string,
   width: PropType.string,
   background: PropType.string,
}

export default Divider
