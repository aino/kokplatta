var Backbone = require('backbone')
var $ = require('jquery')

var BaseCollection = Backbone.Collection.extend({

  dataUrl: null,
  getArray: function(response) {
    return response.result
  },

  cache: {},

  load: function(query, success, error) {

    this.loading = true
    this.reset()

    var q = query ? JSON.stringify(query) : ''

    var onload = function(response) {
      this.reset( this.getArray(response) )
      this.loading = false
      this.trigger('change')
      typeof success == 'function' && success(response)
    }.bind(this)

    setTimeout(function() {

      if ( this.cache.hasOwnProperty(q) ) {
        onload(this.cache[q])
        return
      }

      $.ajax({
        url: this.dataUrl,
        data: query,
        success: function(response) {
          onload(response)
          this.cache[q] = response
        }.bind(this),
        dataType: 'json'
      })
    }.bind(this), 4)
  },

  comparator: function(model) {
    var position = model.get('position')
    return typeof position != 'undefined' ? position : model.get('name')
  },

  getModel: function(needle) {
    var model = this.findWhere(needle)
    if ( model )
      return model
    if ( this.loading )
      return new this.model() // return empty model so react can still render
  }
})

var Example = Backbone.Model.extend({
  defaults: { value: '' }
})

var Examples = BaseCollection.extend({
  model: Example,
  dataUrl: '/api/examples'
})

exports.examples = new Examples()
