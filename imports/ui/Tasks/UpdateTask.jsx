import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { FormSelect } from 'react-bootstrap';

export const UpdateTask = ({ task, company }) => {
  const [show, setShow] = useState(false);

  const timeRef = React.useRef();
  const asmRef = React.useRef();
  const taskRef = React.useRef();
  const porterRef = React.useRef();
  const statusRef = React.useRef();
  const notesRef = React.useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isAdvisor = Roles.userIsInRole(Meteor.user(), 'Advisors') || Roles.userIsInRole(Meteor.user(), 'admin');
  
  const handleSave = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }

    if (statusRef.current.value === "Completed") {
      await Meteor.callAsync("tasks.remove", task._id, {
        time: timeRef.current.value,
        asm: asmRef.current.value,
        task: taskRef.current.value,
        porter: porterRef.current.value,
        status: statusRef.current.value,
        notes: notesRef.current.value,
      });
    } else {
      await Meteor.callAsync("tasks.update", task._id, {
        time: timeRef.current.value,
        asm: asmRef.current.value,
        task: taskRef.current.value,
        porter: porterRef.current.value,
        status: statusRef.current.value,
        notes: notesRef.current.value,
      });
    }
    
    handleClose();
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Shuttle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={false} onSubmit={handleSave}>
            <FloatingLabel controlId="floatingInput" label="Time" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Time"
                defaultValue={task.time}
                ref={timeRef}
                required
                {...(isAdvisor ? { disabled: false } : { disabled: true })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid time.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="ASM" className="mb-3">
              <Form.Control
                type="text"
                placeholder="ASM"
                defaultValue={task.asm}
                ref={asmRef}
                required
                {...(isAdvisor ? { disabled: false } : { disabled: true })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid ASM.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Task" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Task"
                defaultValue={task.task}
                ref={taskRef}
                required
                {...(isAdvisor ? { disabled: false } : { disabled: true })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Porter" className="mb-3">
              <Form.Select
                aria-label="Porter"
                size="sm"
                ref={porterRef}
                defaultValue={task.porter}
              >
                <option></option>
                {company?.porters.map((porter) => (
                  <option key={porter} value={porter}>
                    {porter}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Status" className="mb-3">
              <FormSelect
                defaultValue={task.status}
                ref={statusRef}
                required
              >
                <option value="Started">Started</option>
                <option value="Completed">Completed</option>
                <option value="Hold">Hold</option>
              </FormSelect>
              <Form.Control.Feedback type="invalid">
                Please provide a valid status.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Additional Notes" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Additional Notes"
                defaultValue={task.notes}
                ref={notesRef}
              />
            </FloatingLabel>

            <Button variant="info" type="submit">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
