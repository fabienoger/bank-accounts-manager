import Transactions from './collection'

Transactions.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
});

Transactions.after.update((userId, doc, fieldNames, modifier) => {
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
});
