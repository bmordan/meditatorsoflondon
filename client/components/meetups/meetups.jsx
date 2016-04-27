Component.Meetups = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscription = Meteor.subscribe('meetups')
    return {
      notReady: !subscription.ready(),
      meetups: Meetups.find().fetch()
    }
  },
  render() {
    let adminPanel
    Meteor.user().profile.admin ? adminPanel = this.props.adminPanel : adminPanel = <Component.RsvpDescription />

    if (this.data.notReady) {
      return (
        <div className="container container-meetups">
          <div className="row">
            <h1>Meetups</h1>
          </div>
          <div className="row">
            <img src="/ksdl-logo.png"/>
          </div>
          <div className="row">
            Fetching the Meetups ...
          </div>
          <Component.Footer />
        </div>
      )
    }

    return (
      <div className="container container-meetups">
        <div className="row">
          <h1>Meetups</h1>
        </div>
        <div className="row">
          <img src="/ksdl-logo.png"/>
        </div>
        <div className="row">
          { adminPanel }
        </div>
        <div className="row">
          { this.data.meetups.map((meetup) => <Component.RsvpMeetup key={ meetup._id } meetup={ meetup }/>) }
        </div> 
        <Component.Footer />
      </div>
    )
  }
})

Component.RsvpMeetup = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let meetup = new ReactiveVar(this.props.meetup)
    return {
      meetup: meetup.get()
    }
  },
  render() {
    let rsvps = _.union(this.data.meetup.rsvps.attending, this.data.meetup.rsvps.apologies)
    let rsvp = _.contains(rsvps, Meteor.userId() + '@' + Meteor.user().profile.name)
    if (rsvp) {
      return (
        <section key={ this.data.meetup._id }>
          <p>{ moment(this.data.meetup.meetupday).format('ddd Do MMM h:mma') }</p>
          <Component.RsvpList meetupId={ this.data.meetup._id } list={ this.data.meetup.rsvps.attending } title={ 'Attending' } />
          <Component.RsvpList meetupId={ this.data.meetup._id } list={ this.data.meetup.rsvps.apologies } title={ 'Apologies' } />
        </section>
      )
    }
    return (
      <section>
        <h3>{ moment(this.data.meetup.meetupday).format('ddd Do MMM h:mma') }</h3>
        <Component.RsvpButtons meetupId={ this.data.meetup._id }/>
      </section> 
    )
  }
})

Component.RsvpList = React.createClass({
  render() {
    if (this.props.list && this.props.list.length < 1) return (<span></span>)
    return (
      <ul key={ this.props.title + this.props.meetupId }>
        <li><i><u>{ this.props.title }</u></i></li>
        {
          this.props.list.map((_idname) => {
            let user = _idname.split('@')
            return <Component.RsvpUser key={ user[0] } name={ user[1] } userId={ user[0] } meetupId={ this.props.meetupId }/>
          })
        }
      </ul>
    )
  }  
})

Component.RsvpUser = React.createClass({
  resetRsvp: (meetupId, e) => {
    e.preventDefault()
    Meteor.call('resetRsvp', meetupId)
  },
  render() {
    if (this.props.userId === Meteor.userId()) {
      return (
        <li onClick={ this.resetRsvp.bind(null, this.props.meetupId) }>
          <strong>{ this.props.name } (change ?)</strong>
        </li>
      )
    } else {
      return (<li>{ this.props.name }</li>)
    }
  }
})

Component.RsvpButtons = React.createClass({
  rsvp(op) {
    Meteor.call('updateMeetup', this.props.meetupId, op)
    if (op > 0) toastr.success('Your RSVP has been recorded')
    if (op < 0) toastr.info('Your apologies have been noted')
  },
  render() {
    return (
      <ul className='rsvpButtons'>
        <li><button className="btn btn-action" onClick={ this.rsvp.bind(null, 1) }>Yes</button></li>
        <li><button className="btn btn-cancel" onClick={ this.rsvp.bind(null, -1) }>No</button></li>
      </ul>
    )
  }
})

Component.AdminPanel = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      meetup: Meetups.find().fetch()
    } 
  },
  createMeetup() {
    Meteor.call('createMeetup', this.refs.newMeetupDate.value, (err) => {
      if (err) return toastr.error(err, 'Error')
      let newDate = moment(this.refs.newMeetupDate.value).format('ddd Do MMM h:mma')
      toastr.success('for ' + newDate, 'New meetup scheduled')
      this.refs.newMeetupDate.value = ''
    })
  },
  editMeetup(id) {
    Meteor.call('editMeetup', id, this.refs.newMeetupDate.value, (err) => {
      if (err) return toastr.error(err, 'Error')
      let newDate = moment(this.refs.newMeetupDate.value).format('ddd Do MMM h:mma')
      toastr.success('Meetup has a new date ' + newDate, 'Edited Meetup')
      this.refs.newMeetupDate.value = ''
    })
  },
  deleteMeetup(id) {
    Meteor.call('deleteMeetup', id, (err) => {
      if (err) return toastr.error(err, 'Error')
      toastr.warning('Meetup deleted', 'Deleted')
    })
  },
  render() {
    let meetups = this.data.meetup.map((meetup) => {
      return <article key={ meetup._id }>
        <time>{ moment(meetup.meetupday).format('ddd Do MMM') }</time>
        <button className="btn btn-inline btn-action" onClick={ this.editMeetup.bind(null, meetup._id) }>Edit</button>
        <button className="btn btn-inline btn-cancel" onClick={ this.deleteMeetup.bind(null, meetup._id) }>Delete</button>
      </article>
    })
    return (
      <section className="admin">
        <input type="text" placeholder="YYYY-MM-DDTHH:MM:SS.0Z" ref="newMeetupDate" />
        <button className="btn btn-inline btn-action" onClick={ this.createMeetup }>Create</button>
        { meetups }
      </section>
    )
  }
})

Component.RsvpDescription = React.createClass({
  render() {
    return (
      <div className="welcome">
        <p>Regular meetups take place at:</p>
        <address>
          Kagyu Samye Dzong London<br/>
          15 Spa Road<br/>
          Bermondsey<br/>
          London SE16 3SA<br/>
        </address>
        <p>These meetups are an informal opportunities to meet with other people learning to meditate in London. They take place on a Sunday either in the morning or afternoon, and last for about 1 hour. There is a cafe in the Center for teas and refreshments.</p>
        <p>The format of the meetup is a relaxed group discussion. We often have a theme prepared and sometimes we will have a guest speaker. You can attend any of these meetups. You will find the next meetup listed here below. Please let us know if you can attend by using the Yes and No buttons under each meetup.</p>
      </div>
    )
  }
})
