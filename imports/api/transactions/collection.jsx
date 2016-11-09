Transactions = new Mongo.Collection('transactions')

if (Meteor.isServer) {
  //Transactions._ensureIndex({name: 1}, {unique: 1});

  Transactions.allow({
    remove: () => {
      return true
    },
    insert: () => {
      return true
    },
  })
}

export default Transactions
