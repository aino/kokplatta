/*** @jsx React.DOM */
require('script!react/react-with-addons.js')
require('script!jquery/jquery.js')

var AppComponent = require('./components/app.js')

React.renderComponent(<AppComponent greeting="World" />, document.getElementById('app'))
