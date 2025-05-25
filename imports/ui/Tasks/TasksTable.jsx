import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { TasksCollection } from '/imports/api/TasksCollection';
import { CompanyCollection } from '/imports/api/CompanyCollection.js';
import { UpdateTask } from './UpdateTask';
import { NewTaskModal } from './NewTaskModal';
import { useFind, useSubscribe, useTracker } from 'meteor/react-meteor-data';

export const TasksTable = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({ company: Meteor.user().profile.company }).fetch());

  const companyIsLoading = useSubscribe("company");
  const company = useTracker(() => CompanyCollection.findOne({ company: Meteor.user().profile.company }));

  const user = useTracker(() => Meteor.user());
  
  return (
    <>
    <h1>Tasks Management</h1>
    
    {Roles.userIsInRole(user, 'Advisors') || Roles.userIsInRole(user, 'admin') ? (
                    <NewTaskModal></NewTaskModal>
                ) : null}
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Time</th>
          <th>ASM</th>
          <th>Task</th>
          <th>Porter</th>
          <th>Status</th>
          <th>Additional Notes</th>
          <th>Username</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task._id}>
            <td>{task?.timestamp.toLocaleString()}</td>
            <td>{task?.time}</td>
            <td>{task?.asm}</td>
            <td>{task?.task}</td>
            <td>{task?.porter}</td>
            <td>{task?.status}</td>
            <td>{task?.notes}</td>
            <td>{task?.username}</td>
            <td>
              <UpdateTask key={task._id} task={task} company={company} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
    // <div>
    //   <h2>Shuttle Page</h2>
    //   <p>Welcome to the Shuttle page!</p>
    // </div>
  );
}
