import { Meteor } from "meteor/meteor";
import { CarsCollection, CarHistoryCollection } from "./CarsCollection";

Meteor.methods({
  "cars.insert"(doc) {
    if (!doc.tagnum) {
      throw new Meteor.Error("Tag number is required");
    }
    if (!doc.asm) {
      throw new Meteor.Error("ASM is required");
    }
    if (!doc.vehicle) {
      throw new Meteor.Error("Vehicle is required");
    }
    return CarsCollection.insertAsync(doc);
  },
  "cars.remove"(carId) {
    return CarsCollection.removeAsync(carId);
  },
  "cars.update"(carId, doc) {
    if(doc.status === "Completed" || doc.status === "Deleted") {
      CarHistoryCollection.insertAsync(doc);
      CarsCollection.removeAsync(carId);
      return;
    }
    return CarsCollection.updateAsync(carId, { $set: doc });
  },
  "cars.findOne"(carId) {
    return CarsCollection.findOneAsync(carId);
  },
});