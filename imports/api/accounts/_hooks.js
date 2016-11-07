import BankAccounts from './collection'

BankAccounts.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
});

BankAccounts.after.update((userId, doc, fieldNames, modifier) => {
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
});
