import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection.js';
import { CompanyCollection } from '/imports/api/CompanyCollection.js';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';

export const UpdateCar = ({ car }) => {
  const [show, setShow] = useState(false);

  const tagRef = React.useRef();
  const asmRef = React.useRef();
  const teamRef = React.useRef();
  const vehicleRef = React.useRef();
  const colorRef = React.useRef();
  const vinRef = React.useRef();
  const statusRef = React.useRef();
  const porterRef = React.useRef();
  const washRef = React.useRef();
  const notesRef = React.useRef();

  const isLoading = useSubscribe("vehicles");
  const vehicleType = useTracker(() => VehiclesTypeCollection.find({}).fetch());

  const user = useTracker(() => Meteor.user());
  const IS_ADVISORS = Roles.userIsInRole(user, 'Advisors');

  const companyIsLoading = useSubscribe("company");
  const company = useTracker(() => CompanyCollection.findOne({ company: user.profile.company }));

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
      wash: washRef.current.value,
      notes: notesRef.current.value,
      updatetime: new Date()
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
            <FloatingLabel
              controlId="formTagNumber"
              label="Tag Number"
              className="mb-3"
            >
              <Form.Control
                type="string"
                ref={tagRef}
                defaultValue={car.tagnum}
                autoFocus
                size="sm"
                disabled={!IS_ADVISORS}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formASM"
              label="ASM"
              className="mb-3"
            >
              <Form.Control
                type="string"
                ref={asmRef}
                defaultValue={car.asm}
                size="sm"
                disabled={!IS_ADVISORS}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formTeam"
              label="Team"
              className="mb-3"
            >
              <Form.Select aria-label="Team"
                size="sm"
                ref={teamRef}
                defaultValue={car.team}
                disabled={!IS_ADVISORS}>
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
            <FloatingLabel
              controlId="formVehicle"
              label="Vehicle"
              className="mb-3"
            >
              <Form.Select size="sm"
                ref={vehicleRef}
                defaultValue={car.vehicle}
                disabled={!IS_ADVISORS}>
                <option></option>
                {vehicleType.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.vehicleType}>
                    {vehicle.vehicleType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="formColor"
              label="Color"
              className="mb-3"
            >
              <Form.Select
                size="sm"
                ref={colorRef}
                defaultValue={car.color}
                disabled={!IS_ADVISORS}>
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
            <FloatingLabel
              controlId="formVinNumber"
              label="Vin Number"
              className="mb-3"
            >
              <Form.Control
                type="string"
                ref={vinRef}
                defaultValue={car.vin}
                size="sm"
              />
            </FloatingLabel>
            <FloatingLabel controlId="formNotes" label="Notes" className="mb-3">
              <Form.Control
                required
                type="string"
                defaultValue={car.notes}
                as="textarea"
                rows={3}
                size="sm"
                ref={notesRef}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formStatus"
              label="Status"
              className="mb-3"
            >
              <FormSelect size="sm" ref={statusRef} defaultValue={car.status}>
                <option></option>
                <option value="Prep">Prep</option>
                <option value="Ready">Ready</option>
                <option value="Waiting">Waiting</option>
                <option value="Completed">Completed</option>
                <option value="Deleted">Deleted</option>
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel
              controlId="formPorter"
              label="Porter"
              className="mb-3"
            >
              <Form.Select
                aria-label="Porter"
                size="sm"
                ref={porterRef}
                defaultValue={car.porter}
              >
                <option></option>
                {company?.porters.map((porter) => (
                  <option key={porter} value={porter}>
                    {porter}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="formWash"
              label="Wash"
              className="mb-3"
            >
              <Form.Select size="sm" ref={washRef} required>
                <option></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In Progress">In Progress</option>
                <option value="Already Washed">Already Washed</option>
              </Form.Select>
            </FloatingLabel>
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