import {Meteor} from 'meteor/meteor'
import BankAccount from './collection.jsx'

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
    const foundAccount = BankAccounts.findOne({
      name: name,
      createdBy: Meteor.userId(),
      active: true
    });
    if (foundAccount) {
      throw new Meteor.Error("name-already-exists", "Name already exists !");
    }

    BankAccounts.insert({
      name: name,
      balance: balance
    });
  },
  deleteAccount: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }

    BankAccounts.update({_id: id}, {
      $set: {
        active: false
      }
    });
  },
  updateAccount: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing parameter !");
    }

    BankAccounts.update({_id: id}, doc);
  }
});
