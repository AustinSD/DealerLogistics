import { Meteor } from "meteor/meteor";
import { CarsCollection } from "./CarsCollection";

Meteor.methods({
  "cars.insert"(doc) {
    return CarsCollection.insertAsync(doc);
  },
});