import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NewShuttleForm } from './NewShuttleForm';

export const NewShuttleModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        New Shuttle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Shuttle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewShuttleForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}