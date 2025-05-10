// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { useTracker } from 'meteor/react-meteor-data';

function Layout() {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {user ? (
          <div>
            <h2>Hello, {user.username}</h2>
            <Outlet />
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