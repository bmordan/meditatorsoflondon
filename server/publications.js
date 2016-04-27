Meteor.publish('sessions', function () {
  return Sessions.find({user: this.userId})
})
Meteor.publish('profile', function () {
  let query = {
    fields: {
      'services.google.email': 1,
      'services.google.name' : 1,
      'services.google.picture': 1,
      'services.facebook.name': 1,
      'services.facebook.email': 1,
      'emails': 1
    }
  }
  return Meteor.users.find({_id: this.userId}, query)
})
Meteor.publish('meetups', function () {
  return Meetups.find({ 'meetupday': {$gt: moment(new Date()).format() }}, {sort: {meetupday: 1}})
})
