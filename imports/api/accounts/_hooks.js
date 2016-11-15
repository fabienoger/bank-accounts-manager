import BankAccounts from './collection'

BankAccounts.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
  doc.updatedBy = userId;
  doc.lastUpdate = Date.now();
  doc.active = true;
});

BankAccounts.before.update((userId, doc, fieldNames, modifier) => {
  if (!modifier.$set) modifier.$set = {};
  modifier.$set.lastUpdate = Date.now();
  modifier.$set.updatedBy = userId;
});
