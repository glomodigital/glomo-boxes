import React, { Component } from 'react';
import PropType from 'prop-types';
import { findDOMNode } from 'react-dom';
import styles from './ButtonBase.css';

export default class ButtonBase extends Component {
   static defaultProps = {
      type: 'button',
      disabled: false,
      style: {},
      // onClick: (e) => {},
      // onFocus: (e) => {},
      // onBlur: () => {},
      // onMouseEnter: () => {},
      // onMouseLeave: () => {},
      // onMouseDown: () => {},
      // onMouseUp: () => {},
      // onTouchStart: () => {},
      // onTouchEnd: () => {},
      // onTouchMove: () => {},
   };

   static propTypes = {
      component: PropType.oneOf([PropType.node, PropType.string]),
      children: PropType.node,
      async: PropType.bool,
      disabled: PropType.bool,
      style: PropType.shape({}),
      className: PropType.string,
      onClick: PropType.func,
      onFocus: PropType.func,
      onBlur: PropType.func,
      onMouseEnter: PropType.func,
      onMouseLeave: PropType.func,
      onMouseDown: PropType.func,
      onMouseUp: PropType.func,
      onTouchStart: PropType.func,
      onTouchEnd: PropType.func,
      onTouchMove: PropType.func,
   };

   componentDidMount() {
      this.button = findDOMNode(this);
   }

   componentWillUnmount() {
      this.button = null;
   }

   render() {
      const {
         type,
         component,
         className,
         style,
         disabled,
         children,
         onMouseDown,
         onMouseUp,
         onMouseEnter,
         onMouseLeave,
         onClick,
         onBlur,
         onFocus,
         onTouchEnd,
         onTouchMove,
         onTouchStart,
         ...other
      } = this.props;

      let classnames = [styles.root, className];

      if (disabled) {
         classnames = [...classnames, styles.disabled];
      }

      const buttonProps = {};
      let ComponentProp = component;

      if (!ComponentProp) {
         if (other.href) {
            ComponentProp = 'a';
         } else {
            ComponentProp = 'button';
         }
      }

      if (ComponentProp === 'button') {
         buttonProps.type = type || 'button';
      }

      if (ComponentProp !== 'a') {
         buttonProps.role = buttonProps.role || 'button';
         buttonProps.disabled = disabled;
      }

      return (
         <ComponentProp
            style={{ ...style }}
            className={classnames.join(' ')}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
         >
            {children}
         </ComponentProp>
      );
   }
}
