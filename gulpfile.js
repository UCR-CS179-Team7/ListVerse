var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var temp_base = '.tmp/';

var angular_base_src_dir = 'assets/lists/';
var addlist_base_src_dir =  angular_base_src_dir + 'addlist/';

var addlist_base_dest_dir = 'UCRList/lists/static/lists/addlist/';

var editlist_base_src_dir =  angular_base_src_dir + 'editlist/';
var editlist_base_dest_dir = 'UCRList/lists/static/lists/editlist/';

var sources = {
    addlist: {
        entry_point: addlist_base_src_dir + 'app.js',
        js: angular_base_src_dir, 
    },
    editlist: {
        entry_point: editlist_base_src_dir + 'app.js',
        js: angular_base_src_dir, 
    },
    templates: angular_base_src_dir + 'templates/**/*.html',
};

var temp = {
    addlist: temp_base + 'addlist',
    editlist: temp_base + 'editlist',
    templates: temp_base + 'templates',
};

var destinations = {
    addlist: {
        js: addlist_base_dest_dir,
    },
    editlist: {
        js: editlist_base_dest_dir,
    },
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
    return buildWithWebpack(sources.addlist.entry_point, temp.addlist);
});

gulp.task('build:editlist:webpack', function() {
    return buildWithWebpack(sources.editlist.entry_point, temp.editlist);
});

gulp.task('build:addlist:concat', ['build:lists:templates', 'build:addlist:webpack'], function() {
    return concatWithTemplates(temp.addlist + '/**/*.js', destinations.addlist.js);    
});

gulp.task('build:editlist:concat', ['build:lists:templates', 'build:editlist:webpack'], function() {
    return concatWithTemplates(temp.editlist + '/**/*.js', destinations.editlist.js);    
});

gulp.task('build:lists', ['build:addlist:concat', 'build:editlist:concat']);

gulp.task('clean:lists:dest', function() {
    return clean([destinations.addlist.js + 'all.js', destinations.editlist.js + 'all.js']);
});

gulp.task('clean:temp', function() {
    return clean(temp_base);
});

gulp.task('make:lists', ['clean:lists:dest', 'build:lists', 'clean:temp']);


gulp.task('watch:lists',  function() {
    gulp.watch([sources.addlist.js, sources.editlist.js, sources.templates], ['make:lists']);
});

gulp.task('default', ['make:lists', 'watch:lists']);

function buildWithWebpack(src, dest) {
    return gulp.src(src)
        .pipe($.webpack({
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel-loader'},
                ]
            }
        }))
        .pipe($.debug())
        .pipe(gulp.dest(dest));
}
function concatWithTemplates(src, dest) {
    var sources = [src, temp.templates + '/**/*.js'];

    log('concating ' + sources + ' to ' + dest);

    return gulp.src(sources)
        .pipe($.debug())
        .pipe($.concat('all.js'))
        .pipe(gulp.dest(dest));
}

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

