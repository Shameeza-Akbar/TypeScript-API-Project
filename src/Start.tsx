import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

export const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100 p-4">
      <Card
        title="Welcome 👋"
        subTitle="User Management Dashboard"
        className="shadow-2 border-round-lg w-full sm:w-30rem text-center"
      >
        <p className="m-0 text-lg">
          Manage your users with ease! You can log in to get started or jump directly to the home page if you're already authenticated.
        </p>

        <div className="flex flex-column gap-3 mt-5">
          <Button
            label="Login"
            icon="pi pi-sign-in"
            className="p-button-primary"
            onClick={() => navigate('/login')}
          />
          <Button
            label="Home Page"
            icon="pi pi-home"
            className="p-button-outlined p-button-secondary"
            onClick={() => navigate('/home')}
          />
        </div>
      </Card>
    </div>
  );
};

