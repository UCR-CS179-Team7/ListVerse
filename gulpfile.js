var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var temp_base = '.tmp/';

var angular_base_src_dir = 'assets/lists/';
var addlist_base_src_dir =  angular_base_src_dir + 'addlist/';

var addlist_base_dest_dir = 'UCRList/lists/static/lists/addlist/';

var sources = {
    addlist: {
        entry_point: addlist_base_src_dir + 'app.js',
        js: angular_base_src_dir, 
    },
    templates: angular_base_src_dir + 'templates/**/*.html',
};

var temp = {
    addlist: temp_base + 'addlist',
    templates: temp_base + 'templates',
};

var destinations = {
    addlist: {
        js: addlist_base_dest_dir,
    }
};

gulp.task('build:lists:templates', function() {
    return gulp.src(sources.templates)
            .pipe($.minifyHtml({empty: true}))
            .pipe($.angularTemplatecache('templates.js',{
                module: 'app',
                root: 'templates/', 
                standAlone: false , 
            }))
            .pipe($.debug())
            .pipe(gulp.dest(temp.templates));
});

gulp.task('build:addlist:webpack', function() {
    return gulp.src(sources.addlist.entry_point)
        .pipe($.webpack({
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel-loader'},
                ]
            }
        }))
        .pipe($.debug())
        .pipe(gulp.dest(temp.addlist));
});

gulp.task('build:addlist:concat', ['build:lists:templates', 'build:addlist:webpack'], function() {
    var addlist_sources = [temp.addlist + '/**/*.js', temp.templates + '/**/*.js'];

    log('concating ' + addlist_sources + ' to ' + destinations.addlist.js);

    return gulp.src(addlist_sources)
        .pipe($.debug())
        .pipe($.concat('all.js'))
        .pipe(gulp.dest(destinations.addlist.js));
});

gulp.task('build:addlist', ['build:addlist:concat']);

gulp.task('clean:addlist:dest', function() {
    return clean(destinations.addlist.js + 'all.js');
});

gulp.task('clean:temp', function() {
    return clean(temp_base);
});

gulp.task('watch:addlist',  function() {
    gulp.watch([sources.addlist.js, sources.templates], ['make:addlist']);
});

gulp.task('make:addlist', ['clean:addlist:dest', 'build:addlist', 'clean:temp']);

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

