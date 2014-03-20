/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  getDefaultProps: function() {
    return { data: [] }
  },

  componentDidMount: function() {

    // listen for backbone changes and force update
    // this makes the entire app reactive
    for( var inst in this.props.data )
      this.props.data[inst].on('add change remove reset', function() {
        this.forceUpdate()
      }, this)

  },

  componentWillUnmount: function() {

    // forget the backbone binding
    for( var inst in this.props.data )
      this.props.data[inst].off(null, null, this)
  },

  render: function() {
    return (
      <h1>Hello {this.props.data.example.get('greeting')}!</h1>
    )
  }
})
