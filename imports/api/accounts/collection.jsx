Accounts = new Mongo.Collection('accounts')

if (Meteor.isServer) {
  //Accounts._ensureIndex({name: 1}, {unique: 1});

  Accounts.allow({
    remove: () => {
      return true
    },
    insert: () => {
      return true
    },
  })
}

export default Accounts
