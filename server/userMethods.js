import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/roles";
import { CompanyCollection } from "/imports/api/CompanyCollection";

Meteor.methods({
    async addUserToAdmin(email, companyname) {
        const user = await Accounts.findUserByEmail(email);
        if (!user) {
          return false;
        }
        Roles.addUsersToRolesAsync(user._id, ["admin"]);
        Meteor.users.updateAsync({_id: user._id},{$set: {profile: {company: companyname}}});
        return true;
      },
      async getCompanyByName(company) {
        const result = await CompanyCollection.findOneAsync({ company: company });
        return result;
      },
      async removeUserFromCompany(userId, username, role) {
        const user = await Accounts.findUserByUsername(username);
        await Roles.removeUsersFromRolesAsync(user._id, role);
        const result = await Meteor.users.removeAsync({ _id: userId });
        return result;
      },
      async createUserForCompany(username, password, email, company, role) {
        const userId = await Accounts.createUser({
            username: username,
            password: password,
            email: email,
            profile: { company: company }
        });
        Roles.addUsersToRolesAsync(userId, [role]);
        return userId;
      },
      async createUserForCompanyAdvisor(username, password, email, company) {
        const userId = await Accounts.createUser({
            username: username,
            password: password,
            email: email,
            profile: { company: company }
        });
        Roles.addUsersToRolesAsync(userId, ["Advisors"]);
        return userId;
      },
      async createUserForCompanyAdmin(username, password, email, company) {
        const userId = await Accounts.createUserAsync({
            username: username,
            password: password,
            email: email,
            profile: { company: company }
        });
        Roles.addUsersToRolesAsync(userId, ["admin"]);
        return userId;
      },
      async createUserForCompanyPorter(username, password, email, company) {
        const userId = await Accounts.createUser({
            username: username,
            password: password,
            email: email,
            profile: { company: company }
        });
        Roles.addUsersToRolesAsync(userId, ["Porters"]);
        return userId;
      },
      async getCompanyUsers(company) {
        const users = await Meteor.users.find({ "profile.company": company }).fetch();
        const promises = users.map(async (user) => {
          user.role = await Roles.getRolesForUserAsync(user._id)
        });
        const results = await Promise.all(promises);
        return users;
      },
      async getCompanyAdvisors(company) {
        const advisors = [];
        const users = await Meteor.users.find({ "profile.company": company }).fetch();
        const promises = users.map(async (user) => {
          const role = await Roles.getRolesForUserAsync(user._id);
          if (role.includes("Advisors") || role.includes("admin")) {
            advisors.push(user);
          }
        });
        await Promise.all(promises);
        return advisors;
      },

  });

