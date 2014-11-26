/**
 * Module dependencies.
 */

var routes = require('./routes');

//  url mapping
exports.urlmapping = function(app){
    // index section
    app.get('/', routes.index);
    app.get('/index', routes.index);

    //weixin
    app.post('/weixin/saveWxUser', routes.saveWxUser);
    app.get('/weixin/wxUserExist', routes.wxUserExist);
    app.get('/weixin/getPrizeInfo', routes.getPrizeInfo);

    //   Error
    app.error(function(error, req, res, next){

    });

    app.get('/404', function(req, res){

    });
};