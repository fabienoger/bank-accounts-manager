import Transfers from './collection'

Transfers.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
  Meteor.call("madeTransfer", doc, (err, result) => {
    if (err) {
      return console.error("madeTransfer ", err);
    }
  });
});

Transfers.before.update((userId, doc, fieldNames, modifier) => {
  // Check if active is set to false
  if ((_.contains(fieldNames, "active") && modifier.$set && modifier.$set.active == false) || _.contains(fieldNames, "value")) {
    let value = doc.value;
    if (_.contains(fieldNames, "value")) {
      value = doc.value - modifier.$set.value
      // Update accounts with the difference value
      let transfer = doc;
      transfer.value = - value;
      Meteor.call("madeTransfer", transfer, (err, result) => {
        if (err) {
          return console.error("madeTransfer ", err);
        }
      });
    }
  }

  if (!modifier.$set) modifier.$set = {};
  modifier.$set.lastUpdate = Date.now();
  modifier.$set.updatedBy = userId;
});
