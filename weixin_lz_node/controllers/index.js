
exports.index = function(req, res, renderFun){
    renderFun(req, res, { title: 'Home' }, 'index')
};


