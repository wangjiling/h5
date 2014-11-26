var setting = require('../express.configuration').setting;
var __appdir = require('../express.configuration').__appdir;

var logger = require('book').default({
    stdout: true,
    trace: true,
    hostname: true,
    timestamp: true
});

var bookfile = require('book-file');
var logFile = bookfile({
    filename: __appdir + setting.logPath.basePath + setting.logPath.defaultFileName
});
logger.use(logFile);

//var debugLogFile = bookfile({
//    filename: __appdir + setting.logPath.basePath + setting.logPath.debug
//});
//
//var infoLogFile = bookfile({
//    filename: __appdir + setting.logPath.basePath + setting.logPath.info
//});
//
//var warningLogFile = bookfile({
//    filename: __appdir + setting.logPath.basePath + setting.logPath.warn
//});
//
//var errorLogFile = bookfile({
//    filename: __appdir + setting.logPath.basePath + setting.logPath.error
//});



exports.debug = function(message){
    //logger.use(debugLogFile);
    logger.debug(message);
}

exports.info = function(message){
    //logger.use(infoLogFile);
    logger.info(message);
}

exports.warn = function(message){
    //logger.use(warningLogFile);
    logger.warn(message);
}

exports.error = function(message){
    //logger.use(errorLogFile);
    logger.error(message);
}