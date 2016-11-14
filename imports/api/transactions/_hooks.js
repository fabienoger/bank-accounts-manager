import Transactions from './collection'

Transactions.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
});

Transactions.before.update((userId, doc, fieldNames, modifier) => {
  // Check if active is set to false
  if ((_.contains(fieldNames, "active") && modifier.$set.active == false) || _.contains(fieldNames, "value")) {
    let value = doc.value;
    if (_.contains(fieldNames, "value")) {
      value = doc.value - modifier.$set.value
    }

    // Update Account balance
    const accountDoc = {
      $inc: {balance: parseFloat(value)}
    };
    Meteor.call("updateAccount", doc.accountId, accountDoc, function(err, result) {
      if (err) {
        return console.error("updateAccount", error);
      }
    });
  }

  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
});
