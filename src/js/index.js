/** @jsx React.DOM */

require.ensure(['react','jquery'], function() {

  var React = require('react')
  var $ = require('jquery')

  var AppComponent = require('./components/app.js')

  var App = AppComponent({
    greeting: 'World'
  })

  React.renderComponent(App, document.getElementById('app'))

})