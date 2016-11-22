import {Meteor} from 'meteor/meteor'

Meteor.publish('transfers', () => {
  return Transfers.find({active: true});
});

Meteor.publish('allTransfers', () => {
  return Transfers.find({});
});

Meteor.publish('userTransfers', (userId) => {
  if (!userId) {
    throw new Meteor.Error("missing-param", "Missing userId parameter !");
  }
  return Transfers.find({active: true, createdBy: userId});
});
