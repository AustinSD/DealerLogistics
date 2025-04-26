import { Meteor } from "meteor/meteor";
import { CarsCollection } from "./CarsCollection";

Meteor.publish("cars", () => {
  return CarsCollection.find();
});