import React from 'react';

const LoginContainer = ({ children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-opacity-25">
      <div className="bg-white rounded-4 shadow-sm p-4 w-100" style={{ maxWidth: 400, minWidth: 320 }}>
        {children}
      </div>
    </div>
  );
}

export default LoginContainer;
