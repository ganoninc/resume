/*jshint esversion: 6 */

/* 
    Build the assets and start a local webserver if requested

    gulp start  // start the webserver and refresh the page when a file is updated
    gulp build  // build the assets

    Author: Romain Giovanetti

    This scripts requires Gulp 4.x to work properly
*/

const { watch, parallel, series, src, dest } = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var imageResize = require('gulp-image-resize');
const image = require('gulp-image');
const stripCssComments = require('gulp-strip-css-comments');

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
        .pipe(stripCssComments())
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
    .pipe(image())
    .pipe(dest('build/images/experience-thumbnails/'));
}

function buildExperienceImagesTask() {
    return src(['images/experience/**/*.png', 'images/experience/**/*.jpg', 'images/experience/**/*.JPG', 'images/experience/**/*.jpeg'])
    .pipe(image())
    .pipe(dest('build/images/experience/'));
}

function runWebserverTask() {
    return src('./')
        .pipe(webserver({
            directoryListing: true,
            open: 'http://localhost:8000/index.html',
            livereload: {
                enable: true, // need this set to true to enable livereload
                filter: function(fileName) {
                    if (fileName.match(/.scss$/)) {
                        return false;
                    } else {
                        return true;
                    }
                }
              }
        }));
}

const launchLocalWebserver = series(
    buildScriptsTask, 
    buildStylesTask, 
    buildExperienceImagesTask, 
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
    buildExperienceImagesTask,
    buildExperienceThumbnailsTask
);

exports.default = launchLocalWebserver;
exports.start = launchLocalWebserver;
exports.build = buildAssets;