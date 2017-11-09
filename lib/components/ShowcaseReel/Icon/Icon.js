import React from 'react';
import PropType from 'prop-types';
import styles from './Icon.css';

const Icon = ({ ...props }) => {
   const { size, iconInactive, theme, iconName, iconType, ...other } = props;

   if (iconType !== 'material') {
      console.error(
         'only material icons currently, we are looking to support font-awesome too'
      );
   }

   let classnames = [
      styles['material-icons'],
      styles[`md-${theme}`],
      styles[`md-${size}`],
   ];

   if (iconInactive) {
      classnames = [...classnames, styles['md-inactive']];
   }

   return <span className={classnames.join(' ')} />;
};

Icon.defaultProps = {
   iconType: 'material',
   iconInactive: false,
   theme: 'dark',
   size: '24',
};

Icon.propTypes = {
   iconType: PropType.oneOf(['material', 'fontAwesome']),
   iconName: PropType.string,
   theme: PropType.oneOf(['light', 'dark']),
   size: PropType.oneOf(['18', '24', '36', '48']),
};

export default Icon;
