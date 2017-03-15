var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./deploy"
    });

    gulp.watch("source/sass/*.sass", ['sass']);
    gulp.watch("deploy/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("source/sass/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['Last 2 versions'],
            browsers:['> 2%'],
            cascade: false
        }))
        .pipe(gulp.dest("deploy/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
