var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var temp_base = '.tmp/';

var addlist_base_src_dir = 'assets/addlist/';
var addlist_base_dest_dir = 'UCRList/lists/static/lists/addlist/';

var sources = {
    addlist: {
        js: addlist_base_src_dir + '**/*.js',
        templates: addlist_base_src_dir +  'templates/**/*.html',
    }
};

var temp = {
    addlist: temp_base + 'addlist',
};

var destinations = {
    addlist: {
        js: addlist_base_dest_dir,
        templates: addlist_base_dest_dir + 'templates/',
    }
};

gulp.task('build:addlist:templates', function() {
    return gulp.src(sources.addlist.templates)
            .pipe($.minifyHtml({empty: true}))
            .pipe($.angularTemplatecache('templates.js',{
                module: 'app',
                root: 'templates/', 
                standAlone: false , 
            }))
            .pipe(gulp.dest(temp.addlist));
});

gulp.task('build:addlist:js', function() {
    var addlist_sources =[sources.addlist.js, temp.addlist + '**/*.js'];

    log('concating ' + addlist_sources);

    return gulp.src(addlist_sources)
        //.pipe($.uglify())
        .pipe($.concat('all.js'))
        .pipe(gulp.dest(destinations.addlist.js));
});

gulp.task('build:addlist', ['build:addlist:templates', 'build:addlist:js']);

gulp.task('clean:addlist:dest', function() {
    return clean(destinations.addlist.js + 'all.js');
});

gulp.task('clean:temp', function() {
    return clean(temp_base);
});

gulp.task('watch:addlist',  function() {
    gulp.watch([sources.addlist.js, sources.addlist.templates], ['make:addlist']);
});

gulp.task('make:addlist', ['clean:addlist:dest', 'build:addlist']);

gulp.task('default', ['make:addlist', 'watch:addlist']);

function clean(filename) {
    var done = del(filename);
    log('removing ' +  filename);
    return done;
}

function log(message) {
    blue = $.util.colors.blue;
    if(typeof(message) === 'object') {
        for (var elem in message) {
            if (message.hasOwnProperty(elem)) {
                $.util.log(blue(elem));        
            }
        }
    } else {
        $.util.log(blue(message));
    }
}

