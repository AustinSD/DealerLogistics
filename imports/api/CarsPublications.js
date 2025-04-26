import { Meteor } from "meteor/meteor";
import { CarsCollection, CarHistoryCollection, VehiclesTypeCollection } from "./CarsCollection";

Meteor.publish("cars", () => {
  return CarsCollection.find();
});
Meteor.publish("carhistory", () => {
  return CarHistoryCollection.find();
});
Meteor.publish("vehicles", () => {
  return VehiclesTypeCollection.find();
});