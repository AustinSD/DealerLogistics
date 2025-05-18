import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { CarsCollection, VehiclesTypeCollection } from '/imports/api/CarsCollection';
import { Roles } from "meteor/roles";

import '../imports/api/CarsPublications.js';
import '../imports/api/carsMethods.js';
import '../imports/api/UserPublications.js';
import '../imports/api/companyMethods.js';
import '../imports/api/CompanyPublications.js';
import './userMethods.js';

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
    wash: carInfo.wash,
    company: carInfo.company,
  });

  const insertVehicleType = (vehicleType) =>
  VehiclesTypeCollection.insertAsync({
    vehicleType: vehicleType
  });
  
  const SEED_USERNAME_1 = 'austin';
const SEED_PASSWORD_1 = 'password';

const SEED_USERNAME_2 = 'user';
const SEED_PASSWORD_2 = 'password';

const SEED_USERNAME_3 = 'advisor';
const SEED_PASSWORD_3 = 'password';

Meteor.startup(async () => {
  if ((await CarsCollection.find().countAsync()) === 0) {
    [
      { tagnum: '2222', asm: 'John', team: 'Silver', vehicle: 'Corolla', color: 'Black', vin: '3456', status: 'Prep', porter: 'Tim', username: 'user_john', wash: 'Yes', company: 'User Company' },
      { tagnum: '3333', asm: 'Matt', team: 'Silver', vehicle: 'Highlander', color: 'White', vin: '4321', status: 'Prep', porter: 'Tim', username: 'user_john', wash: 'Yes', company: 'User Company' },
      { tagnum: '4444', asm: 'John', team: 'Silver', vehicle: 'Solara', color: 'Blue', vin: '9856', status: 'Prep', porter: 'Tim', username: 'user_john', wash: 'Yes', company: 'AJ Company' },
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

  if (!(await Accounts.findUserByUsername(SEED_USERNAME_1))) {
    await Accounts.createUser({
      username: SEED_USERNAME_1,
      password: SEED_PASSWORD_2,
      email: SEED_USERNAME_1 + '@example.com',
    })
  }
  if (!(await Accounts.findUserByUsername(SEED_USERNAME_2))) {
    await Accounts.createUser({
      username: SEED_USERNAME_2,
      password: SEED_PASSWORD_2,
      email: SEED_USERNAME_2 + '@example.com',
    });
  }
  if (!(await Accounts.findUserByUsername(SEED_USERNAME_3))) {
    await Accounts.createUser({
      username: SEED_USERNAME_3,
      password: SEED_PASSWORD_3,
      email: SEED_USERNAME_3 + '@example.com',
    });
  }

  // Create base roles
  await Roles.createRoleAsync("Porters", { unlessExists: true });
  await Roles.createRoleAsync("Advisors", { unlessExists: true });
  await Roles.createRoleAsync("admin", { unlessExists: true });

  // Assign roles to users
  const user1 = await Accounts.findUserByUsername(SEED_USERNAME_1);
  await Roles.addUsersToRolesAsync(user1._id, ["admin", "Advisors"], { unlessExists: true });

  const user2 = await Accounts.findUserByUsername(SEED_USERNAME_3);
  await Roles.addUsersToRolesAsync(user2._id, ["Advisors"], { unlessExists: true });

});

