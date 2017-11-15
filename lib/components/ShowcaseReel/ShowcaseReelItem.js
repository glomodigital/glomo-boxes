import React, { Component } from 'react';
import PropType from 'prop-types';

import styles from './ShowcaseReelItem.css';
import Hexagon from '../Hexagon';
import Divider from '../Divider';

export default class ShowcaseReelItem extends Component {
   static propTypes = {
      imagePath: PropType.string,
      backgroundColor: PropType.string,
      title: PropType.string,
      excerpt: PropType.string,
      underlayColor: PropType.string,
      width: PropType.number,
      showInnerContent: PropType.bool,
      innerContentPositionX: PropType.oneOf(['LEFT', 'RIGHT']),
   };

   static defaultProps = {
      imagePath: null,
      underlayColor: '#fff',
   };

   render() {
      const {
         imagePath,
         backgroundColor,
         width,
         title,
         excerpt,
         showInnerContent,
         innerContentPositionX,
      } = this.props;

      let hexProps = {
         backgroundColor,
         width,
      };

      if (imagePath != null) {
         hexProps['backgroundImage'] = imagePath;
      }

      let innerClassName = [
         styles['item-inner'],
         innerContentPositionX === 'LEFT'
            ? styles['item-inner--left']
            : styles['item-inner--right'],
      ].join(' ');

      return (
         <div className={styles['showcase-reel-item']}>
            {showInnerContent && (
               <div className={innerClassName}>
                  <span className={styles.title}>{title}</span>
                  <Divider background={'#000'} />
                  <span className={styles.excerpt}>{excerpt}</span>
               </div>
            )}
            <Hexagon {...hexProps} />
         </div>
      );
   }
}
