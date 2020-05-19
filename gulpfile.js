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
var imageResize = require('gulp-image-resize');

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
    watch('js/scripts.js', series(buildScriptsTask));
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
    watch('scss/*.scss', series(buildStylesTask));
}

function buildExperienceThumbnailsTask() {
    return src(['images/experience/**/*.png', 'images/experience/**/*.jpg', 'images/experience/**/*.JPG', 'images/experience/**/*.jpeg'])
    .pipe(imageResize({
        width: 200,
        height: 200
    }))
    .pipe(dest('images/experience-thumbnails/'));
}

function runWebserverTask() {
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

const launchLocalWebserver = series(
    buildScriptsTask, 
    buildStylesTask, 
    buildExperienceThumbnailsTask,
    parallel(
        watchScriptsTask,
        watchStylesTask,
        runWebserverTask
    )
);

const buildAssets = series(
    buildScriptsTask,
    buildStylesTask,
    buildExperienceThumbnailsTask
);

exports.default = launchLocalWebserver;
exports.start = launchLocalWebserver;
exports.build = buildAssets;