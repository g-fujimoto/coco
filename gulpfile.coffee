
gulp   = require 'gulp'
coffee = require 'gulp-coffee'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

gulp.task 'coffee', ->
    gulp.src './develop/src/coffee/*.coffee'
        .pipe coffee()
        .pipe gulp.dest './develop/dist/js'
        .pipe rename
            suffix: '.min'
        .pipe uglify()
        .pipe gulp.dest './develop/dist/min'

gulp.task 'watch'


gulp.task 'default', ['coffee']
