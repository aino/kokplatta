/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var _ = require('underscore')
var backbone = require('backbone')

var AppComponent = require('./components/app.js')
var App = AppComponent({
  greeting: 'world'
})

React.renderComponent(App, document.getElementById('app'))
