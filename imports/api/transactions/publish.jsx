import {Meteor} from 'meteor/meteor'

Meteor.publish('transactions', () => {
  return Transactions.find({active: true});
});

Meteor.publish('accountTransactions', (accountId) => {
  if (!accountId) {
    throw new Meteor.Error("missing-param", "Missing accountId parameter !");
  }
  return Transactions.find({active: true, accountId: accountId});
});

Meteor.publish('userTransactions', (userId) => {
  if (!userId) {
    throw new Meteor.Error("missing-param", "Missing userId parameter !");
  }
  return Transactions.find({active: true, createdBy: userId});
});
