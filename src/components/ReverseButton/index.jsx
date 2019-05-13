import React from 'react';
import arrows from './arrows.png';
import PropTypes from 'prop-types';
import './style.scss';

const ReverseButton = props => (
  <span className="reverse-button" onClick={props.handleClick}>
    <img src={arrows} width="20px" alt="" />
  </span>
);
export default ReverseButton;

ReverseButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};
