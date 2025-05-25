import { Meteor } from 'meteor/meteor';
import { ShuttleCollection, ShuttleHistoryCollection } from './ShuttleCollection';

Meteor.methods({
    "shuttle.insert"(shuttleData) {
        shuttleData.timestamp = new Date();
        ShuttleCollection.insertAsync(shuttleData);
    },

    "shuttle.update"(shuttleId, shuttleData) {
        shuttleData.updatetime = new Date();
        ShuttleCollection.updateAsync(shuttleId, { $set: shuttleData });
    },

    "shuttle.remove"(shuttleId, shuttleData) {
        shuttleData.updatetime = new Date();
        ShuttleHistoryCollection.insertAsync(shuttleData);
        ShuttleCollection.removeAsync(shuttleId);
    }
});