import {Meteor} from 'meteor/meteor'

Meteor.publish('accounts', () => {
  return BankAccounts.find({active: true});
});

Meteor.publish('userAccounts', (userId) => {
  return BankAccounts.find({createdBy: userId, active: true});
});
