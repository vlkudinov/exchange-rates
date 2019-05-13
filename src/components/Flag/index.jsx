import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.scss';

const Flag = props => {
  const flagClass = cn({
    flag: true,
    flag_circle: props.circle
  });
  const iconClass = cn({
    [`flag__icon-${props.size}`]: true,
    [`flag__icon-${props.size}_${props.currency.toLowerCase()}`]: true
  });

  return (
    <div className={flagClass}>
      <span className={iconClass} />
    </div>
  );
};
Flag.propTypes = {
  currency: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  circle: PropTypes.bool
};

Flag.defaultProps = {
  size: 'xl',
  currency: 'eur'
};

export default Flag;
