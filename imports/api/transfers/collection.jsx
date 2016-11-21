Transfers = new Mongo.Collection('transfers')

if (Meteor.isServer) {
  Transfers.allow({
    remove: () => {
      return true
    },
    insert: () => {
      return true
    },
  })
}

export default Transfers
