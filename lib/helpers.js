Helpers = {
  zeroify: (val) => {
    val = val.toString()
    if (val.length < 2) val = '0' + val 
    return val 
  },
  formatSeconds: (seconds) => {
    let h = Math.floor(seconds / 3600)
    let mm = Math.floor(seconds % 3600 / 60)
    let ss = Math.floor(seconds % 3600 % 60)
    if (h === 0) return `${mm}mins`
    return `${h}h ${mm}mins`
  },
  getConsecutiveDays: (sessions) => {
    let days
    let consecutiveDays = _.chain(sessions).map((session) => {
        parseInt(session.time) > 1 ? days = 1 : days = 0
        return days
      }).value().join('').split(0)
    return _.sortBy(consecutiveDays, 'length').pop().length
  },
  getTotalSeconds: (sessions) => {
    return _.reduce(sessions, function (t, n) {
      if (n.time > 1) return t += n.time
      return t
    }, 0)
  },
  getTotalSessions: (sessions) => {
    return _.reduce(sessions, (count, session) => {
      if (session.time <= 1) return count
      return count + 1
    }, 0)
  },
  getSiddhisObject: () => {
    return {
      twentyMinutes: false,
      fiveDays: false,
      oneHour: false,
      tenDays: false,
      thirtySessions: false,
      oneHundredHours: false,
      fiftySessions: false,
      complete: false
    }
  }
}
