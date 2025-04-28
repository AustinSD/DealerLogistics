import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Roles } from "meteor/roles";

// Publish user's own roles
Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor.roleAssignment.find({ "user._id": this.userId });
    }
    this.ready();
  });