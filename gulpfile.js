/*jshint esversion: 6 */

/* 
    Build the assets and can start a local webserver with live reload

    gulp start  // start the webserver and reload automaticly when needed
    gulp build  // build the assets

    Author: Romain Giovanetti

    Gulp 4.x is required
*/

const { watch, parallel, series, src, dest } = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');

function buildScriptsTask() {
    return src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('js'));
}

function watchScriptsTask() {
    return watch('js/scripts.js', function () {
        series(buildScriptsTask);
    });
}

function buildStylesTask() {
    return src('scss/styles.scss')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(dest('css'));
}

function watchStylesTask() {
    return watch('scss/*.scss', function () {
        series(buildStylesTask);
    });
}

function webserverTask() {
    return src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: 'http://localhost:8000/index.html',
            enable: true, // need this set to true to enable livereload 
            filter: function(fileName) {
                if (fileName.match(/.scss$/)) {
                    return false;
                } else {
                    return true;
                }
            }
        }));
}

function buildTask(cb) {
    buildStylesTask();
    buildScriptsTask();
    if(cb)
        cb();
}


function watchTask(cb) {
    buildTask();
    webserverTask();
    parallel(watchScriptsTask, watchStylesTask);
    cb();
}

exports.default = watchTask;
exports.start = watchTask;
exports.build = buildTask;