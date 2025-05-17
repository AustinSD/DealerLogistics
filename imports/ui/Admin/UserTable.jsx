import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Table from 'react-bootstrap/Table';
import { CreateUserModal } from "./CreateUserModal";
import Button from 'react-bootstrap/Button';

export const UserTable = (props) => {
    const [companyUsers, setCompanyUsers] = useState([]);
    const user = useTracker(() => Meteor.user());

    const handleClose = () => {
        fetchData();
    };

    const fetchData = async () => {
        const users = await Meteor.callAsync("getCompanyUsers", user.profile.company);
        setCompanyUsers(users);
    };

    const deleteUser = async (userId, username, role) => {
        const result = await Meteor.callAsync("removeUserFromCompany", userId, username, role).then(() => {
            fetchData();
        }
        ).catch((error) => {
            console.error("Error deleting user:", error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <CreateUserModal handleClose={handleClose} />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companyUsers.map(user =>
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.emails[0].address}</td>
                            <td>{user.role}</td>
                            <td> <Button onClick={() => deleteUser(user._id, user.username, user.role)}> Delete User </Button></td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </div>
    );
}