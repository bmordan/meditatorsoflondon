Component.Timer = React.createClass({
  getInitialState: function () {
    return {
      hh: '00',
      mm: '00',
      ss: '00',
      edithh: false,
      editmm: false,
      editss: false,
      timer: false,
      session: 0,
      audio: window.location.origin + '/audio/bowl.mp3'
    }
  },
  setTimerState: function (obj) { this.setState(obj) },
  moveByOne: function (ref, dir) {
    if (this.state.timer) return
    let obj = {}
    obj[ref] = step.bind(this, ref, dir)()
    this.setState(obj)
  },
  toggleInput: function (ref) {
    if (this.state.timer) return
    let obj = {}
    obj['edit' + ref] = !this.state['edit' + ref]
    this.setState(obj)
  },
  startSession: function () {
    let session = (parseInt(this.state.hh, 10) * 3600) + (parseInt(this.state.mm, 10) * (60)) + parseInt(this.state.ss, 10)
    this.setState({'session': session})
    this.setState({'timer': true})
    setTimeout(() => { this.timer(session) }, 1000)
    if (Meteor.isCordova) {
      if (cordova.platformId === 'ios') this.refs.audio.play()
      if (cordova.platformId === 'android') new Media(this.state.audio).play()
      window.plugins.insomnia.keepAwake()
    }
  },
  endSession: function () {
    Meteor.call('fillSessions', this.state.session, (err) => {
      if (err) return console.error(err)
      this.setState({'timer': false})
      this.setState({'session': 0})
      if (Meteor.isCordova) {
        if (cordova.platformId === 'ios') this.refs.audio.play()
        if (cordova.platformId === 'android') new Media(this.state.audio).play()
        window.plugins.insomnia.allowSleepAgain()
      }
    })
  },
  updateTimer: function (session) {
    let hh = Helpers.zeroify(Math.floor(session / 3600))
    let mm = Helpers.zeroify(Math.floor(session % 3600 / 60))
    let ss = Helpers.zeroify(Math.floor(session % 3600 % 60))
    this.setState({'hh': hh})
    this.setState({'mm': mm})
    this.setState({'ss': ss})
  },
  timer: function (session) {
    if (session <= 0) return this.endSession()
    session -= 1
    this.updateTimer(session)
    setTimeout(() => { if (this.state.timer) this.timer(session) }, 1000)
  },
  cancelTimer: function () {
    this.setState({'timer': false})
    this.setState({'hh': '00'})
    this.setState({'mm': '00'})
    this.setState({'ss': '00'})
  },
  render() {
    let active
    let hour
    let minute
    let second
    this.state.edithh ? hour   = <Component.Input setTimerState={ this.setTimerState } timeComponent='hh' toggleInput={ this.toggleInput } /> : hour =   this.state.hh
    this.state.editmm ? minute = <Component.Input setTimerState={ this.setTimerState } timeComponent='mm' toggleInput={ this.toggleInput } /> : minute = this.state.mm
    this.state.editss ? second = <Component.Input setTimerState={ this.setTimerState } timeComponent='ss' toggleInput={ this.toggleInput } /> : second = this.state.ss
    this.state.timer ? active = 'active' : active = ''

    return (
      <table className={ active }>
        <tbody>
          <tr>
            <td><span onClick={ this.moveByOne.bind(null, 'hh', 1) }><img src="/svg/up.svg" /></span></td>
            <td><span onClick={ this.moveByOne.bind(null, 'mm', 1) }><img src="/svg/up.svg" /></span></td>
            <td><span onClick={ this.moveByOne.bind(null, 'ss', 1) }><img src="/svg/up.svg" /></span></td>
          </tr>
          <tr>
            <td>hour</td>
            <td>mins</td>
            <td>secs</td>
          </tr>
          <tr className="timer">
            <td onClick={ this.toggleInput.bind(null, 'hh') }><h1>{ hour   }</h1></td>
            <td onClick={ this.toggleInput.bind(null, 'mm') }><h1>{ minute }</h1></td>
            <td onClick={ this.toggleInput.bind(null, 'ss') }><h1>{ second }</h1></td>
          </tr>
          <tr>
            <td><span onClick={ this.moveByOne.bind(null, 'hh', -1)   }><img src="/svg/down.svg" /></span></td>
            <td><span onClick={ this.moveByOne.bind(null, 'mm', -1) }><img src="/svg/down.svg" /></span></td>
            <td><span onClick={ this.moveByOne.bind(null, 'ss', -1) }><img src="/svg/down.svg" /></span></td>
          </tr>
          <tr>
            <td><audio ref="audio" src={ this.state.audio }></audio></td>
            <td>&nbsp;</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td><button className="btn btn-action" onClick={ this.startSession }>Start</button></td>
            <td></td>
          </tr>
          <tr className="timer">
            <td></td>
            <td><button className="btn btn-cancel" onClick={ this.cancelTimer }>Cancel</button></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
})

const step = function (hhmmss, dir) {
  let val
  dir > 0 ? val = (parseInt(this.state[hhmmss], 10) + 1) : val = (parseInt(this.state[hhmmss], 10) - 1)
  if (hhmmss === 'hh' && val > 12) val = 0
  if (hhmmss === 'hh' && val < 0) val = 12
  if ((hhmmss === 'mm' || hhmmss === 'ss') && val > 59) val = 0
  if ((hhmmss === 'mm' || hhmmss === 'ss') && val < 0) val = 59
  return Helpers.zeroify(val)
}
