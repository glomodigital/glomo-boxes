import React, { Component } from 'react'
import PropType from 'prop-types'

import styles from './ShowcaseTileGroup.css'
import ShowcaseTile from './ShowcaseTile'

import { resize } from '../../utils/helpers'

const BREAKPOINT = 900

export default class ShowcaseTileGroup extends Component {
   static propTypes = {
      tileItems: PropType.arrayOf(PropType.shape(ShowcaseTile.propTypes))
         .isRequired,
      style: PropType.shape({}),
   }

   constructor() {
      super()

      this.state = {
         isDesktop: window.innerWidth < BREAKPOINT ? false : true,
      }
   }

   componentDidMount() {
      resize.add(this.resize)

      if (this.showcaseTileGroup != null) {
         const containerX = this.showcaseTileGroup.getBoundingClientRect().width
         this.setState({ isDesktop: containerX < BREAKPOINT ? false : true })
      }
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false })
      }
   }

   generateStyles = () => {
      const { isDesktop } = this.state

      let style = {
         wrapper: {
            display: 'flex',
            flexDirection: 'column',
         },
         inner: {
            padding: '10% 7.5%',
         },
      }

      if (isDesktop) {
         style = {
            wrapper: {
               ...style.wrapper,
               flexDirection: 'row',
            },
            inner: {
               ...style.inner,
               padding: '20% 15% 30% 15%',
            },
         }
      }

      return style
   }

   render() {
      const { tileItems, style } = this.props

      if (tileItems == null || tileItems.length < 0) {
         return
      }

      let compStyles = this.generateStyles()

      return (
         <section
            style={{ ...compStyles.wrapper, ...style }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {tileItems.map((item, index) => (
               <ShowcaseTile
                  key={`tile-item-${index}`}
                  {...item}
                  style={compStyles.inner}
               />
            ))}
         </section>
      )
   }
}
