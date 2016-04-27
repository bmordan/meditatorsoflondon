Component.Logout = React.createClass({
  logout(e) {
    e.preventDefault()
    if (Meteor.userId()) Meteor.logout(() => {
      toastr.info('You have been logged out')
      FlowRouter.go('/login')
    })
  },
  render() {
    return (
      <a onClick={ this.logout } >Log Out</a>
    )
  }
})
