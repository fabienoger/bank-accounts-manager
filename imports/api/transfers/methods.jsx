import {Meteor} from 'meteor/meteor'
import Transfers from './collection.jsx'

Meteor.methods({
  createTransfer: (name, value, checked, fromAccountId, toAccountId) => {
    if (!name || !value || !fromAccountId || !toAccountId) {
      throw new Meteor.Error("fields-required", "All fields are required !");
    }
    if (isNaN(value) || value < 0) {
      throw new Meteor.Error("value-is-nan-or-negative", "Value must be a positive number !");
    }
    return Transfers.insert({
      name: name,
      value: parseFloat(value),
      checked: checked,
      fromAccountId: fromAccountId,
      toAccountId: toAccountId
    });
  },
  deleteTransfer: (id) => {
    if (!id) {
      throw new Meteor.Error("missing-param", "Missing id parameter !");
    }

    return Transfers.update({_id: id}, {
      $set: {
        active: false
      }
    });
  },
  updateTransfer: (id, doc) => {
    if (!id || !doc) {
      throw new Meteor.Error("missing-param", "Missing parameter !");
    }
    if (doc.$set && doc.$set.value) {
      doc.$set.value = parseFloat(doc.$set.value);
    }
    return Transfers.update({_id: id}, doc);
  }
});
