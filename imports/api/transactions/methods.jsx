import {Meteor} from 'meteor/meteor'
import Transactions from './collection.jsx'

Meteor.methods({
  createTransaction: (name, value, accountId) => {
    if (!name || !value || !accountId) {
      throw new Meteor.Error("fields-required", "All fields are required !");
    }
    if (isNaN(value)) {
      throw new Meteor.Error("value-is-nan", "Value must be a number !");
    }
    const foundAccount = BankAccounts.findOne({_id: accountId});
    if (!foundAccount) {
      throw new Meteor.Error("account-not-exists", "Account not exists !");
    }
    const doc = {
      $inc: {balance: - parseInt(value)}
    };
    Meteor.call("updateAccount", foundAccount._id, doc, function(err, result) {
      if (err) {
        console.error("updateAccount", err);
      }

      return Transactions.insert({
        name: name,
        value: parseInt(value),
        accountId: accountId
      });
    });
  },
  deleteTransaction: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }

    Transactions.update({_id: id}, {
      $set: {
        active: false
      }
    });
  },
  updateTransaction: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing parameter !");
    }

    Transactions.update({_id: id}, doc);
  }
});
