Accounts = new Mongo.Collection('accounts')

Accounts.allow({
  remove: () => {
    return true
  },
  insert: () => {
    return true
  },
})

export default Accounts
