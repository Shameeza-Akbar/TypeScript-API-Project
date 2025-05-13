import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from 'primereact/button';
import './error.css'; // You can create a separate CSS file for styling

interface RouteError {
  status?: number;
  statusText?: string;
  error?: any; // Or a more specific type if you know the structure
}

export const Error: React.FC = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <i className="pi pi-exclamation-triangle error-icon"></i>
        <h1>Oops! Something went wrong.</h1>
        {error && (
          <>
            {error.status && <h2>{error.status}</h2>}
            {error.statusText && <p>{error.statusText}</p>}
            {error.error && error.error.message && <p>{error.error.message}</p>}
            {!error.status && !error.statusText && !error.error && <p>An unexpected error occurred.</p>}
          </>
        )}
        <Button label="Go Back Home" onClick={()=>navigate('/')} className="p-button-secondary" />
      </div>
    </div>
  );
};

export default Error;