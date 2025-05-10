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
      }
  });

