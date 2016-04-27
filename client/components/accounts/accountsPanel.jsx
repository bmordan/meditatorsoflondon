Component.AccountsPanel = React.createClass({
  getInitialState: function () {
    return {
      login: <Component.Login />,
      google: <Component.GoogleLogin />,
      facebook: <Component.FacebookLogin />
    }
  },
  render() {
    return (
      <div className="container container-accounts">
        <div className="row">
          <img src="/svg/logo.svg" className="logo"/>
        </div>
        <div className="row">{ this.state.login }or</div>
        <div className="row">{ this.state.google }</div>
        <div className="row">{ this.state.facebook }</div>
        <div className="row">
          <a href='/signup'>
            <button className="btn btn-cancel">Create an Account</button>
          </a>
        </div>
        <div className="row">
          <div className="form-group">
            <a href="/forgot">Forgot your password?</a>
          </div>
        </div>
      </div>
    )
  }
})
