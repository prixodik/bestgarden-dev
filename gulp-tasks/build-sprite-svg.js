'use strict';
// init
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  svgSprite = require('gulp-svg-sprite'),
  path = require('path'),
  folders = require('gulp-folders-4x'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  gulpMerge = require('gulp-merge'),
  replace = require('gulp-replace');

var route = require("./route")();
var pathToFolder = 'src/sprite-svg';
// TODO: foreach seri
gulp.task('spriteSvg:build', folders(pathToFolder,   function(folder){
  return gulp.src(pathToFolder + '/'+ folder + '/*.svg')
        .pipe(svgmin({
          js2svg: {
            pretty: true
          }
        }))
        .pipe(cheerio({
          run: function ($) {
            if (folder == 'sprite-svg') {
              $('[fill]').removeAttr('fill');
              $('[stroke]').removeAttr('stroke');
              $('[style]').removeAttr('style');
            }
          },
          parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
          mode: {
            symbol: {
              sprite: "../" + route.build.spriteSvg + folder + ".svg",
              render: {
                scss: {
                  "dest": "../" + route.src.spriteSvgStyle + folder + '.scss',
                  "template": route.src.spriteSvgTemplate
                }
              },
              example: true
            }
          }
        }))
        .pipe(gulp.dest("./"))
  }
));
// gulp.task('spriteSvg:build', () => {
//   gulp.src(path.join('sprite-svg/**/', folder, '*.svg'))
//         console.log('sprite-svg/**/*.svg')
//         console.log('sprite-svg/**/*.svg')
//         // .pipe(svgmin({
//         //   js2svg: {
//         //     pretty: true
//         //   }
//         // }))
//         // .pipe(cheerio({
//         //   run: function ($) {
//         //     $('[fill]').removeAttr('fill');
//         //     $('[stroke]').removeAttr('stroke');
//         //     $('[style]').removeAttr('style');
//         //   },
//         //   parserOptions: {xmlMode: true}
//         // }))
//         // .pipe(replace('&gt;', '>'))
//         // .pipe(svgSprite({
//         //   mode: {
//         //     symbol: {
//         //       sprite: "../" + route.build.spriteSvg + "sprite-svg.svg",
//         //       render: {
//         //         scss: {
//         //           "dest": "../" +route.src.spriteSvgStyle + 'sprite-svg.scss',
//         //           "template": route.src.spriteSvgTemplate
//         //         }
//         //       },
//         //       example: true
//         //     }
//         //   }
//         // }))
//         // .pipe(gulp.dest("./"));
//
// });
// gulp.task('', () => {
//   gulp.src(path.join('sprite-svg/**/', folder, '*.svg'))
//         console.log('sprite-svg/**/*.svg')
//         console.log('sprite-svg/**/*.svg')
//         // .pipe(svgmin({
//         //   js2svg: {
//         //     pretty: true
//         //   }
//         // }))
//         // .pipe(cheerio({
//         //   run: function ($) {
//         //     $('[fill]').removeAttr('fill');
//         //     $('[stroke]').removeAttr('stroke');
//         //     $('[style]').removeAttr('style');
//         //   },
//         //   parserOptions: {xmlMode: true}
//         // }))
//         // .pipe(replace('&gt;', '>'))
//         // .pipe(svgSprite({
//         //   mode: {
//         //     symbol: {
//         //       sprite: "../" + route.build.spriteSvg + "sprite-svg.svg",
//         //       render: {
//         //         scss: {
//         //           "dest": "../" +route.src.spriteSvgStyle + 'sprite-svg.scss',
//         //           "template": route.src.spriteSvgTemplate
//         //         }
//         //       },
//         //       example: true
//         //     }
//         //   }
//         // }))
//         // .pipe(gulp.dest("./"));
//
// });
