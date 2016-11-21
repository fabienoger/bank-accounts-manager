import {Meteor} from 'meteor/meteor'
import Transactions from './collection.jsx'

Meteor.methods({
  createTransaction: (name, value, category, checked, accountId) => {
    if (!name || !value || !accountId || !category) {
      throw new Meteor.Error("fields-required", "All fields are required !");
    }
    if (isNaN(value) || value < 0) {
      throw new Meteor.Error("value-is-nan-or-negative", "Value must be a positive number !");
    }
    const foundAccount = BankAccounts.findOne({_id: accountId});
    if (!foundAccount) {
      throw new Meteor.Error("account-not-exists", "Account not exists !");
    }
    const doc = {
      $inc: {balance: - parseFloat(value)}
    };
    Meteor.call("updateAccount", foundAccount._id, doc, function(err, result) {
      if (err) {
        return console.error("updateAccount", err);
      }

      return Transactions.insert({
        name: name,
        value: parseFloat(value),
        category: category,
        checked: checked,
        accountId: accountId
      });
    });
  },
  deleteTransaction: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }

    return Transactions.update({_id: id}, {
      $set: {
        active: false
      }
    });
  },
  updateTransaction: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing parameter !");
    }
    if (doc.$set && doc.$set.value) {
      doc.$set.value = parseFloat(doc.$set.value);
    }
    return Transactions.update({_id: id}, doc);
  }
});
