import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Container = ({ width = '1000px', children }) => (
  <div className="container" style={{ width }}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default Container;
