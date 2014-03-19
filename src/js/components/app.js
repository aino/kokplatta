/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  render: function() {
    var greeting = this.props.greeting || 'world'
    return (
      <h1>Hello {greeting}!</h1>
    )
  }
})