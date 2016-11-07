import Accounts from './collection'

Accounts.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.createdBy = Meteor.userId();
  doc.lastUpdate = Date.now();
});
