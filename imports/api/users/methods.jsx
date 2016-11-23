import {Meteor}     from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  options.profile.categories = Modules.both.transactionsCategories;
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
Meteor.methods({
  updateUser: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing id or doc parameter !");
    }
    return Meteor.users.update({_id: id}, doc);
  },
  removeUser: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }
    return Meteor.users.update({_id: id}, {$set: {'profile.active': false}});
  },
  setPassword: (id, password) => {
    if (!id || !password) {
      throw new Meteor.Error("missing-param", "Missing id or password parameter !");
    }
    return Accounts.setPassword(id, password);
  },
  createNewUser: (userObject) => {
    if (!userObject) {
      throw new Meteor.Error("missing-param", "Missing userObject parameter !");
    }

    return Accounts.createUser(userObject);
  }
});
