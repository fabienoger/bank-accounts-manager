Meteor.publish('users', () => {
  return Meteor.users.find({'profile.active': true}, {fields: {services: 0}})
})

Meteor.publish('user', (userId) => {
  return Meteor.users.find({_id: userId}, {fields: {services: 0}})
})

Meteor.publish('allUsers', () => {
  return Meteor.users.find({}, {fields: {services: 0}})
})
