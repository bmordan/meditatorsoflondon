Component.Forgot = React.createClass({
  getInitialState: function () {
    return {sent: false}
  },
  sendEmail: function (e) {
    e.preventDefault()
    let email = this.refs.email.value
    if (email === '') {
      toastr.warning('Must be a registered email address')
      return console.error('Need a registered email address')
    }
    Accounts.forgotPassword({email: email}, (err) => {
      if (err) {
        toastr.error('Error sending reset email')
        return console.error(err)
      }
      this.setState({sent: true})
      toastr.info(email,'Sent to')
    })
  },
  cancel: function (e) {
    e.preventDefault()
    this.setState({sent: false})
    FlowRouter.go('/login')
  },
  render() {
    let content
    if (this.state.sent) {
      content = (
        <p>Thank you, an email has been sent to your address. Click on the link in the email to reset your password.</p>
      )
    } else {
      content = (
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="forgot-email">Send reset link to my Email</label>
            <input type="email" name="resetEmail" className="form-control" ref="email" id="forgot-email" required />
          </div>
          <div className="form-group">
            <button className="btn btn-action" onClick={ this.sendEmail }>Send Now</button>
          </div>
          <div className="form-group">
            <button className="btn btn-cancel" onClick={ this.cancel }>cancel</button>
          </div>
        </form>
      )
    }
    return (
      <div className="container container-accounts">{ content }</div>
    )
  }
})
