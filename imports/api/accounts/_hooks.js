import BankAccounts from './collection'

BankAccounts.before.insert((userId, doc) => {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = new Date();
  doc.active = true;
});

BankAccounts.before.update((userId, doc, fieldNames, modifier) => {
  if (!modifier.$set) modifier.$set = {};
  // If Account is set to inactive set all AccountTransactions to inactive
  if (modifier.$set.active == false) {
    const transactions = Transactions.find({accountId: doc._id}).fetch();
    _.each(transactions, (t) => {
      if (t) {
        Meteor.call("deleteTransaction", t._id, (err) => {
          if (err) {
            return console.error("deleteTransaction ", err);
          }
        });
      }
    });
  }
  modifier.$set.lastUpdate = new Date();
  modifier.$set.updatedBy = userId;

});
