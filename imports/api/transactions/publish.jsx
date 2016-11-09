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
