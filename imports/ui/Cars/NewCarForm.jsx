import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection.js';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';



export const NewCarForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [companyAdvisors, setCompanyAdvisors] = useState([]);
  const tagRef = React.useRef();
  const asmRef = React.useRef();
  const teamRef = React.useRef();
  const vehicleRef = React.useRef();
  const colorRef = React.useRef();
  const vinRef = React.useRef();
  const statusRef = React.useRef();
  const porterRef = React.useRef();
  const usernameRef = React.useRef();
  const washRef = React.useRef();
  const notesRef = React.useRef();

  const isLoading = useSubscribe("vehicles");
  const vehicleType = useTracker(() => VehiclesTypeCollection.find({}).fetch());
  const user = useTracker(() => Meteor.user());


  const handleClose = () => {
    props.handleClose();
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    await Meteor.callAsync("cars.insert", {
      tagnum: tagRef.current.value,
      asm: asmRef.current.value,
      team: teamRef.current.value,
      vehicle: vehicleRef.current.value,
      color: colorRef.current.value,
      vin: vinRef.current.value,
      status: statusRef.current.value,
      username: user.username,
      notes: notesRef.current.value,
      wash: washRef.current.value,
      company: Meteor.user().profile.company,
      timestamp: new Date()
    }).then(() => {
      console.log("Car added successfully");
      handleClose();
    });

  };

  const fetchAdvisors = async () => {
    const users = await Meteor.callAsync("getCompanyAdvisors", user.profile.company);
    setCompanyAdvisors(users);
  };

  useEffect(() => {
    fetchAdvisors();
  }
    , []);

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <FloatingLabel
          controlId="formTagNumber"
          label="Tag Number"
          className="mb-3"
        >
          <Form.Control
            required
            type="string"
            placeholder="Tag Number"
            autoFocus
            size="sm"
            ref={tagRef}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid tag number.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formASM" label="ASM" className="mb-3">
          <Form.Select aria-label="ASM" size="sm" ref={asmRef} required>
            <option></option>
            {companyAdvisors.map((advisor) => (
              <option key={advisor._id} value={advisor.username}>
                {advisor.username}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid ASM.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formTeam" label="Team" className="mb-3">
          <Form.Select aria-label="Team" size="sm" ref={teamRef} required>
            <option></option>
            <option value="TXM">TXM</option>
            <option value="Silver">Silver</option>
            <option value="Yellow">Yellow</option>
            <option value="Brown">Brown</option>
            <option value="Gold">Gold</option>
            <option value="Purple">Purple</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Detail">Detail</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid team.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formVehicle" label="Vehicle" className="mb-3">
          <Form.Select size="sm" ref={vehicleRef} required>
            <option></option>
            {vehicleType.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.vehicleType}>
                {vehicle.vehicleType}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid vehicle.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formColor" label="Color" className="mb-3">
          <Form.Select size="sm" ref={colorRef} required>
            <option></option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Light Blue">Light Blue</option>
            <option value="Silver">Silver</option>
            <option value="Grey">Grey</option>
            <option value="Red">Red</option>
            <option value="Burgandy">Burgandy</option>
            <option value="Green">Green</option>
            <option value="Mint Green">Mint Green</option>
            <option value="Brown">Brown</option>
            <option value="Beige">Beige</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Beige">Beige</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid color.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formVin" label="Vin" className="mb-3">
          <Form.Control
            required
            type="string"
            placeholder="VIN"
            size="sm"
            ref={vinRef}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid VIN.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formStatus" label="Status" className="mb-3">
          <FormSelect size="sm" ref={statusRef} required>
            <option></option>
            <option value="Prep">Prep</option>
            <option value="Ready">Ready</option>
            <option value="Waiting">Waiting</option>
          </FormSelect>
          <Form.Control.Feedback type="invalid">
            Please provide a valid status.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formNotes" label="Notes" className="mb-3">
          <Form.Control
            type="string"
            placeholder="Notes"
            as="textarea"
            rows={3}
            size="sm"
            ref={notesRef}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid notes.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="formWash" label="Wash" className="mb-3">
          <Form.Select size="sm" ref={washRef} required>
            <option></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="In Progress">In Progress</option>
            <option value="Already Washed">Already Washed</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid wash.
          </Form.Control.Feedback>
        </FloatingLabel>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Submit form</Button>
        </div>
      </Form>
    </>
  );
}