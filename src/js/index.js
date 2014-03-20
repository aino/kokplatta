/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var _ = require('underscore')
var backbone = require('backbone')
var animate = require('../../bower_components/ainojs/animate')

var AppComponent = require('./components/app')
var App = AppComponent({
  greeting: 'world'
})

React.renderComponent(App, document.getElementById('app'))
