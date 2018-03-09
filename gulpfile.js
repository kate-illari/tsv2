const gulp = require("gulp"),
    browserify = require("browserify"),
    browserifyCss = require("browserify-css"),
    source = require("vinyl-source-stream"),
    watchify = require("watchify"),
    tsify = require("tsify"),
    clean = require('gulp-clean'),
    gulputil = require("gulp-util"),
    browserSync = require('browser-sync').create(),
    paths = {
        pages: ["src/*html", "src/*css", "src/*ts"]
    };
const opts = {
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {}
};

const watcher = watchify(browserify(opts)
    .plugin(tsify));

const bundle = function () {
    return watcher
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }));
}

gulp.task('cleanUp', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task("copy", ["cleanUp"], function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"))
})

gulp.task("watch", function () {
    gulp.watch('./src/styles.css', function () {
        gulp.src('./src/styles.css')
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream: true
            }))
    }).on("change", gulputil.log);
    gulp.watch('./src/*.ts', function () {
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
    }).on("change", gulputil.log);
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

gulp.task("run", ["browserSync", "watch","copy"], function () {
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
        .pipe(gulp.dest("dist"));
});

watcher.on("update", bundle);
watcher.on("log", gulputil.log);