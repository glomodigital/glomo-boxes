import React from 'react';
import PropTypes from 'prop-types';

const ShowcaseReel = ({ value }) => {
   return <p>hello {value}</p>;
};

ShowcaseReel.propTypes = {
   value: PropTypes.string,
};

export default ShowcaseReel;
