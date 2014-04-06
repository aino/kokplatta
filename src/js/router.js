var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "earth(/:likes)": "earth",
    "*notFound": "404"
  }
})

module.exports = new Router()