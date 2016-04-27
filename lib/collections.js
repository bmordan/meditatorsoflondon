Sessions = new Mongo.Collection('sessions')

Sessions.after.update((userId) => siddhis(userId))
Sessions.after.insert((userId) => siddhis(userId))

const siddhis = (userId) => {
  let sessions = Sessions.find({user: userId}).fetch()
  let siddhi = Meteor.users.findOne(userId).profile.siddhis
  if (siddhi.complete) return

  let twentyMinutes   = _.some(sessions, (session) => session.time >= 1200)
  let oneHour         = _.some(sessions, (session) => session.time >= 3600)
  let oneHundredHours = (Helpers.getTotalSeconds(sessions) >= 360000)
  let fiveDays        = (Helpers.getConsecutiveDays(sessions) >= 5)
  let tenDays         = (Helpers.getConsecutiveDays(sessions) >= 10)
  let thirtySessions  = (Helpers.getTotalSessions(sessions) >= 30)
  let fiftySessions   = (Helpers.getTotalSessions(sessions) >= 50)
  let complete        = _.chain(siddhi).toArray().initial().every((s) => (s)).value()

  if (!siddhi.twentyMinutes   && twentyMinutes)   siddhi.twentyMinutes   = !siddhi.twentyMinutes
  if (!siddhi.oneHour         && oneHour)         siddhi.oneHour         = !siddhi.oneHour
  if (!siddhi.fiveDays        && fiveDays)        siddhi.fiveDays        = !siddhi.fiveDays
  if (!siddhi.tenDays         && tenDays)         siddhi.tenDays         = !siddhi.tenDays
  if (!siddhi.thirtySessions  && thirtySessions)  siddhi.thirtySessions  = !siddhi.thirtySessions
  if (!siddhi.fiftySessions   && fiftySessions)   siddhi.fiftySessions   = !siddhi.fiftySessions
  if (!siddhi.oneHundredHours && oneHundredHours) siddhi.oneHundredHours = !siddhi.oneHundredHours
  if (!siddhi.complete        && complete)        siddhi.complete        = !siddhi.complete

  Meteor.users.update({_id: userId}, {$set: { 'profile.siddhis': siddhi }})
}

Meetups = new Mongo.Collection('meetups')
