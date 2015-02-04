/**
 * Module dependencies.
 */
var express = require('express')
    , filters = require('./filters');
exports.setting = require('./setting.json');

exports.__appdir = __dirname;
exports.config = function(app){
    // Configuration
    app.configure(function(){

        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.set('view options', {layout: false});

        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'your secret here' }));
//        app.use(filters.userAuthFilter);
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
        app.use(express.errorHandler());
    });
}