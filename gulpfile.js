var gulp  = require('gulp'),
    gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var cleanCSS = require('gulp-clean-css');

//minify-css
gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('dist-js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

//Minify png images
gulp.task('imagemin', function () {
    return gulp.src('imagemin-img/*.png')
        .pipe(imagemin({
            progressive: true,
           // use: [pngquant()]
        }))
        .pipe(gulp.dest('img'));
});

//Minify svg images
gulp.task('svgmin', function () {
    return gulp.src('imagemin-img/logo.svg')
        .pipe(svgmin({
        	js2svg: {
        		pretty: true
        	}
        }))
        .pipe(gulp.dest('img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['svgmin', 'scripts', 'imagemin', 'minify-css']);
});

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});
