/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Backbone = require('backbone')
var Router = require('./router')
var Routes = require('./routes')
var AppComponent = require('./components/app')
var ExampleModel = require('./models/example')

Backbone.$ = $

// expose a Run method instead of module for browser loader
window.Run = function() {

  // collections of backbone models/collections
  var data = { example: ExampleModel }

  // pass the data to the app
  var App = AppComponent({ data: data })

  // render the app
  React.renderComponent(App, document.getElementById('app'))

  // start router
  Router.on('route', function(url, params) {
    if ( Routes.hasOwnProperty(url) ) {
      Routes[url](params, function() {
        App.setState({ 
          url: url, 
          urlParams: params || [] 
        })
      })
    }
  })

  Backbone.history.start({pushState: true})

  // hijack links
  var openLinkInTab = false
  $(document).keydown(function(e) {
    if (e.ctrlKey || e.keyCode === 91)
      openLinkInTab = true
  }).keyup(function() {
    openLinkInTab = false
  }).on('click', 'a', function(e) {
    var href = $(this).attr('href')
    var protocol = this.protocol + '//'
    if (!openLinkInTab && href.slice(protocol.length) !== protocol) {
      e.preventDefault()
      Backbone.history.navigate(href, true)
    }
  })
}