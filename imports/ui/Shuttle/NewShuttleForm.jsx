import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';

export const NewShuttleForm = (props) => {
  const [validated, setValidated] = useState(false);

  const timeRef = React.useRef();
  const customerNameRef = React.useRef();
  const phoneNumberRef = React.useRef();
  const addressRef = React.useRef();
  const driverRef = React.useRef("");
  const notesRef = React.useRef("");
  const statusRef = React.useRef("");
  const directionRef = React.useRef();
  
  const user = useTracker(() => Meteor.user());

  const handleClose = () => {
    props.handleClose();
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    await Meteor.callAsync("shuttle.insert", {
      timeRequested: timeRef.current.value,
      customerName: customerNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: addressRef.current.value,
      driver: driverRef.current.value,
      notes: notesRef.current.value,
      status: statusRef.current.value,
      direction: directionRef.current.value,
      username: user.username,
      company: Meteor.user().profile.company,
    }).then(() => {
      handleClose();
    });
  };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Time Requested" className="mb-3">
                        <Form.Control
                            type="datetime-local"
                            placeholder="Time Requested"
                            ref={timeRef}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid time requested.
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
                    <FloatingLabel controlId='floatingInput' label='Direction' className='mb-3'>
                        <Form.Select aria-label="" ref={directionRef} required>
                            <option value="pickup">Pick Up</option>
                            <option value="dropoff">Drop Off</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid direction.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

            </Form>
        </>
    );
}