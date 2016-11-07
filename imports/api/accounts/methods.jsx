import {Meteor} from 'meteor/meteor'
import Account from './collection.jsx'

Meteor.methods({
  createAccount: (name, balance) => {
    if (!name || !balance) {
      throw new Meteor.Error("fields-required", "All fields are required !");
    }
    if (isNaN(balance)) {
      throw new Meteor.Error("balance-is-nan", "Balance must be a number !");
    }
    if (!Meteor.userId()) {
      throw new Meteor.Error("user-required", "You must be connected !");
    }
    const foundAccount = Accounts.findOne({name: name, createdBy: Meteor.userId()});
    if (foundAccount) {
      throw new Meteor.Error("name-already-exists", "Name already exists !");
    }

    Accounts.insert({
      name: name,
      balance: balance
    });
  }
});
