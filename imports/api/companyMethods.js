import { Meteor } from "meteor/meteor";
import { CompanyCollection } from "./CompanyCollection";

Meteor.methods({
  "company.insert"(doc) {
    if (!doc.company) {
      throw new Meteor.Error("Company name is required");
    }

    try {
      const data = Meteor.callAsync("addUserToAdmin", doc.admin, doc.company); 
    } catch (error) {
      throw new Meteor.Error("Error adding user to admin role");
      return;
    }

    return CompanyCollection.insertAsync(doc);
  },
  "company.findOne"(carId) {
    return CompanyCollection.findOneAsync(carId);
  },
  "company.findEmail"(email) {
    return CompanyCollection.findOneAsync({ email });
  },
  "company.findCompany"(company) {
    try {
      const result = Meteor.callAsync("getCompanyByName", company);
      return result;
    } catch (error) {
      throw new Meteor.Error("Company not found");
      return;
    }
  },
});