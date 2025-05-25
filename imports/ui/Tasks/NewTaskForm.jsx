import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { TasksCollection } from '/imports/api/TasksCollection';
import { CompanyCollection } from '/imports/api/CompanyCollection.js';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { FormSelect } from 'react-bootstrap';

export const NewTaskForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [companyAdvisors, setCompanyAdvisors] = useState([]);
  const timeRef = React.useRef();
  const asmRef = React.useRef();
  const taskRef = React.useRef();
  const porterRef = React.useRef("");
  const statusRef = React.useRef("");
  const notesRef = React.useRef("");

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

    await Meteor.callAsync("tasks.insert", {
      time: timeRef.current.value,
      asm: asmRef.current.value,
      task: taskRef.current.value,
      porter: porterRef.current.value,
      status: statusRef.current.value,
      notes: notesRef.current.value,
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
  }
    , []);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Time" className="mb-3">
          <Form.Control type="text" placeholder="Time" ref={timeRef} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid time.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="ASM" className="mb-3">
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
        <FloatingLabel controlId="floatingInput" label="Task" className="mb-3">
          <Form.Control type="text" placeholder="Task" ref={taskRef} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid task.
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