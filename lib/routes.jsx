const isLoggedIn = (ctx, redirect) => {
  if (!Meteor.userId() && !Meteor.loggingIn()) redirect('/login')
}

const checkLogIn = (ctx, redirect) => {
  if (Meteor.userId()) redirect('/')
}

const utilRoute = FlowRouter.group({
  name: 'util'
})

const publicRoute = FlowRouter.group({
  name: 'public',
  triggersEnter: [checkLogIn]
})

const privateRoute = FlowRouter.group({
  name: 'private',
  triggersEnter: [isLoggedIn]
})

privateRoute.route('/', {
  name: 'Home',
  action() {
    FlowRouter.go('/timer')
  }
})

privateRoute.route('/timer', {
  name: 'Timer',
  action(params) {
    ReactLayout.render(Component.Layout, {
      timerId: params.timerId,
      content: <Component.Timer><Component.Input /></Component.Timer>,
      graph: <Component.Graph />
    })
  }
})

privateRoute.route('/profile', {
  name: 'Profile',
  action() {
    ReactLayout.render(Component.Profile)
  }
})

privateRoute.route('/meetups', {
  name: 'Meetup',
  action() {
    ReactLayout.render(Component.Meetups, {
      adminPanel: <Component.AdminPanel />
    })
  }
})

publicRoute.route('/login', {
  name: 'Login',
  action() {
    ReactLayout.render(Component.AccountsPanel)
  }
})

publicRoute.route('/forgot', {
  name: 'Forgot',
  action() {
    ReactLayout.render(Component.Forgot)
  }
})

publicRoute.route('/signup', {
  name: 'Signup',
  action() {
    ReactLayout.render(Component.Signup)
  }
})

utilRoute.route('/reset-password/:token', {
  name: 'Reset',
  action(params) {
    ReactLayout.render(Component.ResetPassword, {token: params.token})
  }
})
