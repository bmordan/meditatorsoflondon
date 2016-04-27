Component.summaryStats = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscribtion = Meteor.subscribe('sessions')
    return {
      totalSeconds: Helpers.getTotalSeconds(Sessions.find().fetch()),
      totalDays: Sessions.find({time: {$gt: 1}}).count(),
      average: (Helpers.getTotalSeconds(Sessions.find().fetch()) / Sessions.find({time: {$gt: 1}}).count()),
      consecutive: Helpers.getConsecutiveDays(Sessions.find().fetch())
    }
  },
  render() {
    let today = moment().format('ddd Do MMM')
    let total = Helpers.formatSeconds(this.data.totalSeconds)
    let average = Helpers.formatSeconds(this.data.average)
    
    return (
      <table>
        <tbody>
          <tr>
            <td>Today is:</td>
            <td>{ today }</td>
          </tr>
          <tr>
            <td>Most Consecutive Days:</td>
            <td>{ this.data.consecutive }</td>
          </tr>
          <tr>
            <td>Average Session Length:</td>
            <td>{ average }</td>
          </tr>
          <tr>
            <td>Days with a Session:</td>
            <td>{ this.data.totalDays }</td>
          </tr>
          <tr>
            <td>Total Accumulated Time:</td>
            <td>{ total }</td>
          </tr>
        </tbody>
      </table>
    )
  }
})
