import { Meteor } from "meteor/meteor";
import { CompanyCollection } from "./CompanyCollection";

Meteor.publish("company", () => {
  return CompanyCollection.find();
});
