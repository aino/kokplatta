var koa = require('koa')

var app = koa()
  , bodyParser = require('koa-body-parser')
  , compress = require('koa-compress')
  , config = require('../conf/config')
  , logger = require('koa-logger')
  , route = require('koa-route')
  , serve = require('koa-static')


app.use(logger())
app.use(bodyParser())
app.use(compress())
app.use(serve('../public/'))

app.use(route.get('/test', function*(){
  this.body = "test"
}))


if (!module.parent) app.listen(config.port);
