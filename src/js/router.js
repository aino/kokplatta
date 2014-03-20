var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "*notFound": "404"
  }
})

module.exports = new Router()