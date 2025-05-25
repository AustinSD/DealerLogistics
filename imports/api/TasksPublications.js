import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", () => {
  return TasksCollection.find();
});
Meteor.publish("tasksHistory", () => {
  return TasksCollection.find();
});