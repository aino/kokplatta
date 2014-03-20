/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Backbone = require('backbone')
var Router = require('./router.js')
var AppComponent = require('./components/app.js')

Backbone.$ = $

// example data entry
var Model = Backbone.Model.extend({})
var example = new Model()

// collections of backbone models/collections
var data = { example: example }

// pass the data to the app
var App = AppComponent({ data: data })

// render the app
React.renderComponent(App, document.getElementById('app'))

// start router
Router.on('route', function(url, params) {

  // Do the data APIs based on URLS and inject into Backbone
  // The App will listen to all backbone changes and update the interface accordingly
  example.set('greeting','World')

  App.setState({ 
    url: url, 
    urlParams: params || [] 
  })

})

Backbone.history.start()