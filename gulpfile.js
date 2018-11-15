const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('compress', function() {
  return gulp.src('lazyload.js')
          .pipe(uglify())
          .pipe(rename({
            basename: 'lazyload.min'
          }))
          .pipe(gulp.dest('./'))
});

gulp.task('default', ['compress'])
