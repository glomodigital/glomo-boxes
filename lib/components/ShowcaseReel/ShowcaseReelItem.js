import React, { Component } from 'react';
import PropType from 'prop-types';

import Hexagon from '../Hexagon';

export default class ShowcaseReelItem extends Component {
   static propTypes = {
      imagePath: PropType.string,
      backgroundColor: PropType.string,
      title: PropType.string,
      excerpt: PropType.string,
      underlayColor: PropType.string,
      width: PropType.number,
   };

   static defaultProps = {
      imagePath: null,
      underlayColor: '#fff',
   };

   render() {
      const { imagePath, backgroundColor, width } = this.props;

      let hexProps = {
         backgroundColor,
         width,
      };

      if (imagePath != null) {
         hexProps['backgroundImage'] = imagePath;
      }

      return (
         <section>
            <Hexagon {...hexProps} />
         </section>
      );
   }
}
