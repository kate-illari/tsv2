const gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    tsify = require("tsify"),
    clean = require('gulp-clean'),
    gulputil = require("gulp-util"),
    browserSync = require('browser-sync').create(),
    paths = {
        pages: ["src/*html", "src/styles/*css"]
    };

const bundle = function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }));
};

gulp.task('cleanUp', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task("copy", ["cleanUp"], function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
    gulp.watch('src/index.html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
    }).on("change", gulputil.log);
    gulp.watch('src/styles/*', function () {
        gulp.src('src/styles/*')
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream: true
            }));
    }).on("change", gulputil.log);
    gulp.watch('src/ts/*.ts', bundle).on("change", gulputil.log);
    gulp.watch('src/main.ts', bundle).on("change", gulputil.log);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task("run", ["browserSync", "watch", "copy"], bundle);