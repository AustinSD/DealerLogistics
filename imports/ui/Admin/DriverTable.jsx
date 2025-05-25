import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { CompanyCollection } from "/imports/api/CompanyCollection.js";

export const DriverTable = () => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("company");
    const company = useTracker(() => CompanyCollection.find({ company: user.profile.company }).fetch());


    if (isLoading()) {
        return <div>Loading...</div>;
    }

    const handleAdd = async (username) => {
        const tempDrivers  = company[0].drivers;
        const updatedDrivers = [...tempDrivers, username];
        const companyName = company[0].company;

        await Meteor.callAsync("company.updateDriver", companyName, updatedDrivers );
    }

    const handleDelete = async (username) => {
        const tempDrivers  = company[0].drivers;
        const updatedDrivers = tempDrivers.filter((driver) => driver !== username);
        const companyName = company[0].company;

        await Meteor.callAsync("company.updateDriver", companyName, updatedDrivers );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Add Driver"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAdd(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {company[0].drivers.map((driver) => (
                        <tr key={driver}>
                            <td>{driver}</td>
                            <td> <Button onClick={() => handleDelete(driver)}>Delete Driver</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}