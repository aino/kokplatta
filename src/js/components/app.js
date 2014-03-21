/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      url: 'loading',
      urlParams: []
    }
  },

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

    // text in red for the earth url state
    var style = this.state.url == 'earth' ? {color: '#c44'} : {}

    return (
      <div>
        <a href="/">Home</a>&nbsp;
        <a href="/earth">Earth</a>
        <h1 style={style}>{'Hello '+this.props.data.example.get('greeting')}</h1>
      </div>
    )
  }
})