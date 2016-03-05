var express = require('express');
var path = require('path');
var logger = require('morgan');
var vhost = require('vhost');

var dumpsterApp = require('../dumpster/app.js');
var personalSite = require('../personalSite/app.js');
var mygame = require('../mygame/app.js');
var ipg = require('../indyPulltabGaming/app.js');

var vhoster = express();

vhoster.use(vhost('the-dumpster.com', dumpsterApp));
vhoster.use(vhost('rileyatodd.com', personalSite));
vhoster.use(vhost('minimagic.com', mygame));
vhoster.use(vhost('indianapulltabs.com', ipg));

// catch 404 and forward to error handler
vhoster.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = vhoster;