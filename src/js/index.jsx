/*** @jsx React.DOM */
require('react/react.js')
require('jquery/jquery.js')

var AppComponent = require('components/app.jsx')

React.renderComponent(<AppComponent greeting="World" />, document.getElementById('app'))