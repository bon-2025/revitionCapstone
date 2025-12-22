import React from 'react';

const ErrorAlert = ({ error }) => {
  if (!error) return null; // Nothing to display if no error

  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};

export default ErrorAlert;
