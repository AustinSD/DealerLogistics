import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { FormSelect } from 'react-bootstrap';

export const UpdateShuttle = ({ shuttle, company }) => {    
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const timeRef = React.useRef();
    const customerNameRef = React.useRef();
    const phoneNumberRef = React.useRef();
    const addressRef = React.useRef();
    const driverRef = React.useRef();
    const notesRef = React.useRef();
    const statusRef = React.useRef();
    const timeOutRef = React.useRef();
    const timeInRef = React.useRef();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }
        setValidated(true);

        if (statusRef.current.value === "Completed") {
            await Meteor.callAsync("shuttle.remove", shuttle._id, {
                timeRequested: timeRef.current.value,
                customerName: customerNameRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                address: addressRef.current.value,
                driver: driverRef.current.value,
                notes: notesRef.current.value,
                status: statusRef.current.value,
                timeOut: timeOutRef.current.value,
                timeIn: timeInRef.current.value,
            });
        }
        else {
            await Meteor.callAsync("shuttle.update", shuttle._id, {
                timeRequested: timeRef.current.value,
                customerName: customerNameRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                address: addressRef.current.value,
                driver: driverRef.current.value,
                notes: notesRef.current.value,
                status: statusRef.current.value,
                timeOut: timeOutRef.current.value,
                timeIn: timeInRef.current.value,
            });
        }
        handleClose();
    };

    return (
        <>
            <Button variant="info" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Shuttle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSave}>
                        <FloatingLabel controlId="floatingInput" label="Time Requested" className="mb-3">
                            <Form.Control
                                type="datetime-local"
                                placeholder="Time Requested"
                                ref={timeRef}
                                defaultValue={shuttle.timeRequested}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid time.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Customer Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Customer Name"
                                ref={customerNameRef}
                                defaultValue={shuttle.customerName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid customer name.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                ref={phoneNumberRef}
                                defaultValue={shuttle.phoneNumber}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid phone number.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                ref={addressRef}
                                defaultValue={shuttle.address}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Driver" className="mb-3">
                            <Form.Select
                                aria-label="Driver"
                                ref={driverRef}
                                defaultValue={shuttle.driver}
                                required
                            >
                                <option value="">Select Driver</option>
                                {company?.drivers?.map((driver) => (
                                    <option key={driver} value={driver}>
                                        {driver}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid driver.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Notes" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Notes"
                                ref={notesRef}
                                defaultValue={shuttle.notes}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid notes.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Status" className="mb-3">
                            <FormSelect
                                ref={statusRef}
                                defaultValue={shuttle.status}
                                required
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="EnRoute">En Route</option>
                                <option value="Completed">Completed</option> 
                            </FormSelect>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid status.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="TimeOut" className="mb-3">
                            <Form.Control
                                type="time"
                                placeholder="TimeOut"
                                ref={timeOutRef}
                                defaultValue={shuttle.timeOut}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid TimeOut.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="TimeIn" className="mb-3">
                            <Form.Control
                                type="time"
                                placeholder="TimeIn"
                                ref={timeInRef}
                                defaultValue={shuttle.timeIn}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid TimeIn.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button type="submit" variant="info">
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}