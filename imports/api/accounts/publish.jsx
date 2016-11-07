import {Meteor} from 'meteor/meteor'

Meteor.publish('accounts', () => {
  return Accounts.find({});
});

Meteor.publish('userAccounts', (userId) => {
  return Accounts.find({createdBy: userId});
});
