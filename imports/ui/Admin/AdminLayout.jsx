import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from '../LoginForm';
import { CreateCompanyForm } from './CreateCompanyForm.jsx';
import { CompanyProfile } from './CompanyProfile';
import { Roles } from "meteor/roles";


export const AdminLayout = () => {
    const user = useTracker(() => Meteor.user());
    const isAdmin = Roles.userIsInRoleAsync(user, 'admin')
    console.log("isAdmin: ", isAdmin );

  return (
  <div>
    <h1>Admin Page</h1>
    {user ? (
      <div>
        {user.profile && user.profile.company ? (
            <CompanyProfile />
        ) : (
          <div>
            <h3>No company information available</h3>
            <CreateCompanyForm/>
          </div>
        )}
      </div>
    ) : (
      <LoginForm />
    )}
    
  </div>
)};