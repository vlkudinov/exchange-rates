import React from 'react';
import './style.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span>Sorry, something has gone wrong!</span>
      <br />
      <span> Error: {message}</span>
    </div>
  );
};

export default ErrorMessage;
