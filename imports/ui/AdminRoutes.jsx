import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from "meteor/roles";

export const AdminRoutes = () => {
    const user = useTracker(() => Meteor.userAsync());
    const isAdmin = async () => { await Roles.userIsInRoleAsync(user, 'admin')}
    console.log("isAdmin: ", isAdmin() );

    return (
        Roles.userIsInRoleAsync(Meteor.user(), 'admin') ? (<Outlet /> ) : <Navigate to='/' />

    )
}