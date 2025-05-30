// Layout.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import Header from './Header';
import ErrorPage from './ErrorPages';
import { useTracker } from 'meteor/react-meteor-data';
import { AdminLayout } from './Admin/AdminLayout';

function Layout() {
  const user = useTracker(() => Meteor.user());
  const isAdmin = useTracker(() => Roles.userIsInRoleAsync(user, 'admin'));

  return (
    <div>
      <Header />
      <main>
        {user ? (
          <div>
            {user.profile && user.profile.company ? (
              <Outlet />
            ) : (
              isAdmin ? <AdminLayout /> : <ErrorPage />
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