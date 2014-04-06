/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      url: { name: null, params: [], path: window.location.pathname }
    }
  },

  getDefaultProps: function() {
    return { models: {} }
  },

  componentDidMount: function() {

    // listen for backbone changes and force update
    // this makes the entire app reactive
    for( var inst in this.props.models )
      this.props.models[inst].on('add change remove reset', function() {
        this.forceUpdate()
      }, this)

  },

  componentWillUnmount: function() {

    // forget the backbone binding
    for( var inst in this.props.models )
      this.props.models[inst].off(null, null, this)
  },

  render: function() {

    // if there is no url name, we can assume that the route hasn't called it's first callback yet
    if ( !this.state.url.name )
      return <h1>Loading...</h1>

    // text in red for the earth url state
    var style = this.state.url.name == 'earth' ? {color: '#c44'} : {}
    var greeting = this.props.models.example.get('greeting')

    return (
      <div>
        <img src="/assets/aino.svg" /><br />
        <h1 style={style}>{'Hello ' + greeting}</h1>
        <a href="/">Home</a>&nbsp;
        <a href="/earth">Earth</a>
      </div>
    )
  }
})
