import React from 'react';
import './errorBlock.css';

const ErrorBlock = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-message">{message}</div>
    </div>
  );
};

export default ErrorBlock;