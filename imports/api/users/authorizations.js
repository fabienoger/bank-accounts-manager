Meteor.users.allow({
  insert: function (userId, doc) {
    return userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});
