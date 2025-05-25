import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ShuttleCollection } from "/imports/api/ShuttleCollection.js";
import { CompanyCollection } from "/imports/api/CompanyCollection.js";
import { UpdateShuttle } from "./UpdateShuttle";
import { NewShuttleModal } from "./NewShuttleModal";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";

export const ShuttleTable = ({ direction }) => {
    const ready = useSubscribe("shuttle");
    const companyReady = useSubscribe("company");

    const shuttles = useTracker(() => {
        if (ready) {
            return ShuttleCollection.find({ company: Meteor.user().profile.company, direction: direction }).fetch();
        }
        return [];
    });

    const company = useTracker(() => CompanyCollection.find({ company: Meteor.user().profile.company }).fetch());
    const user = useTracker(() => Meteor.user());

    return (
        <>
            {Roles.userIsInRole(user, 'Advisors') || Roles.userIsInRole(user, 'admin') ? (
                <NewShuttleModal></NewShuttleModal>
            ) : null}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Time Requested</th>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Driver</th>
                        <th>Notes</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Time Out</th>
                        <th>Time In</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {shuttles.map(shuttle => (
                        <tr key={shuttle._id}>
                            <td>{shuttle?.timestamp.toLocaleString()}</td>
                            <td>{shuttle?.timeRequested}</td>
                            <td>{shuttle?.customerName}</td>
                            <td>{shuttle?.phoneNumber}</td>
                            <td>{shuttle?.address}</td>
                            <td>{shuttle?.driver}</td>
                            <td>{shuttle?.notes}</td>
                            <td>{shuttle?.username}</td>
                            <td>{shuttle?.status}</td>
                            <td>{shuttle?.timeOut}</td>
                            <td>{shuttle?.timeIn}</td>
                            <td>
                                <UpdateShuttle key={shuttle._id} shuttle={shuttle} company={company[0]} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    );
};
