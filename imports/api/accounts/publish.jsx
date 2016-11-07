import {Meteor} from 'meteor/meteor'

Meteor.publish('accounts', () => {
  return Accounts.find({});
});
