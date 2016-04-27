Component.Layout = React.createClass({
  render() {
    return (
      <div className="container container-timer">
        <div className="row">{ this.props.content }</div>
        <div className="row">{ this.props.graph   }</div>
        <Component.Footer />
      </div>
    )
  }
})

Component.Footer = React.createClass({
  render() {
    return (
      <footer>
        <ol>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/timer">Timer</a></li>
          <li><a href="/meetups">Meetups</a></li>
          <li><Component.Logout /></li>
        </ol>
      </footer>
    )
  }
})
