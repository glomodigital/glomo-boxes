import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileCard.css';
import Button from '../Button/Button';

export default class ProfileCard extends Component {
   static defaultProps = {
      image: '',
      title: '',
      firstName: '',
      lastName: '',
      text: '',
      phone: '',
      email: '',
      colorTheme: 'dark',
      backgroundColor: '#FFF',
      backgroundGradientColor: '',
      buttonColor: '#FFF',
   };
   static propTypes = {
      image: PropTypes.string,
      title: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      colorTheme: PropTypes.oneOf(['dark', 'light']),
      backgroundColor: PropTypes.string,
      backgroundGradientColor: PropTypes.string,
      buttonColor: PropTypes.string,
   };
   backgroundClass = (backgroundColor, backgroundGradientColor) => {
      if (backgroundGradientColor !== '') {
         return {
            backgroundImage: `linear-gradient(298deg, ${backgroundColor}, ${backgroundGradientColor})`,
         };
      } else {
         return {
            backgroundColor: backgroundColor,
         };
      }
   };
   textColor = colorTheme => {
      if (colorTheme === 'dark') {
         return '#000';
      } else if (colorTheme === 'light') {
         return '#FFF';
      }
   };
   render() {
      const {
         image,
         title,
         firstName,
         lastName,
         text,
         phone,
         email,
         colorTheme,
         backgroundColor,
         backgroundGradientColor,
         buttonColor,
      } = this.props;

      const buttonStyle = {
         padding: '12px 0',
      };
      return (
         <div
            className={styles['profile-card']}
            style={this.backgroundClass(
               backgroundColor,
               backgroundGradientColor
            )}
         >
            <div className={styles['profile-card-inner']}>
               <div className={styles['image-container']}>
                  <div
                     className={styles['image']}
                     style={{ backgroundImage: `url(${image})` }}
                  />
               </div>
               <div
                  className={styles['text-container']}
                  style={{
                     color: this.textColor(colorTheme),
                  }}
               >
                  <h6 className={styles.title}>{title}</h6>
                  <h4 className={styles.name}>{`${firstName} ${lastName}`}</h4>
                  <p className={styles.text}>{text}</p>
                  <div className={`${styles['button-container']}`}>
                     <Button
                        type="a"
                        className="profile-button"
                        actionType="secondary"
                        href={`mailto:${email}`}
                        backgroundColor={buttonColor}
                        style={buttonStyle}
                     >
                        {`email ${firstName}`}
                     </Button>
                     <Button
                        type="a"
                        className="profile-button"
                        actionType="primary"
                        href={`tel:${phone}`}
                        color={colorTheme == 'light' ? backgroundColor : '#FFF'}
                        backgroundColor={buttonColor}
                        style={buttonStyle}
                     >
                        {phone}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
