Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'bernard@tableflip.io',
      password: '123',
      profile: {
        name: 'Bernard',
        siddhis: {
          twentyMinutes: true,
          fiveDays: true,
          oneHour: true,
          tenDays: true,
          thirtySessions: true,
          oneHundredHours: true,
          fiftySessions: true,
          complete: true
        },
        admin: true,
        rsvps: {
          attending: [],
          apologies: []
        }
      }
    })
  }
  Accounts.emailTemplates.resetPassword.text = (user, url) => {
    url = url.replace('#/', '')
    return "Click this link to reset your 'meditatorsof.london' password: " + url
  }
  Accounts.loginServiceConfiguration.remove({
    service: "google"
  })
  Accounts.loginServiceConfiguration.insert({
    service: "google",
    clientId: Meteor.settings.google.clientId,
    secret: Meteor.settings.google.secret
  })
  Accounts.loginServiceConfiguration.remove({
    service: "facebook"
  })
  Accounts.loginServiceConfiguration.insert({
    service: "facebook",
    appId: Meteor.settings.facebook.appId,
    secret: Meteor.settings.facebook.secret
  })
  Accounts.onCreateUser(function (options, user) {
    options.profile.siddhis = Helpers.getSiddhisObject()
    user.profile = options.profile
    user.profile.rsvps = {
      attending: [],
      apologies: []
    }
    return user
  })
  WebApp.connectHandlers.use('/fonts/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return next()
  })
})
