var express = require('express')
var vhost = require('vhost')

var vhoster = express()

var config = require(process.env.CONFIG_PATH || './vhoster.config.json')

Object.keys(config.vhosts).forEach(function(url) {
  var appPath = config.vhosts[url]
  vhoster.use(vhost(url, require(appPath)))
})

// catch 404 and forward to error handler
vhoster.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = vhoster
