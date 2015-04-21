var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var sources = {
    addlist: {
        js: 'assets/addlist/js/**/*.js'
    }
};

var destinations = {
    addlist: {
        js: 'UCRList/lists/static/lists/addlist/'
    }
};

gulp.task('build:addlist', function(){
    return gulp.src(sources.addlist.js)
        //.pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(destinations.addlist.js));
});

gulp.task('clean:addlist', function() {
    return del(destinations.addlist.js + 'all.js');
});

gulp.task('watch:addlist',  function() {
    gulp.watch(sources.addlist.js, ['make:addlist']);
});

gulp.task('make:addlist', ['clean:addlist', 'build:addlist']);

gulp.task('default', ['make:addlist', 'watch:addlist']);
