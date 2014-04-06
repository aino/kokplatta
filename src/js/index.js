/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Backbone = require('backbone')
var Router = require('./router')
var Routes = require('./routes')
var AppComponent = require('./components/app')
var models = require('./models')

Backbone.$ = $

// expose a Run method instead of module for browser loader
window.Run = function() {

  // render the app
  var App = React.renderComponent(AppComponent({ models: models }), document.getElementById('app'))

  // start router
  Router.on('route', function(name, params) {
    if ( Routes.hasOwnProperty(name) ) {
      Routes[name](params, function() {
        App.setState({ 
          url: { 
            name: name, 
            params: params,
            path: window.location.pathname
          }
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
