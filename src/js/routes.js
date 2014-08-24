// Do the data APIs based on URLS and inject into Backbone
// The App will listen to all backbone changes and update the interface accordingly

var models = require('./models')

var Routes = {

  home: function(params) {
    models.examples.reset([{
      type: 'greeting',
      value: 'World'
    }])
  },

  earth: function(params) {
    models.examples.load({
      type: params.paths[0]
    }, function(models) {
      if ( models.isEmpty() ) {
        // TODO send 404 from route
      }
    })
  },

  '404': function() {
    console.log('404')
  }
}

module.exports = Routes