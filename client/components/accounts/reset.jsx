Component.ResetPassword = React.createClass({
  reset(e) {
    e.preventDefault()
    let token = this.props.token
    let password = $('#reset-new-password').val()
    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        toastr.error('Could not reset your password', 'Sorry')
        return console.error(err)
      }
      toastr.info('You have reset your password')
      FlowRouter.go('/')
    })
  },
  render() {
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="email">New Password</label>
            <input className="form-control" type="password" name="reset-new-password" id="reset-new-password" placeholder="new password" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input className="form-control" type="password" name="reset-confirm-password" id="reset-confirm-password" placeholder="confirm password" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default" onClick={ this.reset } >Reset</button>
            <a href='/forgot' >Cancel</a>
          </div>
        </form>
      </div>
    )
  }
})
