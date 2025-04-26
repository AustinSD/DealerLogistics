import { Meteor } from 'meteor/meteor';
import { CarsCollection } from '/imports/api/CarsCollection'; 

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

Meteor.startup(async () => {
  if ((await CarsCollection.find().countAsync()) === 0) {
    [
      { tagnum: '2222', asm: 'John', team: 'Gold', vehicle: 'Camary', color: 'Black', vin: '3456', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
      { tagnum: '3333', asm: 'Matt', team: 'Silver', vehicle: '4Runner', color: 'White', vin: '4321', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
      { tagnum: '4444', asm: 'John', team: 'Gold', vehicle: 'Titan', color: 'Blue', vin: '9856', status: 'done', porter: 'Tim', username: 'user_john', wash: 'Yes'},
    ].forEach(insertCar);
  }

});
