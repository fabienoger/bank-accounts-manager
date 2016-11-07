BankAccounts = new Mongo.Collection('accounts')

if (Meteor.isServer) {
  //BankAccounts._ensureIndex({name: 1}, {unique: 1});

  BankAccounts.allow({
    remove: () => {
      return true
    },
    insert: () => {
      return true
    },
  })
}

export default BankAccounts
