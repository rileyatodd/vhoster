var express = require('express');
var path = require('path');
var logger = require('morgan');
var vhost = require('vhost');

var dumpsterApp = require('../dumpster/app.js');
var personalSite = require('../personalSite/app.js');
var mygame = require('../my-game/app.js');
var ipg = require('../indyPulltabGaming/app.js');

var vhoster = express();

vhoster.use(vhost('the-dumpster.com', dumpsterApp));
vhoster.use(vhost('www.the-dumpster.com', dumpsterApp));

vhoster.use(vhost('rileyatodd.com', personalSite));
vhoster.use(vhost('www.rileyatodd.com', personalSite));

vhoster.use(vhost('minimagic.com', mygame));
vhoster.use(vhost('www.minimagic.com', mygame));

vhoster.use(vhost('indianapulltabs.com', ipg));
vhoster.use(vhost('www.indianapulltabs.com', ipg));

if (vhoster.get('env') === 'dev') {
  vhoster.use(vhost('dev.the-dumpster.com', dumpsterApp));
  vhoster.use(vhost('dev.rileyatodd.com', personalSite));
  vhoster.use(vhost('dev.minimagic.com', mygame));
  vhoster.use(vhost('dev.indianapulltabs.com', ipg));
}

// catch 404 and forward to error handler
vhoster.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = vhoster;