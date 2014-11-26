var indexControllers = require('../controllers/index');
var wxUserController = require('../controllers/wxUser');//weixin
var prizeController = require('../controllers/prize');//weixin
var utils = require('../utils');
var setting = require('../express.configuration').setting;
var __appdir = require('../express.configuration').__appdir;
var log = require('../utils/log');



/*
 * GET home page.
 */

exports.index = function(req, res, next){
    console.log("url:" + req.url);
    indexControllers.index(req, res, renderView);

};

//weixin
exports.saveWxUser = function(req, res){
    wxUserController.saveWxUser(req, res, renderJson);
};

exports.wxUserExist = function(req, res, next){
    wxUserController.wxUserExist(req, res, renderView);
};

exports.getPrizeInfo = function(req, res, next){
    prizeController.getPrizeInfo(req, res, renderJson);
};

/**
 * Render the view and append some common values.
 * @type {Function}
 */
var renderView = exports.renderView = function(req, res, module, view){
    module.contextPath = setting.contextPath;
    module.appRoot = __appdir;
    module.keywords = utils.whenUndefined(req.session.keywords, function(value){return '';});
    module.utils = utils;
    module.session = req.session;
    module.cartNumber = 0;
    module.totalMoney = 0;
    module.loginNumber = 0;
    if (req.session.userInfo) {
        module.userName = req.session.userInfo.userName ? req.session.userInfo.userName : "";
        module.cartNumber = req.session.userInfo.cartNumber ? req.session.userInfo.cartNumber : 0;
        module.totalMoney = req.session.userInfo.totalMoney ? req.session.userInfo.totalMoney : 0;
        module.loginNumber = req.session.userInfo.loginNumber ? req.session.userInfo.loginNumber : 0;
    }
    res.render(view, module)
};

var renderJson = exports.renderJson = function(req, res, module){
    res.writeHead(200, {"Content-Type": 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(module));
};