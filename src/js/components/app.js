/** @jsx React.DOM */

var React = require('react')
var models = require('../models')
var TouchClick = require('ainojs-react-touchclick')

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

    var routeName = this.state.route.name

    // if there is no route name, we can assume that the route hasn't called it's first callback yet
    if ( !routeName )
      return <div />

    if ( routeName == '404' )
      return <div>404</div>

    // text in red for the earth route state
    var style = this.state.route.name == 'earth' ? {color: '#c44'} : {}
    var greeting = models.examples.getModel({type: 'greeting'})

    return (
      <TouchClick click={this.props.clickHandler}>
        <img src="/assets/aino.svg" /><br />
        <h1 style={style}>{'Hello ' + greeting.get('value')}</h1>
        <a href="/">Home</a>&nbsp;
        <a href="/earth">Earth</a>
        <a href="/earth/gothenburg">Gothenburg</a>
        <a href="/earth?a=1">A</a>
        <a href="/earth?b=1">B</a>
        <a href="/303">404</a>&nbsp;
      </TouchClick>
    )
  }
})
