var gulp       = require('gulp');
var babel      = require('gulp-babel');
var plumber    = require('gulp-plumber');
var csso = require('gulp-csso');
var notify = require('gulp-notify');
var guglify = require('gulp-uglify');


/* --------------------------------------------------------------------- Task */
/* -------------------------------------------------------- client */

/* ----- src/client 以下のhtmlファイルをdistにコピー ----- */
gulp.task('html', function() {
    gulp.src('./src/cilent/**/*.html')
      .pipe(gulp.dest('./dist/client'))
});

/* ----- src/client 以下のcssファイルをdistにコピー ----- */
gulp.task('css', function() {
  gulp.src('./src/cilent/**/*.css')
    .pipe(gulp.dest('./dist/client'))
});


/* ----- src/client/app 以下のjsファイルをBabelコンパイル変換 ------ */
gulp.task('babel-app', function () {
  gulp.src('./src/client/app/**/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/client/app'));
});

/* ----- src/client/components 以下のjsファイルをBabelコンパイル変換 ------ */
gulp.task('babel-components', function () {
  gulp.src('./src/client/components/**/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/client/components'));
});

/* ----- src/client/config 以下のjsファイルをBabelコンパイル変換 ------ */
gulp.task('babel-config', function () {
  gulp.src('./src/client/config/**/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/client/config'));
});

/* ----- watchタスク ------ */
gulp.task('watch', function() {
  gulp.watch('./src/client/**/*.html', ['html']);
  gulp.watch('./src/client/**/*.css', ['css']);
  gulp.watch('./src/client/app/**/*.js', ['babel-app']);
  gulp.watch('./src/client/components/**/*.js', ['babel-components']);
  gulp.watch('./src/client/config/**/*.js', ['babel-config']);
});

/* ----- default ------ */
gulp.task('default', ['watch']);
