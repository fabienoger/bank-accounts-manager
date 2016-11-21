import Transfers from './collection'

Transfers.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
  const accountDoc = {
    $inc: {balance: - parseFloat(value)}
  };
  console.log("doc ", doc);
  return;
  Meteor.call("updateAccount", foundAccount._id, accountDoc, function(err, result) {
    if (err) {
      return console.error("updateAccount", err);
    }
  });

});

Transfers.before.update((userId, doc, fieldNames, modifier) => {
  // Check if active is set to false
  if ((_.contains(fieldNames, "active") && modifier.$set && modifier.$set.active == false) || _.contains(fieldNames, "value")) {
    let value = doc.value;
    if (_.contains(fieldNames, "value")) {
      value = doc.value - modifier.$set.value
    }
  }
/*
    // Update Account balance
    const accountDoc = {
      $inc: {balance: parseFloat(value)}
    };
    Meteor.call("updateAccount", doc.accountId, accountDoc, function(err, result) {
      if (err) {
        return console.error("updateAccount", err);
      }
    });
  }
  */

  if (!modifier.$set) modifier.$set = {};
  modifier.$set.lastUpdate = Date.now();
  modifier.$set.updatedBy = userId;
});