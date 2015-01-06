var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var partials = require('express-partials');

var routes = require('./routes/index')
    , filters = require('./filters');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'webViews'));
app.set('view engine', 'ejs');

//app.engine('.html', require('ejs').__express);
//app.set('view engine', 'html');
app.set("view options",{"layout":false});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/webPublic/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave:false, saveUninitialized:false, secret: 'mzyx', key: 'mzyx' ,cookie: { maxAge: 1000*60*60*24}}));  //session 时长为24小时,这个是以毫秒为单位,这样我们就建立一个session的会话，这是一个全局的设置
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'webPublic')));
app.use(partials());
app.use(filters.userAuthFilter);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
