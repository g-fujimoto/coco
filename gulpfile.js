var gulp       = require('gulp');
var babel      = require('gulp-babel');
var plumber    = require('gulp-plumber');

gulp.task('babel', function () {
  return gulp.src('./src/client/app/**/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});
