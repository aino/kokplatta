var Backbone = require('backbone')

var Example = Backbone.Model.extend({
  url: '/api/example'
})

exports.example = new Example()