var setting = require('../setting.json');

exports.userAuthFilter = function(req, res, next){
    if (req.url == "/signup" ||
        req.url == "/login" ||
        req.url == "/" ||
        req.url == "/index" ||
        req.url.match("/api/") != null ||
        req.url.match("/public/") != null ||
        req.url.match("/error/") != null ||
        req.url.match("/javascripts/") != null ||
        req.url.match("/images/") != null ||
        req.url.match("/stylesheets/") != null ||
        req.url.match("/pics/") != null ||
        req.url.match("/ajax/") != null ||
        req.url.match("/favicon.ico") != null ||
        req.url.match("/logout") != null) {
        next();
    } else if (req.session == null ||  req.session.userInfo == null ||
        req.session.userInfo == "") {
        res.redirect("/login");
    } else {
        next();
    }
}

exports.protocolCheck = function(req, res, next) {
    if (req.protocol == "http") {
        if (req.url.match("/public/getvideo/")) {
            next();
        } else {
            if (req.method == "GET") {
                res.redirect("https://" + req.host + ":" + setting.https_port + req.url);
            } else {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.write("error");
                res.end();
            }
        }
    } else {
        next();
    }
}