import {Mongo} from 'meteor/mongo';

export const ShuttleCollection = new Mongo.Collection("shuttle");
export const ShuttleHistoryCollection = new Mongo.Collection("shuttlehistory");