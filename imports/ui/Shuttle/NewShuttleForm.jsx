import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ShuttleCollection } from '/imports/api/ShuttleCollection.js';
import { CompanyCollection } from '/imports/api/CompanyCollection';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';

export const NewShuttleForm = (props) => {
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
  const user = useTracker(() => Meteor.user());
  const companyIsLoading = useSubscribe("company");
  const company = useTracker(() => CompanyCollection.findOne({ company: user.profile.company }));

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
      asm: asmRef.current.value,
      customerName: customerNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: addressRef.current.value,
      driver: driverRef.current.value,
      notes: notesRef.current.value,
      status: statusRef.current.value,
      username: user.username,
      company: Meteor.user().profile.company,
    }).then(() => {
      handleClose();
    });
  };
    const fetchAdvisors = async () => {
        const users = await Meteor.callAsync("getCompanyAdvisors", user.profile.company);
        setCompanyAdvisors(users);
    };
    useEffect(() => {
        fetchAdvisors();
    }, []);
    const handleChange = (event) => {
        setCompanyAdvisors(event.target.value);
    };
    const handleSelect = (event) => {
        setCompanyAdvisors(event.target.value);
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
                        <Form.Select aria-label="" ref={driverRef} required>
                            {companyAdvisors.map((advisor) => (
                                <option key={advisor._id} value={advisor.username}>
                                    {
                                        advisor.username
                                    }
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
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid notes.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Status" className="mb-3">
                        <Form.Select aria-label="" ref={statusRef} required>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid status.
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