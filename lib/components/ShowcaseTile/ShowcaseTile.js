import React, { Component } from 'react';
import PropType from 'prop-types';

import styles from './ShowcaseTile.css';

const Divider = ({ height = '3px', width = '25%', background = '#fff' }) => {
   const style = { width, height, background };
   return <div style={style} className={styles['showcase-divider']} />;
};

export default class ShowcaseTile extends Component {
   static propTypes = {
      subTitle: PropType.oneOfType([PropType.string, PropType.number]),
      title: PropType.node,
      excerpt: PropType.string,
      tileColor: PropType.string,
      contentColor: PropType.string,
      tileBackground: PropType.shape({
         path: PropType.string,
         positionX: PropType.string,
         positionY: PropType.string,
      }),
   };

   tileBackground() {
      const { tileBackground } = this.props;

      let posX = '50%';
      let posY = '50%';

      if (
         tileBackground.hasOwnProperty('positionX') ||
         tileBackground.hasOwnProperty('positionY')
      ) {
         posX = tileBackground.positionX;
         posY = tileBackground.positionY;
      }

      const style = {
         backgroundImage: `url(${tileBackground.path})`,
         backgroundPosition: `${posX} ${posY}`,
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
         width: '100%',
         height: '100%',
         position: 'absolute',
         top: 0,
         left: 0,
         zIndex: -1,
      };

      return <div id="showcase-tile-background" style={style} />;
   }

   render() {
      const {
         subTitle,
         title,
         excerpt,
         tileColor,
         contentColor,
         tileBackground,
         style,
      } = this.props;

      let TitleProp = title;
      if (typeof TitleProp === 'string') {
         TitleProp = <h3>{title}</h3>;
      } else {
         TitleProp = <TitleProp />;
      }

      const compStyle = {
         background: tileColor,
         color: contentColor,
      };

      return (
         <div className={styles['tile-wrapper']}>
            <div
               style={{ ...compStyle, ...style }}
               id="showcase-tile"
               className={styles['showcase-tile']}
            >
               <span>{subTitle}</span>
               {TitleProp}
               <div className={styles['inner-content']}>
                  <Divider />
                  <p className={styles['showcase-excerpt']}>{excerpt}</p>
               </div>
            </div>
            {tileBackground != null && this.tileBackground()}
         </div>
      );
   }
}
