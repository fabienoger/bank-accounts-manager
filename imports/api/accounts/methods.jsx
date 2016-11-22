import {Meteor} from 'meteor/meteor'
import BankAccount from './collection.jsx'

// Check if Account already exists with the param name
// If Account already exists return true
function accountAlreadyExists(name, id) {
  if (!name) {
    throw new Meteor.Error("missing-param", "Missing name parameter !");
  }
  let find = {
    name: name,
    active: true,
    createdBy: Meteor.userId()
  };
  let accountById = null;
  if (id) {
    accountById = BankAccount.findOne({_id: id});
    if (accountById) {
      find.createdBy = accountById.createdBy;
    }
  }
  const foundAccount = BankAccounts.findOne(find);
  if (foundAccount && foundAccount._id != id) {
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
    if (accountAlreadyExists(name, '')) {
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
      if (accountAlreadyExists(doc.$set.name, id)) {
        throw new Meteor.Error("name-already-exists", "Name already exists !");
      }
    }
    if (doc.$inc && doc.$inc.balance) {
      doc.$inc.balance = parseFloat(doc.$inc.balance);
    } else if (doc.$set && doc.$set.balance) {
      doc.$set.balance = parseFloat(doc.$set.balance);
    }
    return BankAccounts.update({_id: id}, doc);
  },
  // Check if sender Account can not be debited
  // Debit and credit accounts
  madeTransfer: (transfer) => {
    if (!transfer) {
      throw new Meteor.Error("missing-param", "The param 'transfer' is missing !");
    }
    if (!Modules.both.utils.checkIfTransferCanBeMade(transfer)) {
      throw new Meteor.Error("transfer-can-not-be-made", "The transfer can not be made !");
    }
    const fromAccountDoc = {
      $inc: {balance: - parseFloat(transfer.value)}
    };
    const toAccountDoc = {
      $inc: {balance: parseFloat(transfer.value)}
    };
    BankAccounts.update({_id: transfer.fromAccountId}, fromAccountDoc, (err, result) => {
      if (err) {
        return err;
      }
      return BankAccounts.update({_id: transfer.toAccountId}, toAccountDoc);
    });
  }
});
