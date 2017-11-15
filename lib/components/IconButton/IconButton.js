import React, { Component } from 'react'
import PropType from 'prop-types'
import ButtonBase from '../ButtonBase'
import Icon from '../Icon'
import styles from './IconButton.css'

/**
 * TODO:
 * - add animation to interactions 
 * - accept style as props
 */
export default class IconButton extends Component {
   static propTypes = {
      ...ButtonBase.propTypes,
      style: PropType.shape({}),
      children: PropType.node,
      disabled: PropType.bool,
      size: PropType.number,
      cssEase: PropType.string,
      transitionDuration: PropType.number,
   }

   static defaultProps = {
      disabled: false,
      size: 48,
      cssEase: 'ease-in',
      transitionDuration: 300,
   }

   constructor() {
      super()

      this.state = {
         active: false,
      }
   }

   handleActive = e => {
      this.setState({ active: true })
   }

   handleInactive = e => {
      this.setState({ active: false })
   }

   render() {
      const {
         transitionDuration,
         cssEase,
         size,
         disabled,
         children,
         style,
         ...other
      } = this.props

      const styleDefault = {
         height: size,
         width: size,
         maxWidth: size,
         maxHeight: size,
         border: '1px solid black',
         transition: `opacity ${transitionDuration}ms ${cssEase}`,
         opacity: 1,
      }

      return (
         <ButtonBase
            disabled={disabled}
            className={styles.root}
            style={{ ...styleDefault, ...style }}
            onMouseEnter={this.handleActive}
            onMouseLeave={this.handleInactive}
            onTouchStart={this.handleActive}
            onTouchEnd={this.handleInactive}
            {...other}
         >
            {typeof children === 'string' ? (
               <Icon iconName={children} />
            ) : (
               <span className={styles.label}>{children}</span>
            )}
         </ButtonBase>
      )
   }
}
