import React from 'react';
import PropTypes from 'prop-types';
import icon from './loader.svg';
import './style.scss';

const Loader = ({ text = 'loading' }) => {
  return (
    <div className="loader">
      <img className="loader__img" src={icon} alt="loader" />
      <div className="loader__text">{text}</div>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string
};

export default Loader;
