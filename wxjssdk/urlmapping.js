/**
 * Module dependencies.
 */

var routes = require('./routes');

//  url mapping
exports.urlmapping = function(app){
    // index section
    app.get('/', routes.index);
    app.get('/index', routes.index);
    app.get('/test', function(req, res, next){
        res.render('test', {title:'test'})
    });

    //questionnaire
    app.get('/question/qUserExist', routes.qUserExist);
    app.post('/question/saveUser', routes.saveUser);

    app.get('/question/result', routes.getResult);

    app.get('/ajax/getConfig',routes.getConfig);
    //   Error
    app.error(function(error, req, res, next){

    });

    app.get('/404', function(req, res){

    });
};