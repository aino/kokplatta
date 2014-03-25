// Do the data APIs based on URLS and inject into Backbone
// The App will listen to all backbone changes and update the interface accordingly
// You should call cb() when react should change it’s state

var models = require('./models')
var Backbone = require('backbone')

module.exports = {

  home: function(params, cb) {
    models.example.fetch({
      success: cb
    })
  },

  earth: function(params, cb) {
    models.example.set('greeting', 'Earth')
    cb()
  }
}