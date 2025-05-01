import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { CarsCollection } from '/imports/api/CarsCollection.js';
import { UpdateCar } from '/imports/ui/Cars/UpdateCar2.jsx';
import { NewCarModal } from './NewCarModal2';
import { useFind, useSubscribe, useTracker } from 'meteor/react-meteor-data';


export const CarsTable = () => {
    const isLoading = useSubscribe("cars");
    const cars = useTracker(() => CarsCollection.find({}).fetch());

    const user = useTracker(() => Meteor.user());
    console.log(user);
    console.log(Roles.userIsInRole(user, 'admin'));
    console.log(Roles.getRolesForUser(user));

    return (
        <>
            {Roles.userIsInRole(user, 'Advisors') ? (
                <NewCarModal></NewCarModal>
            ) : null}

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Tag Number</th>
                        <th>ASM</th>
                        <th>Team</th>
                        <th>Vehicle</th>
                        <th>Color</th>
                        <th>VIN - Last 4</th>
                        <th>Status</th>
                        <th>Additional Notes</th>
                        <th>Porter</th>
                        <th>Username</th>
                        <th>Wash</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car._id}>
                            <td>{car.tagnum}</td>
                            <td>{car.asm}</td>
                            <td>{car.team}</td>
                            <td>{car.vehicle}</td>
                            <td>{car.color}</td>
                            <td>{car.vin}</td>
                            <td>{car.status}</td>
                            <td>{car.notes}</td>
                            <td>{car.porter}</td>
                            <td>{car.username}</td>
                            <td>{car.wash}</td>
                            <td>
                                <UpdateCar key={car._id} car={car} />
                            </td>
                        </tr>
                    )}


                </tbody>
            </Table>
        </>
    );
}