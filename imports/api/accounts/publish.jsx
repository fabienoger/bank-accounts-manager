import {Meteor} from 'meteor/meteor'

Meteor.publish('account', (userId, accountId) => {
  if (!userId || !accountId) {
    throw new Meteor.Error("missing-param", "Missing userId or accountId parameter !");
  }
  return BankAccounts.find({_id: accountId, createdBy: userId, active: true});
});

Meteor.publish('accounts', () => {
  return BankAccounts.find({active: true});
});

Meteor.publish('userAccounts', (userId) => {
  return BankAccounts.find({createdBy: userId, active: true});
});
