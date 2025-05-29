// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import Header from './Header';
import ErrorPage from './ErrorPages';
import { useTracker } from 'meteor/react-meteor-data';

function Layout() {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <Header />
      <main>
        {user ? (
          <div>
            {user.profile && user.profile.company ? (
              <Outlet />
            ) : (
              <ErrorPage />
            )}
          </div>
        ) : (
          <div>
            <h2>Please log in</h2>
            <LoginForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default Layout;