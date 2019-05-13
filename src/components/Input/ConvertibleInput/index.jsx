import React from 'react';
import PropTypes from 'prop-types';

const ConvertibleInput = (props) =>
  <div className="converter__input-container">
  <span
    className="converter__symbol"
    dangerouslySetInnerHTML={{ __html: props.symbol }}
  />
    <input
      className="converter__input converter__input_to"
      type="number"
      disabled
      value={props.value}
      onChange={props.handleChange}
      min={0}
    />
  </div>;

ConvertibleInput.propTypes = {
  value: PropTypes.number,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

ConvertibleInput.propTypes = {
  value: 1
};

export default ConvertibleInput;
