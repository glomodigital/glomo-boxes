import React, { Component } from 'react'
import PropType from 'prop-types'
import { findDOMNode } from 'react-dom'
import styles from './ButtonBase.css'
import Spinner from '../Spinner'

export default class ButtonBase extends Component {
   static defaultProps = {
      type: 'button',
      disabled: false,
      processing: false,
      spinnerSize: 16,
      onFocus: () => {},
      onBlur: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onMouseDown: () => {},
      onMouseUp: () => {},
      onTouchStart: () => {},
      onTouchEnd: () => {},
      onTouchMove: () => {},
   }

   static propTypes = {
      component: PropType.oneOf([PropType.node, PropType.string]),
      style: PropType.shape({}),
      processing: PropType.bool,
      children: PropType.node,
      disabled: PropType.bool,
      spinnerSize: PropType.number,
      className: PropType.string,
      onFocus: PropType.func,
      onBlur: PropType.func,
      onMouseEnter: PropType.func,
      onMouseLeave: PropType.func,
      onMouseDown: PropType.func,
      onMouseUp: PropType.func,
      onTouchStart: PropType.func,
      onTouchEnd: PropType.func,
      onTouchMove: PropType.func,
   }

   constructor(props) {
      super(props)

      this.state = {
         disabled: props.disabled,
      }
   }

   componentDidMount() {
      this.button = findDOMNode(this)

      if (this.props.processing) {
         this.setState({ disabled: true })
      }
   }

   componentWillUnmount() {
      this.button = null
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.processing !== this.props.processing) {
         this.setState({ disabled: !this.state.disabled })
      }
   }

   renderSpinner() {
      return (
         <Spinner
            spinnerColor={'#000'}
            size={this.props.spinnerSize}
            thickness={2}
         />
      )
   }

   render() {
      const { disabled } = this.state
      const {
         spinnerSize,
         processing,
         type,
         component,
         className,
         children,
         onMouseDown,
         onMouseUp,
         onMouseEnter,
         onMouseLeave,
         onBlur,
         onFocus,
         onTouchEnd,
         onTouchMove,
         onTouchStart,
         ...other
      } = this.props

      let classnames = [styles.root, className]

      if (disabled) {
         classnames = [...classnames, styles.disabled]
      }

      const buttonProps = {}
      let ComponentProp = component

      if (!ComponentProp) {
         if (other.href) {
            ComponentProp = 'a'
         } else {
            ComponentProp = 'button'
         }
      }

      if (ComponentProp === 'button') {
         buttonProps.type = type || 'button'
      }

      if (ComponentProp !== 'a') {
         buttonProps.role = buttonProps.role || 'button'
         buttonProps.disabled = disabled
      }

      return (
         <ComponentProp
            className={classnames.join(' ')}
            onFocus={onFocus}
            onBlur={onBlur}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            {...buttonProps}
            {...other}
            ref={this.button}
         >
            {!processing && children}
            {processing && this.renderSpinner()}
         </ComponentProp>
      )
   }
}
