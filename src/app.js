import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import hljs from 'highlight.js';

import styles from '../node_modules/highlight.js/styles/atom-one-dark.css';

/**
 * Components
 */
import ShowcaseReel from './ShowcaseReel';
import ShowcaseTiles from './ShowcaseTiles';

const TestContainer = ({ description, element }) => {
   const elementString = reactElementToJSXString(element, {
      showDefaultProps: false,
      showFunctions: true,
      tabStop: 3,
      useBooleanShorthandSyntax: false,
   });

   const createMarkup = () => {
      const hl = hljs.highlight('html', elementString, true);
      return {
         __html: hl.value,
      };
   };

   return (
      <div className="test-container">
         <div className="header">
            <h2>{element.type.name}</h2>
            {description}
         </div>
         <div className="code">
            <h3>Code</h3>
            <pre>
               <code
                  className="html"
                  dangerouslySetInnerHTML={createMarkup()}
               />
            </pre>
         </div>
         <div className="example">
            <h3>Working example</h3>
            <div className="component">{element}</div>
         </div>
      </div>
   );
};

const render = (description, element) => {
   const root = document.getElementById('root');
   const div = document.createElement('div');
   root.append(div);

   ReactDOM.render(
      <TestContainer description={description} element={element} />,
      div
   );
};

render('ShowcaseReel element', <ShowcaseReel value="Showcase Reel" />);

render('ShowcaseTiles element', <ShowcaseTiles value="Showcase Tiles" />);

// Initialize highlighting of code
hljs.initHighlighting();
