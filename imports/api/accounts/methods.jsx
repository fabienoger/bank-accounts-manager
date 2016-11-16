import {Meteor} from 'meteor/meteor'
import BankAccount from './collection.jsx'

// Check if Account already exists with the param name
// If Account already exists return true
function accountAlreadyExists(name) {
  if (!name) {
    throw new Meteor.Error("missing-param", "Missing name parameter !");
  }
  const foundAccount = BankAccounts.findOne({
    name: name,
    createdBy: Meteor.userId(),
    active: true
  });
  if (foundAccount) {
    return true;
  }
  return false;
}

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
    // Check if Account name exists
    if (accountAlreadyExists(name)) {
      throw new Meteor.Error("name-already-exists", "Name already exists !");
    }

    return BankAccounts.insert({
      name: name,
      balance: parseFloat(balance)
    });
  },
  deleteAccount: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }

    return BankAccounts.update({_id: id}, {
      $set: {
        active: false
      }
    });
  },
  updateAccount: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing parameter !");
    }
    // Check if Account name exists
    if (doc.$set && doc.$set.name) {
      if (accountAlreadyExists(doc.$set.name)) {
        throw new Meteor.Error("name-already-exists", "Name already exists !");
      }
    }
    if (doc.$inc && doc.$inc.balance) {
      doc.$inc.balance = parseFloat(doc.$inc.balance);
    } else if (doc.$set && doc.$set.balance) {
      doc.$set.balance = parseFloat(doc.$set.balance);
    }
    return BankAccounts.update({_id: id}, doc);
  }
});
