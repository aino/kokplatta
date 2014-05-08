var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "earth(/:likes)": "earth",
    "*notFound": "404"
  }
})

var router = new Router()
router.history = []

module.exports = router