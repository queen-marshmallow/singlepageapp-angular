/// <binding Clean='clean' ProjectOpened='watch' />

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    project = require("./project.json");
var del = require('del');
var sass = require('gulp-sass');

var paths = {
    webroot: "./" + project.webroot + "/",
    lib: "./" + project.webroot + "/lib/",
    fonts: "./" + project.webroot + "/fonts/",
    bower: "./bower_components/",
};

paths.bootstrapsass = paths.bower + "bootstrap-sass/assets/";
paths.winstrap = paths.bower + "winstrap/src/";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.minCss = paths.webroot + "css/**/*.min.css";

var bower = [
    paths.bower + "angular-resource/angular-resource.js",
    paths.bower + "angular-route/angular-route.js",
    paths.bower + "bootstrap-sass/assets/javascripts/*.js",
    paths.bower + "winstrap/src/js/app.js",
    paths.bower + "angular-spinners/dist/angular-spinners.js"
];

var fonts = [
    paths.bootstrapsass + "fonts/bootstrap/*",
    paths.winstrap + "fonts/*"
];

var styles = [
    paths.bootstrapsass + "stylesheets/**/*.scss",
    paths.winstrap + "scss/**/*.scss"
];

function buildJs(sources, name) {
    gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(concat(name))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.webroot + 'js'));
}

gulp.task('build-appjs', function () {
    buildJs(['src/**/module.js', 'src/**/*.js'], 'app.min.js');
});

gulp.task('build-libjs', function () {
    buildJs(bower, 'lib.min.js');
});

gulp.task('build-sass', function () {
    gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.css'))
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.webroot + './css'));
});

gulp.task('copy-fonts', function () {
    gulp.src(fonts)
    .pipe(gulp.dest(paths.fonts));
});

gulp.task('copy-styles', function () {
    gulp.src(paths.bootstrapsass + "stylesheets/**/*.scss")
        .pipe(gulp.dest("./sass/winstrap/override/bootstrap-sass/assets/stylesheets"));
    gulp.src(paths.winstrap + "scss/**/*.scss")
        .pipe(gulp.dest("./sass/winstrap"));
});

gulp.task('watch', ['build-appjs', 'build-libjs', 'build-sass', 'copy-fonts', 'copy-styles'], function () {
    gulp.watch('src/**/*.js', ['build-appjs']);
    for (var dir in bower) {
        gulp.watch(dir, ['build-libjs']);
    }
    for (var font in fonts) {
        gulp.watch(font, ['copy-fonts']);
    }
    for (var style in styles) {
        gulp.watch(style, ['copy-styles']);
    }
    gulp.watch('./sass/**/*.scss', ['build-sass']);
});

gulp.task("clean", function (cb) {
    del([paths.minJs, paths.minCss, "./sass/winstrap", "./sass/winstrap/override/bootstrap-sass/assets/stylesheets", paths.fonts], cb);
});