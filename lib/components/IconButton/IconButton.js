import React, { Component } from 'react';
import PropType from 'prop-types';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import styles from './IconButton.css';

export default class IconButton extends Component {
   static propTypes = {
      children: PropType.node,
      disabled: PropType.bool,
      size: PropType.number,
      cssEase: PropType.string,
      transitionDuration: PropType.number,
   };

   static defaultProps = {
      disabled: false,
      size: 48,
      cssEase: 'ease-in',
      transitionDuration: 300,
   };

   constructor() {
      super();

      this.state = {
         hover: false,
      };
   }

   handleMouseEnter = e => {
      this.setState({ hover: true });
   };

   handleMouseLeave = e => {
      this.setState({ hover: false });
   };

   render() {
      const {
         transitionDuration,
         cssEase,
         size,
         disabled,
         children,
         ...other
      } = this.props;

      const styleProp = {
         height: size,
         width: size,
         maxWidth: size,
         maxHeight: size,
         border: '1px solid black',
         transition: `opacity ${transitionDuration}ms ${cssEase}`,
         opacity: this.state.hover ? 1 : 0.4,
      };

      return (
         <ButtonBase
            disabled={disabled}
            className={styles.root}
            style={styleProp}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...other}
         >
            {typeof children === 'string' ? (
               <Icon iconName={children} />
            ) : (
               <span className={styles.label}>{children}</span>
            )}
         </ButtonBase>
      );
   }
}
