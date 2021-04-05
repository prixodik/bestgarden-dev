var gulp                 = require('gulp');

var route = require("./route")();

gulp.task('fonts:build', function() {
  return gulp.src(route.src.fonts)
    .pipe(gulp.dest(route.build.fonts));
});
