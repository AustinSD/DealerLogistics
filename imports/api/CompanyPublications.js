import { Meteor } from "meteor/meteor";
import { CompanyCollection } from "./CompanyCollection";

Meteor.publish("company", () => {
  return CompanyCollection.find();
});
Meteor.publish("companyUsers", (company) => {
  return Meteor.users.find({ profile: {company: company }});
});
