/** @jsx React.DOM */

var React = require('react')
var models = require('../models')
var TouchClick = require('./touchclick')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      modal: false,
      route: { name: null, params: [], slide: false },
      wasmodal: false
    }
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

    // if there is no route name, we can assume that the route hasn't called it's first callback yet
    if ( !this.state.route.name )
      return <h1>Loading...</h1>

    // text in red for the earth route state
    var style = this.state.route.name == 'earth' ? {color: '#c44'} : {}
    var greeting = models.examples.getModel({type: 'greeting'})

    return (
      <TouchClick handler={this.props.clickHandler}>
        <img src="/assets/aino.svg" /><br />
        <h1 style={style}>{'Hello ' + greeting.get('value')}</h1>
        <a href="/">Home</a>&nbsp;
        <button data-href="/earth">Earth</button>
      </TouchClick>
    )
  }
})
