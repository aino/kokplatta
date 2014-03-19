var koa = require('koa')
  , logger = require('koa-logger')
  , route = require('koa-route')
  , bodyParser = require('koa-body-parser')
  , serve = require('koa-static')
  , app = module.exports = koa()
  , config = require('../conf/config')

app.use(logger())
app.use(bodyParser())
app.use(serve( config.public ))

app.use(route.get('/test', function*(){
  this.body = 'hello'
}))


if (!module.parent) app.listen(config.port);
