import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CarsTable } from './Cars/CarsTable.jsx';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
  <div>
    <h1>Welcome to Meteor!</h1>
    {user ? (
      <div>
        <h2>Hello, {user.username}</h2>
        <CarsTable></CarsTable>
      </div>
    ) : (
      <LoginForm />
    )}
    
  </div>
)};
