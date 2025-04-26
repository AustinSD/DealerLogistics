import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CarsCollection } from '/imports/api/CarsCollection.js';


export const NewCarModal = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("Form submitted");
    console.log(form.tagnum.value);
  };
  const handleSave = async (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // event.preventDefault();
    // setValidated(true);

    // await Meteor.callAsync("tasks.insert", {
    //   tagnum: form.tagnum.value,
    //   asm: form.asm.value,
    //   team: form.team.value,
    //   vehicle: form.vehicle.value,
    //   color: form.color.value,
    //   vin: form.vin.value,
    //   status: form.status.value,
    //   porter: form.porter.value,
    //   username: form.username.value,
    //   wash: form.wash.value
    // });
    console.log("Save button clicked");
    console.log(Form);
    handleClose();
  };
  // const handleSave = () => {
  //   // Add your save logic here
  //   console.log("Save button clicked");
  //   handleClose();
  // };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Car
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" as={Row} controlId="formTagNum">
              <Form.Label>Tag Number</Form.Label>
              <Col sm="10">
              <Form.Control
                type="string"
                placeholder="Tag Number"
                autoFocus size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formASM">
              <Form.Label>ASM</Form.Label>
              <Form.Control
                type="string"
                placeholder="ASM"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="string"
                placeholder="Team"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formVehicle">
              <Form.Label>Vehicle</Form.Label>
              <Form.Control
                type="string"
                placeholder="Vehicle"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="string"
                placeholder="Color"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formVIN">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="string"
                placeholder="VIN"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="string"
                placeholder="Status"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formPorter">
              <Form.Label>Porter</Form.Label>
              <Form.Control
                type="string"
                placeholder="Porter"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="string"
                placeholder="Username"
                autoFocus size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="formWash">
              <Form.Label>Wash</Form.Label>
              <Form.Control
                type="string"
                placeholder="Wash"
                autoFocus size="sm"
              />
            </Form.Group>
          </Form>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(Form)}>
            Save Car
          </Button>
          <Button type="submit">Submit form</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}