import { Meteor } from "meteor/meteor";
import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection.js';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';

export const CreateCompanyForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const companyRef = React.useRef();
  const addressRef = React.useRef();
  const phoneRef = React.useRef();
  const navigate = useNavigate();

  const handleClose = (event) => {
    event.preventDefault();
    this.props.callbackModal();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity()) {
      console.log("Company Name: ", companyRef.current.value);
      console.log("Address: ", addressRef.current.value);
      console.log("Phone: ", phoneRef.current.value);
      await Meteor.callAsync("company.insert", {
        company: companyRef.current.value,
        address: addressRef.current.value,
        phone: phoneRef.current.value,
        admin: Meteor.user().emails[0].address,
        timestamp: new Date(),
        porters: [],
        drivers: []
      }).then(async () => {
        console.log("Company added successfully");
        navigate('/admin');
        //handleClose();
      });
    } else {
      console.log("Form is not valid");
      return;
    }

    
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <FloatingLabel
              controlId="formCompanyName"
              label="Company Number"
              className="mb-3"
            >
              <Form.Control
                required
                type="string"
                placeholder="Company Name"
                autoFocus
                size="sm"
                ref={companyRef}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                required
                type="string"
                placeholder="Address"
                size="sm"
                ref={addressRef}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                required
                type="tel"
                placeholder="Phone"
                size="sm"
                ref={phoneRef}
              />
            </FloatingLabel>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Submit form</Button>
          </Form>
  );
};