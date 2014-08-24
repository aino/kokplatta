// Do the data APIs based on URLS and inject into Backbone
// The App will listen to all backbone changes and update the interface accordingly

var models = require('./models')
var Backbone = require('backbone')

module.exports = {

  home: function(params) {
    models.examples.reset([{
      type: 'greeting',
      value: 'World'
    }])
  },

  earth: function(params) {
    models.examples.load({
      type: 'greeting'
    })
  },

  '404': function() {
    console.log('404')
  }
}