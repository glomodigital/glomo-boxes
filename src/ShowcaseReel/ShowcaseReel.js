import React from 'react'
import PropTypes from 'prop-types'

const ShowcaseReel = ({ value }) => {
   return (
      <h1>{ value }</h1>
   )
}

ShowcaseReel.propTypes = {
   value: PropTypes.string
}

export default ShowcaseReel