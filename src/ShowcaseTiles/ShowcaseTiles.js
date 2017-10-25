import React from 'react'
import PropTypes from 'prop-types'

const ShowcaseTiles = ({ value }) => {
   return (
      <h1>{ value }</h1>
   )
}

ShowcaseTiles.propTypes = {
   value: PropTypes.string
}

export default ShowcaseTiles