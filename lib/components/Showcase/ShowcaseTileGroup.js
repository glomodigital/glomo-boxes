import React, { Component } from 'react';
import PropType from 'prop-types';

import styles from './ShowcaseTileGroup.css';
import ShowcaseTile from './ShowcaseTile';

import { resize } from '../../utils/helpers';

export default class ShowcaseTileGroup extends Component {
   static propTypes = {
      tileItems: PropType.arrayOf(PropType.shape(ShowcaseTile.propTypes))
         .isRequired,
      style: PropType.shape({}),
   };

   constructor() {
      super();

      this.state = {
         isDesktop: false,
      };
   }

   componentDidMount() {
      const tileGroup = this.showcaseTileGroup;

      resize.add(this.resize);
   }

   resize = () => {
      if (window.innerWidth >= 800) {
         this.setState({ isDesktop: true });
      } else if (window.innerWidth < 800) {
         this.setState({ isDesktop: false });
      }
      console.log('showcaseTileGroup resizing');
   };

   render() {
      const { tileItems, style } = this.props;

      if (tileItems == null || tileItems.length < 0) {
         return;
      }

      return (
         <section
            style={style}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {tileItems.map((item, index) => (
               <ShowcaseTile key={`tile-item-${index}`} {...item} />
            ))}
         </section>
      );
   }
}
