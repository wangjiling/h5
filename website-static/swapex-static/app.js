var handlebars = require('handlebars');
var async = require("async");
var fs = require('fs');

require('handlebars-helpers')({
    handlebars: handlebars
});

var files = {
    'HEAD': 'src/shared/templates/head.hbs',
    'HEADER': 'src/shared/templates/header.hbs',
    'FOOTER': 'src/shared/templates/footer.hbs',
    'STATS': 'src/shared/templates/stats.hbs',
    'INDEX': 'src/index/templates/index.hbs',
    'NOT_FOUND': 'src/404/templates/index.hbs',
};

var configs = {};

function renderToString(source, data) {
    var template = handlebars.compile(source);
    var outputString = template(data);
    return outputString;
}

function readAsync(value, key, callback) {
    console.log(value);
    fs.readFile(value, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return callback(err);
        }
        try {
            configs[key] = data;
        } catch (e) {
            console.err(e);
            return callback(e);
        }
        callback();
    });
}

async.forEachOf(files, readAsync, function (err) {
    if (!err && configs) {
        handlebars.registerPartial({
            head: configs.HEAD,
            header: configs.HEADER,
            footer: configs.FOOTER,
            stats: configs.STATS,
        });

        // index page
        var index = renderToString(configs.INDEX.toString(), {
            title: "index"
        });
        fs.writeFile("src/index.html", index, function (err) {
            if (err) {
                return console.log(err);
            }
        });

        // 404 page
        var not_found = renderToString(configs.NOT_FOUND.toString(), {
            title: "404"
        });
        fs.writeFile("src/404/index.html", not_found, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
