import React from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection.js';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';



export const NewCarModal = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async () => {

    await Meteor.callAsync("cars.insert", {
      tagnum: tagRef.current.value,
      asm: asmRef.current.value,
      team: teamRef.current.value,
      vehicle: vehicleRef.current.value,
      color: colorRef.current.value,
      vin: vinRef.current.value,
      status: statusRef.current.value,
      porter: porterRef.current.value,
      username: usernameRef.current.value,
      notes: notesRef.current.value,
      wash: washRef.current.value,
      timestamp: new Date()
    });

    handleClose();
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    setValidated(true);
    console.log("Form submitted");
    console.log(form);



    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Car
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            </FloatingLabel>
            <FloatingLabel
              controlId="formASM"
              label="ASM"
              className="mb-3"
            >
              <Form.Control
                required
                type="string"
                placeholder="ASM"
                size="sm"
                ref={asmRef}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formTeam" label="Team" className="mb-3">
              <Form.Select aria-label="Team" size="sm" ref={teamRef}>
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
            </FloatingLabel>
            <FloatingLabel controlId="formVehicle" label="Vehicle" className="mb-3">
              <Form.Select size="sm" ref={vehicleRef}>
                <option></option>
                {vehicleType.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.vehicleType}>
                    {vehicle.vehicleType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="formColor" label="Color" className="mb-3">
              <Form.Select size="sm" ref={colorRef}>
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
            </FloatingLabel>
            <FloatingLabel controlId="formVin" label="Vin" className="mb-3">
              <Form.Control
                required
                type="string"
                placeholder="VIN"
                size="sm"
                ref={vinRef}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formStatus" label="Status" className="mb-3">
              <FormSelect size="sm" ref={statusRef}>
                <option></option>
                <option value="Prep">Prep</option>
                <option value="Ready">Ready</option>
                <option value="Waiting">Waiting</option>
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel controlId="formNotes" label="Notes" className="mb-3">
              <Form.Control
                required
                type="string"
                placeholder="Notes"
                as="textarea"
                rows={3}
                size="sm"
                ref={notesRef}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formWash" label="Wash" className="mb-3">
              <Form.Select size="sm" ref={washRef}>
                <option></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In Progress">In Progress</option>
                <option value="Already Washed">Already Washed</option>
              </Form.Select>
            </FloatingLabel>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Car
          </Button>
          <Button type="submit">Submit form</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}