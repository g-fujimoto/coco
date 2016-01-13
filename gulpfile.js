var gulp       = require('gulp');
var babel      = require('gulp-babel');
var plumber    = require('gulp-plumber');


/* --------------------------------------------------------------------- Task */
/* -------------------------------------------------------- client */

/* ----- src/client 以下のhtmlファイルをdistにコピー ----- */
gulp.task('html-client', function() {
    gulp.src('./src/cilent/**/*.html')
      .pipe(gulp.dest('./dist/client'))
});

/* ----- src/client 以下のcssファイルをdistにコピー ----- */
gulp.task('css-client', function() {
  gulp.src('./src/cilent/**/*.css')
    .pipe(gulp.dest('./dist/client'))
});


/* ----- src/client 以下のjsファイルをBabelコンパイル変換 ------ */
gulp.task('babel-client', function () {
  gulp.src('./src/client/**/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/client'));
});

/* ----- watchタスク ------ */
gulp.task('watch', function() {
  gulp.watch('./src/**', ['html-client']);
  gulp.watch('./src/**', ['css-client']);
  gulp.watch('./src/**', ['babel-client']);
});

/* ----- default ------ */
gulp.task('default', ['watch']);
