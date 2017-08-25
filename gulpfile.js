var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

gulp.task('sass', function () {
   return gulp.src("sass/**/*.scss")
       .pipe(sass())
       .pipe(gulp.dest('css'))
       .pipe(browserSync.reload({stream:true}))
});

gulp.task('script', function () {
   return gulp.src([
       'libs/**/dist/*.js'
   ])
       .pipe(concat('libs.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('js'));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function () {
   browserSync({
       server: {
          baseDir: './'
       }
   });
});

gulp.task('watch', ['browser-sync', 'css-libs', 'script'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});