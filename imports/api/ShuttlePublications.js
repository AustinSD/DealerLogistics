import { Mongo } from 'meteor/mongo';
import { ShuttleCollection, ShuttleHistoryCollection } from './ShuttleCollection';

Meteor.publish("shuttle", () => {
    return ShuttleCollection.find();
}
);
Meteor.publish("shuttleHistory", () => {
    return ShuttleHistoryCollection.find();
}
);