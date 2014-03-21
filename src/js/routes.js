// Do the data APIs based on URLS and inject into Backbone
// The App will listen to all backbone changes and update the interface accordingly
// You should call cb() when react should change it’s state

var ExampleModel = require('./models/example')

module.exports = {

  home: function(params, cb) {
    ExampleModel.set('greeting', 'World')
    cb()
  },

  earth: function(params, cb) {
    ExampleModel.set('greeting', 'loading...')
    setTimeout(function() {
      ExampleModel.set('greeting', 'Earth')
      cb()
    },1000)
  }
}