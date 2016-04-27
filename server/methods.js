Meteor.methods({
  'addSession': (session) => {
  	let record = {
  	  ts: moment().format('YYYY-MM-DD'),
  	  user: Meteor.userId(),
  	  time: session
  	}
  	Sessions.insert(record)
  },
  'fillSessions': (session) => {
    let sessions = []
    let lastSession = Sessions.find({user: Meteor.userId()}, {sort: {ts: -1}, limit: 1}).fetch()
    if (lastSession.length < 1) return Meteor.call('addSession', session)
    let range = moment.range(lastSession[0].ts, moment().format('YYYY-MM-DD'))
    range.by('days', (day) => {
      sessions.push({
        ts: day.format('YYYY-MM-DD'),
        user: Meteor.userId(),
        time: 1
      })
    })
    if (sessions.length === 1) return Meteor.call('updateSession', lastSession[0]._id, lastSession[0].time + session)
    sessions = _.rest(sessions)
    if (sessions.length === 1) return Meteor.call('addSession', session)
    let record = sessions.pop()
    record.time = session
    Sessions.insert(record)
    _.each(sessions, (missedDay) => { Sessions.insert(missedDay) })
  },
  'updateSession': (id, session) => {
    Sessions.update(id, {$set: {time: session}})
  },
  'updateUser': (payload) => {
    return Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.name': payload.name,
        'emails.0.address': payload.email
      }
    })
  },
  'createMeetup': (date) => {
    let today = moment().format()
    if (!moment(date).isValid()) throw new Meteor.Error('Must be a valid date', date + ' is not valid')
    if (moment(date).isBefore(today)) throw new Meteor.Error('Dates can not be in the past', moment(date).format('DD MM YYYY') + ' is in the past')
    //TODO stop two meetups on the same day
    let meetupday = moment(date).format()
    Meetups.insert({
      meetupday: moment(date).format(),
      rsvps: {
        attending: [],
        apologies: []
      }
    })
  },
  'updateMeetup': (meetupId, op) => {
    let meetup = Meetups.findOne(meetupId)
    let user = Meteor.user()
    let _idname = user._id + '@' + user.profile.name
    let updateMeetup
    let updateUser

    if (op > 0) {//attending
      if (_.contains(meetup.rsvps.attending, _idname)) return
      updateMeetup = {
        $push: {'rsvps.attending': _idname},
        $pull: {'rsvps.apologies': _idname}
      }
      if (_.contains(user.profile.rsvps.attending, meetupId)) return
      updateUser = {
        $push: {'profile.rsvps.attending': meetupId},
        $pull: {'profile.rsvps.apologies': meetupId}
      }
    }
    if (op < 0) {//apologies
      if (_.contains(meetup.rsvps.apologies, _idname)) return
      updateMeetup = {
        $pull: {'rsvps.attending': _idname},
        $push: {'rsvps.apologies': _idname}
      }
      if (_.contains(user.profile.rsvps.apologies, meetupId)) return
      updateUser = {
        $pull: {'profile.rsvps.attending': meetupId},
        $push: {'profile.rsvps.apologies': meetupId}
      }   
    }
    Meetups.update(meetupId, updateMeetup)
    Meteor.users.update(user._id, updateUser)      
  },
  'editMeetup': (id, newDate) => {
    Meetups.update(id, {$set: {
      meetupday: newDate
    }})
  },
  'deleteMeetup': (id) => {
    Meetups.remove(id)
  },
  'resetRsvp': (meetupId) => {
    let user = Meteor.user()
    let _idname = user._id + '@' + user.profile.name
    Meetups.update( meetupId,{
      $pull: {
        'rsvps.attending': _idname,
        'rsvps.apologies': _idname
       }
    })
    Meteor.users.update( user._id, {
      $pull: {
        'profile.rsvps.attending': meetupId,
        'profile.rsvps.apologies': meetupId
       }
    })
  }
})
