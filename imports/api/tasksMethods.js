import { Meteor } from 'meteor/meteor';
import { TasksCollection, TasksHistoryCollection } from './TasksCollection';

Meteor.methods({
    "tasks.insert"(taskData) {
        taskData.timestamp = new Date();
        TasksCollection.insertAsync(taskData);
    },

    "tasks.update"(taskId, taskData) {
        taskData.updatetime = new Date();
        TasksCollection.updateAsync(taskId, { $set: taskData });
    },

    "tasks.remove"(taskId, taskData) {
        taskData.updatetime = new Date();
        TasksHistoryCollection.insertAsync(taskData);
        TasksCollection.removeAsync(taskId);
    }
});