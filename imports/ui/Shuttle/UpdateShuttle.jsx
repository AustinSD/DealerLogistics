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
    const [companyAdvisors, setCompanyAdvisors] = useState([]);
    const timeRef = React.useRef();
    const asmRef = React.useRef();
    const customerNameRef = React.useRef();
    const phoneNumberRef = React.useRef();
    const addressRef = React.useRef();
    const driverRef = React.useRef();
    const notesRef = React.useRef();
    const statusRef = React.useRef();
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        timeRef.current.value = shuttle.timeRequested;
        asmRef.current.value = shuttle.asm;
        customerNameRef.current.value = shuttle.customerName;
        phoneNumberRef.current.value = shuttle.phoneNumber;
        addressRef.current.value = shuttle.address;
        driverRef.current.value = shuttle.driver;
        notesRef.current.value = shuttle.notes;
        statusRef.current.value = shuttle.status;
    }; 
    const handleSave = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }
        setValidated(true);
        await Meteor.callAsync("shuttle.update", shuttle._id, {
            timeRequested: timeRef.current.value,
            asm: asmRef.current.value,
            customerName: customerNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            address: addressRef.current.value,
            driver: driverRef.current.value,
            notes: notesRef.current.value,
            status: statusRef.current.value,
        });
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
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
                                type="text"
                                placeholder="Time Requested"
                                ref={timeRef}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid time.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="ASM" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="ASM"
                                ref={asmRef}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid ASM.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Customer Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Customer Name"
                                ref={customerNameRef}
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Driver" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Driver"
                                ref={driverRef}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid driver.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Notes" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Notes"
                                ref={notesRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid notes.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Status" className="mb-3">
                            <FormSelect
                                ref={statusRef}
                                required
                            >
                                <option value="Started">Started</option>
                                <option value="Completed">Completed</option>
                                <option value="Hold">Hold</option>
                            </FormSelect>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid status.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button type="submit" variant="primary">
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