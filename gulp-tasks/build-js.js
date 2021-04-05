'use strict';

// ---------packages
var gulp               = require('gulp'),
  plumber              = require('gulp-plumber'),
  strip                = require('gulp-strip-comments'),
  uglify               = require('gulp-uglify'),
  browserSync          = require("browser-sync"),
  include              = require("gulp-include");

var onError = require("./onError");
var route = require("./route")();

gulp.task('js:build', function(){
   return gulp.src(route.src.js +'*.js')
      .pipe(include({
        extensions: "js",
        includePaths: [
            route.src.js
        ]
      }))
      // .pipe(strip())
      // .pipe(uglify())
      .pipe(gulp.dest(route.build.js))
      .on('end', browserSync.reload);
});
