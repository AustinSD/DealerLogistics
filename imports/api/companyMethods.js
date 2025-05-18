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
  "company.getAllUsers"(company) {
    const users = Meteor.callAsync("getCompanyUsers", company);
    return users;
  },
  "company.updatePorter"(companyName, newPorters) {
    try {
      const result = CompanyCollection.updateAsync(
                  { company: companyName },
                  { $set: { porters: newPorters } }
              );
      return result;
    } catch (error) {
      throw new Meteor.Error("Error updating porters", error.message);
      return;
    }
  },
});