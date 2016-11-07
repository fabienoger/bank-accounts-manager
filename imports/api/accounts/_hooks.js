import BankAccounts from './collection'

BankAccounts.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = Meteor.userId();
  doc.lastUpdate = Date.now();
  doc.active = true;
});
