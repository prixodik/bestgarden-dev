'use strict';

// ---------packages
const gulp                 = require('gulp'),
        path                 = require('path'),
        fs                   = require('fs'),
        browserSync          = require("browser-sync"),
        reload               = browserSync.reload,
        plumber              = require('gulp-plumber'),
        changed              = require('gulp-changed'),
        runSequence          = require('gulp4-run-sequence'),
        sass                 = require('gulp-sass'),
        cleanCSS = require('gulp-clean-css');

var onError = require("./onError");
var route = require("./route")();

var scssSourceFilesBasePath = path.join(route.main.src, 'scss')
var scssSourceFiles = path.join(fs.realpathSync(scssSourceFilesBasePath), '*.scss')

gulp.task('style:gen', function(callback) {
    var cssDestination = path.dirname(scssSourceFiles)
    return gulp
        .src(scssSourceFiles)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(cssDestination, { extension: '.css' }))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({debug: true, }, (details) => {

        }))
        .pipe(gulp.dest(route.build.styles))
        .on('end', browserSync.reload);
});

gulp.task('style:build', function(cb) {
    runSequence('style:gen', cb);
});
