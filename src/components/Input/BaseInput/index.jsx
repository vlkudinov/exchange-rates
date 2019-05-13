import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = (props) =>
  (<div className="converter__input-container">
    <span
      className="converter__symbol"
      dangerouslySetInnerHTML={{ __html: props.symbol }}
    />
    <input
      className="converter__input converter__input_from"
      type="number"
      autoFocus
      value={props.value}
      onChange={props.handleChange}
      min={0}
    />
  </div>);

BaseInput.propTypes = {
  value: PropTypes.number,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

BaseInput.propTypes = {
  value: 1
};

export default BaseInput;
