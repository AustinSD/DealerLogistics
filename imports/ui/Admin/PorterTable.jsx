import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { CompanyCollection } from "/imports/api/CompanyCollection.js";

export const PorterTable = () => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("company");
    const company = useTracker(() => CompanyCollection.find({ company: user.profile.company }).fetch());


    if (isLoading()) {
        return <div>Loading...</div>;
    }

    const handleAdd = async (username) => {
        const tempPorters  = company[0].porters;
        const updatedPorters = [...tempPorters, username];
        const companyName = company[0].company;

        await Meteor.callAsync("company.updatePorter", companyName, updatedPorters );
    }

    const handleDelete = async (username) => {
        const tempPorters  = company[0].porters;
        const updatedPorters = tempPorters.filter((porter) => porter !== username);
        const companyName = company[0].company;

        await Meteor.callAsync("company.updatePorter", companyName, updatedPorters );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Add Porter"
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
                    {company[0].porters.map((porter) => (
                        <tr key={porter}>
                            <td>{porter}</td>
                            <td> <Button onClick={() => handleDelete(porter)}>Delete Porter</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}