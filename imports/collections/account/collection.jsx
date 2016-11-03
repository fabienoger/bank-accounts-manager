const Account = new Mongo.Collection('account')

Account.allow({
  remove: () => {
    return true
  },
  insert: () => {
    return true
  },
})

export default Account
