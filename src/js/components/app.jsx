/*** @jsx React.DOM */

var App = React.createClass({

  render: function() {
    var greeting = this.props.greeting || 'world'
    return (
      <h1>Hello {greeting}!</h1>
    )
  }
})

module.exports = App