Component.Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let userData = Meteor.subscribe('profile')
    return {
      notReady: !userData.ready(),
      user: Meteor.users.find().fetch()[0]
    }
  },
  render() {
    if (this.data.notReady) {
      return (
        <div className="container">
          <div className="row">
            <h1>Finding User ...</h1>
            <h2>Finding account details ...</h2>
          </div>
          <Component.Footer />
        </div>
      )
    }

    let username
    let siddhis
    this.data.user && this.data.user.profile.name ? username = this.data.user.profile.name : 'Loading ...'
    this.data.user && this.data.user.profile.siddhis ? siddhis = this.data.user.profile.siddhis : siddhis = {}

    let service = <Component.ProfileEdit user={ this.data.user }/>
    if (this.data.user && this.data.user.services && this.data.user.services.google) service = <h2>Google Account</h2>
    if (this.data.user && this.data.user.services && this.data.user.services.facebook) service = <h2>Facebook Account</h2>

    return (
      <div className="container container-profile">
        <div className="row">
          <h1>{ username }</h1>
        </div>
        <div className="row">
          { service }
        </div>
        <Component.Siddhis siddhis={ siddhis }/>
        <Component.Footer />
      </div>
    )
  }
})

Component.ProfileEdit = React.createClass({
  getInitialState: function () {
    return {
      fields: false
    }
  },
  toggleEditFields: function () {
    this.setState({'fields': !this.state.fields})
  },
  update: function (e) {
    e.preventDefault()
    let payload = {
      name: this.refs.name.value,
      email: this.refs.email.value
    }
    Meteor.call('updateUser', payload, (err) => {
      if (err) return console.error(err)
      if (this.refs.oldpassword.value !== '' && this.refs.newpassword.value !== '') {
        Accounts.changePassword(this.refs.oldpassword.value, this.refs.newpassword.value, () => {
          this.toggleEditFields()
        })
      } else {
        this.toggleEditFields()
      }
    })
  },
  render() {
    if (this.state.fields) {
      return (
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" className="form-control" ref="name" defaultValue={ this.props.user.profile.name } id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" name="email" ref="email" id="email" defaultValue={ this.props.user.emails[0].address } required />
          </div>
          <div className="form-group">
            <label htmlFor="oldpassword">Old Password</label>
            <input className="form-control" type="password" name="oldpassword" ref="oldpassword" placeholder="Old Password" id="oldpassword" />
          </div>
          <div className="form-group">
            <label htmlFor="newpassword">Change your Password</label>
            <input className="form-control" type="password" name="newpassword" ref="newpassword" placeholder="New Password" id="newpassword" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-action" onClick={ this.update } id="login">Save Changes</button>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-cancel" onClick={ this.toggleEditFields }>Cancel</button>
          </div>
        </form>     
      )
    }
    return (
      <h2 onClick={ this.toggleEditFields }>Edit your details</h2>
    )
  }
})
