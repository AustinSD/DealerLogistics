import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';


export const CarsTable = () => {
    const cars = [
        {_id: 1, tagnum: '2222', asm: 'John', team: 'Gold', vehicle: 'Camary', color: 'Black', vin: '3456', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
        {_id: 2, tagnum: '3333', asm: 'Matt', team: 'Silver', vehicle: '4Runner', color: 'White', vin: '4321', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
        {_id: 3, tagnum: '4444', asm: 'John', team: 'Gold', vehicle: 'Titan', color: 'Blue', vin: '9856', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
      ];
    return (
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
                    <th>Porter</th>
                    <th>Username</th>
                    <th>Wash</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                { cars.map(car => 
                <tr >
                <td>{ car.tagnum }</td>
                <td>{ car.asm }</td>
                <td>{ car.team }</td>
                <td>{ car.vehicle }</td>
                <td>{ car.color }</td>
                <td>{ car.vin }</td>
                <td>{ car.status }</td>
                <td>{ car.porter }</td>
                <td>{ car.username }</td>
                <td>{ car.wash }</td>
                <td>
                    <Button id="updateCar" variant="outline-light">Update Car</Button>
                </td>
            </tr>
                )}


            </tbody>
        </Table>
    );
}