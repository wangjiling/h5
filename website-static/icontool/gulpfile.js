// 载入外挂
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    revAll = require('gulp-rev-all'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    buildConfig = require('./config.js');

/*清空打包目录*/
gulp.task('clean:build', function(){
    return del([buildConfig.build.rootPath+'/**/*']);
});

/*copy项目文件*/
gulp.task('copy', function(){
    return gulp.src([
        buildConfig.src.rootPath+'/**/images/**/*',
        buildConfig.src.rootPath+'/**/font/**/*',
        buildConfig.src.rootPath+'/**/*.ico',
        buildConfig.src.rootPath+'/**/*.txt'
    ]).pipe(gulp.dest(buildConfig.build.tempPath));
});

/*优化替换*/
gulp.task('usemin', function() {
    return gulp.src(buildConfig.src.rootPath+"/**/*.html")
        .pipe(useref())
        .pipe(gulpif('*.js', uglify({mangle:{reserved:['$','require','exports'],toplevel: true}})))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie9'})))
        .pipe(gulp.dest(buildConfig.build.tempPath));
});

/* html打包 */
gulp.task('htmlmin', ['usemin'], function () {
    return gulp.src(buildConfig.build.tempPath+'/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(buildConfig.build.tempPath));
});

/*添加版本号，避免缓存*/
gulp.task('version', ['copy', 'htmlmin', 'clean:build'], function(){
    return gulp.src(buildConfig.build.tempPath+'/**')
        .pipe(revAll.revision({
            dontRenameFile: [/^\/favicon.ico$/g, '.html', '.txt', 'wx_share_300x300.png'],
            hashLength: 10
        }))
        // .pipe(gulp.dest(buildConfig.build.rootPath))
        // .pipe(revAll.manifestFile())
        .pipe(gulp.dest(buildConfig.build.rootPath));
});

/*开发环境*/
gulp.task('default', function(){
    var firstFlag = true;

    nodemon({
        script: 'app.js'
        , ext: 'hbs'
        , watch: buildConfig.src.rootPath
    }).on('exit', function() {
        if (firstFlag) {
            firstFlag = false;
            browserSync.init({
                // server: {
                //     baseDir: buildConfig.src.rootPath
                // },
                // port: 3000,
                // browser: ["google chrome"],

                proxy: "http://139.162.70.103:3000/",
                serveStatic: [buildConfig.src.rootPath]
            });

            gulp.watch(buildConfig.src.rootPath+'/**/*.+(html|css|js)')
                .on('change', browserSync.reload);
        }
    });
});

/*生产环境*/
gulp.task('build', ['version'], function(){
    return del([buildConfig.build.tempPath+'/**/*']);
});

