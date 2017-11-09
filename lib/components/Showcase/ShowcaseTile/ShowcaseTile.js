import React, { Component } from 'react';
import PropType from 'prop-types';

import styles from './ShowcaseTile.css';

const Divider = ({ height = '3px', width = '25%', background = '#fff' }) => {
   const style = { width, height, background };
   return <div style={style} className={styles['showcase-divider']} />;
};

export default class ShowcaseTile extends Component {
   static propTypes = {
      tileIndex: PropType.number,
      title: PropType.node,
      excerpt: PropType.string,
      tileColor: PropType.string,
      contentColor: PropType.string,
   };

   render() {
      const { tileIndex, title, excerpt, tileColor, contentColor } = this.props;

      let TitleProp = title;
      if (typeof TitleProp === 'string') {
         TitleProp = <h3>{title}</h3>;
      } else {
         TitleProp = <TitleProp />;
      }

      const style = {
         background: tileColor,
         color: contentColor,
      };

      return (
         <div
            style={style}
            id="showcase-tile"
            className={styles['showcase-tile']}
         >
            <span>{tileIndex}</span>
            {TitleProp}
            <div className={styles['inner-content']}>
               <Divider />
               <p className={styles['showcase-excerpt']}>{excerpt}</p>
            </div>
         </div>
      );
   }
}
