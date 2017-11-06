/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-danger */
/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import hljs from 'highlight.js';

import { ShowcaseReel, Carousel } from './index';

const TestContainer = ({ description, element }) => {
   // const elementString = reactElementToJSXString(element, {
   //    showDefaultProps: false,
   //    showFunctions: true,
   //    tabStop: 3,
   //    useBooleanShorthandSyntax: false,
   // });

   // const createMarkup = () => {
   //    const hl = hljs.highlight('html', elementString, true);
   //    return {
   //       __html: hl.value,
   //    };
   // };

   return (
      <div className="test-container">
         <div className="header">
            <h2>{element.type.name}</h2>
            {description}
         </div>
         {/* <div className="code">
            <h3>Code</h3>
            <pre>
               <code
                  className="language-html"
                  dangerouslySetInnerHTML={createMarkup()} 
               />
            </pre>
         </div> */}
         <div className="example">
            <h3>Working example</h3>
            <div className="component">{element}</div>
         </div>
      </div>
   );
};

TestContainer.propTypes = {
   description: PropTypes.string.isRequired,
   element: PropTypes.element,
};

const render = function(description, element) {
   ReactDOM.render(
      <TestContainer description={description} element={element} />,
      document.getElementById('root')
   );
};

// Example
// render('ShowcaseReel Element', <ShowcaseReel value="showcase reel" />)

render(
   'Carousel component',
   <Carousel height={300}>
      <div>
         <blockquote>
            Occaecat ex duis ex elit irure quis pariatur tempor consequat
            laboris magna magna ullamco. Incididunt exercitation sint laboris
            exercitation voluptate velit esse voluptate laboris officia mollit.
            Sunt amet anim aute officia deserunt occaecat ipsum ullamco
            adipisicing cupidatat do.
         </blockquote>
      </div>
      <div>
         <blockquote>
            Occaecat ex duis ex elit irure quis pariatur tempor consequat
            laboris magna magna ullamco. Incididunt exercitation sint laboris
            exercitation voluptate velit esse voluptate laboris officia mollit.
            Sunt amet anim aute officia deserunt occaecat ipsum ullamco
            adipisicing cupidatat do.
         </blockquote>
      </div>
      <div>
         <blockquote>
            Occaecat ex duis ex elit irure quis pariatur tempor consequat
            laboris magna magna ullamco. Incididunt exercitation sint laboris
            exercitation voluptate velit esse voluptate laboris officia mollit.
            Sunt amet anim aute officia deserunt occaecat ipsum ullamco
            adipisicing cupidatat do.
         </blockquote>
      </div>
   </Carousel>
);

// Initialize highlighting of code
hljs.initHighlighting();
