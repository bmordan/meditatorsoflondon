Component.Login = React.createClass({
  onLogin(e) {
    e.preventDefault()

    var self = this

    var email = $('#email').val()
    var password = $('#password').val()

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        toastr.error('There was a problem logging in', 'Problem')
        return console.error(err)
      }
      FlowRouter.go('Home')
    })
  },
  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" name="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" id="password" required />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-action" onClick={ this.onLogin } id="login">Login</button>
        </div>
      </form>
    )
  }
})
Component.GoogleLogin = React.createClass({
  googleLogin: function (e) {
    e.preventDefault()
    Meteor.loginWithGoogle({ loginStyle: 'redirect' }, (err) => {
      if (err) {
        toastr.error('There was a problem logging in', 'Problem with Google')
        return console.error(err)
      }
      FlowRouter.go('/')
    })
  },
  render() {
    return (
      <button className="btn btn-action" onClick={ this.googleLogin }>Sign In with Google</button>
    )
  }
})
Component.FacebookLogin = React.createClass({
  facebookLogin: function (e) {
    e.preventDefault()
    Meteor.loginWithFacebook({ loginStyle: 'redirect' }, (err) => {
      if (err) {
        toastr.error('There was a problem logging in', 'Problem with Facebook')
        return console.error(err)
      }
      FlowRouter.go('/')
    })
  },
  render() {
    return (
      <button className="btn btn-action" onClick={ this.facebookLogin }>Sign In with Facebook</button>
    )
  }
})
