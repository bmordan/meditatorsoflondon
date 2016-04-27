Component.Input = React.createClass({
  componentDidMount: function () {
    this.refs.input.focus()
  },
  setNewValue(e) {
    let val = e.target.value
    let hhmmss = this.props.timeComponent
    let obj = {}

    if (!parseInt(val, 10)) return this.props.toggleInput(hhmmss)
    val = parseInt(val, 10)
    if (hhmmss === 'hh' && val > 12) val = 12
    if (hhmmss === 'hh' && val < 0) val = 0
    if ((hhmmss === 'mm' || hhmmss === 'ss') && val > 59) val = 59
    if ((hhmmss === 'mm' || hhmmss === 'ss') && val < 0) val = 0
    val = val.toString()
    if (val.length < 2) val = '0' + val

    obj[hhmmss] = val
    this.props.setTimerState(obj)
    this.props.toggleInput(hhmmss)
  },
  render() {
    return (
      <input type="text" size="2" ref="input" onBlur={ this.setNewValue }/>
    )
  }
})
