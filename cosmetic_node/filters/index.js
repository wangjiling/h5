exports.userAuthFilter = function(req, res, next){
    console.log('req.session : ' + JSON.stringify(req.session));
    if (req.url == "/signup" ||
        req.url == "/login" ||
        req.url == "/oauth" ||
        req.url.match("/weixin/oauth") != null ||
        req.url.match("/weixin/notify") != null ||
        req.url.match("/api/") != null ||
        req.url.match("/public/") != null ||
        req.url.match("/error/") != null ||
        req.url.match("/js/") != null ||
        req.url.match("/images/") != null ||
        req.url.match("/css/") != null ||
        req.url.match("/pics/") != null ||
        req.url.match("/ajax/") != null ||
        req.url.match("/favicon.ico") != null ||
        req.url.match("/logout") != null) {
        next();
    } else if (req.session == null ||  req.session.userInfo == null ||
        req.session.userInfo == "") {
        req.session.globalParams = {};
        req.session.globalParams.redirect_url = req.url;
        res.redirect("/oauth");
    } else {
        next();
    }
};