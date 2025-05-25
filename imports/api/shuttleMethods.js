import { Meteor } from 'meteor/meteor';
import { ShuttleCollection, ShuttleHistoryCollection } from './ShuttleCollection';

Meteor.methods({
    "shuttle.insert"(shuttleData) {
        if (!shuttleData.customerName) {
            throw new Meteor.Error("Customer name is required");
        }
        if (!shuttleData.phoneNumber) {
            throw new Meteor.Error("Phone number is required");
        }
        if (!shuttleData.address) {
            throw new Meteor.Error("Address is required");
        }
        
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