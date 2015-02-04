
/**
 * Module dependencies.
 */

var express = require('express')
    ,expressconfig = require('./express.configuration').config
    ,urlmapping = require('./urlmapping').urlmapping


var app = module.exports = express.createServer();

/**
 *  Express configuration
 */
expressconfig(app);

/**
 *  Url mapping
 */
urlmapping(app);

app.listen(8088, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
