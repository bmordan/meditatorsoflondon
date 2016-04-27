Component.Signup = React.createClass({
  createUser: function (e) {
    e.preventDefault()
    let payload = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      profile: {
        name: this.refs.name.value
      }
    }
    Accounts.createUser(payload, function (err) {
      if (err) {
        toastr.error('There was an error creating your account')
        return console.error(err)
      }
      toastr.success('You have joined the Meditators of London', 'Welcome')
      FlowRouter.go('/timer')
    })
  },
  render() {
    return (
      <div className="container container-accounts">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="new-name">Your Name</label>
            <input type="text" className="form-control" ref="name" id="new-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="new-email">Your Email</label>
            <input type="email" className="form-control" ref="email" id="new-email" required />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Choose a Password</label>
            <input type="password" className="form-control" ref="password" id="new-password" required />
          </div>
          <div className="form-group">
            <button className="btn btn-action" onClick={ this.createUser }>Create Account</button>
          </div>
          <div className="form-group">
            <a href="/login"><button className="btn btn-cancel">Cancel</button></a>
          </div>
        </form>
      </div>
    )
  }
})
