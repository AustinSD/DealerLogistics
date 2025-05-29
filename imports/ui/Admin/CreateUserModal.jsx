import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateUserForm } from './CreateUserForm';

export const CreateUserModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
        setShow(false);
        props.handleClose();
    };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Create User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUserForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}