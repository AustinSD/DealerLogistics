import { Meteor } from 'meteor/meteor';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection';

import '../imports/api/CarsPublications.js';
import '../imports/api/carsMethods.js';

const insertCar = (carInfo) =>
  CarsCollection.insertAsync({
    tagnum: carInfo.tagnum,
    asm: carInfo.asm,
    team: carInfo.team,
    vehicle: carInfo.vehicle,
    color: carInfo.color,
    vin: carInfo.vin,
    status: carInfo.status,
    porter: carInfo.porter,
    username: carInfo.username,
    wash: carInfo.wash
  });

  const insertVehicleType = (vehicleType) =>
  VehiclesTypeCollection.insertAsync({
    vehicleType: vehicleType
  });
  
Meteor.startup(async () => {
  if ((await CarsCollection.find().countAsync()) === 0) {
    [
      { tagnum: '2222', asm: 'John', team: 'Gold', vehicle: 'Camary', color: 'Black', vin: '3456', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes' },
      { tagnum: '3333', asm: 'Matt', team: 'Silver', vehicle: '4Runner', color: 'White', vin: '4321', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes' },
      { tagnum: '4444', asm: 'John', team: 'Gold', vehicle: 'Titan', color: 'Blue', vin: '9856', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes' },
    ].forEach(insertCar);
  }

  if ((await VehiclesTypeCollection.find().countAsync()) === 0) {
    [
      "Corolla",
      "Camry",
      "Avalon",
      "Yaris",
      "Sienna",
      "Tacoma",
      "Tundra",
      "RAV4",
      "Venza",
      "Highlander",
      "FJ Cruiser",
      "4Runner",
      "Sequoia",
      "Land Cruiser",
      "Prius",
      "Prius C",
      "Prius V",
      "Matrix",
      "Solara",
      "Celica",
      "Cressida",
      "Pickup",
      "Previa",
      "Tercel",
      "Echo",
      "Scion FR-S",
      "Scion tC",
      "Scion iQ",
      "Scion xB",
      "Scion xA",
      "Scion xD",
      "Scion FR-S",
      "Other"
    ].forEach(insertVehicleType);
  }
});

