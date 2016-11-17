Meteor.publish('users', () => {
  return Meteor.users.find({'profile.active': true}, {fields: {services: 0}})
})

Meteor.publish('allUsers', () => {
  return Meteor.users.find({}, {fields: {services: 0}})
})
