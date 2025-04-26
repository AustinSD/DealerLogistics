import { Mongo } from "meteor/mongo";

export const CarsCollection = new Mongo.Collection("cars");

export const VehiclesTypeCollection = new Mongo.Collection("vehicles");
export const CarHistoryCollection = new Mongo.Collection("carhistory");