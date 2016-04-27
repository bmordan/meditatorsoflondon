Component.Graph = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscribtion = Meteor.subscribe('sessions')
    return {
      notReady: !subscribtion.ready(),
      sessions: Sessions.find({}, {sort: {ts: 1}}).fetch(),
      max: Sessions.find({}, { sort: {time: -1}, limit: 1 }).fetch()
    }
  },
  render() {
    if (this.data.notReady) {return (
      <div className="carousel">
        <ul><li>Loading ...</li></ul>
      </div>
    )}

    let summary

    this.data.sessions.length > 0 ? summary = <Component.summaryStats /> : summary = <div className="text-center"><p>Your summary statistics will be displayed here</p></div>

    return (
      <div className="carousel">
        <Component.graphData sessions={ this.data.sessions } max={ this.data.max } />
        { summary }
      </div>
    )
  }
})
Component.graphData = React.createClass({
  render() {
    let graph = this.props.sessions.map((data, i) => {
      let height
      if (data.time && data.time > 1)
        height = (160/this.props.max[0].time) * data.time + 'px'
      else
        height = '1px'

      return <li key={ data._id } className="graph">
        <span style={{height: height}}></span>
      </li>
    })
    return (
      <ul>{ graph }</ul>
    )
  }
})
