import React from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const UpdateCar = ({car}) => {
  const [show, setShow] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    } 

    await Meteor.callAsync("cars.update", car._id, {
      tagnum: tagRef.current.value,
      asm: asmRef.current.value,
      team: teamRef.current.value,
      vehicle: vehicleRef.current.value,
      color: colorRef.current.value,
      vin: vinRef.current.value,
      status: statusRef.current.value,
      porter: porterRef.current.value,
      username: usernameRef.current.value,
      wash: washRef.current.value
    });
    handleClose();
  };

  return (
    <>
      <Button id="updateCar" onClick={handleShow} variant="outline-light">Update Car</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formTagNum">
              <Form.Label column sm={3}>Tag Number</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={tagRef}
                defaultValue={car.tagnum}
                autoFocus
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formASM">
              <Form.Label column sm={3}>ASM</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={asmRef}
                defaultValue={car.asm}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTeam">
              <Form.Label column sm={3}>Team</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={teamRef}
                defaultValue={car.team}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formVehicle">
              <Form.Label column sm={3}>Vehicle</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={vehicleRef}
                defaultValue={car.vehicle}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formColor">
              <Form.Label column sm={3}>Color</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={colorRef}
                defaultValue={car.color}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formVIN">
              <Form.Label column sm={3}>VIN</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={vinRef}
                defaultValue={car.vin}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formStatus">
              <Form.Label column sm={3}>Status</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={statusRef}
                defaultValue={car.status}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPorter">
              <Form.Label column sm={3}>Porter</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={porterRef}
                defaultValue={car.porter}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formUsername">
              <Form.Label column sm={3}>Username</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={usernameRef}
                defaultValue={car.username}
                size="sm"
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formWash">
              <Form.Label column sm={3}>Wash</Form.Label>
              <Col sm={9}>
              <Form.Control
                type="string"
                ref={washRef}
                defaultValue={car.wash}
                size="sm"
              />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}