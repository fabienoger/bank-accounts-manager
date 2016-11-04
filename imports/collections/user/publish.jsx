Meteor.publish('users', () => {
  return Meteor.users.find({}, {fields: {services: 0}})
})
