/// <binding BeforeBuild='min, copy, winstrap-copy, sass' Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    project = require("./project.json");
var sass = require('gulp-sass');

var paths = {
    webroot: "./" + project.webroot + "/",
    lib: "./" + project.webroot + "/lib/",
    fonts: "./" + project.webroot + "/css/fonts/",
    bower: "./bower_components/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.winstrap = paths.bower + "winstrap/src/";
paths.bootstrapsass = paths.bower + "bootstrap-sass/assets/";

var bower = {
    "angular": "angular/angular.js",
    "angular-resource": "angular-resource/angular-resource.js",
    "angular-route": "angular-route/angular-route.js",
    "requirejs": "requirejs/require.js",
    "requirejs-text": "requirejs-text/text.js",
    "winstrap": "winstrap/src/js/app.js"
}

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.webroot + './css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("copy", ["clean"], function () {
    for (var destinationDir in bower) {
        var sourceDir = paths.bower + destinationDir;
        if (fs.existsSync(sourceDir) == false) {
            exitWithError(sourceDir + ' does not exist.');
        }
        gulp.src(paths.bower + bower[destinationDir])
          .pipe(gulp.dest(paths.lib + destinationDir))
          .on('error', gutil.log);
    }
});

gulp.task("winstrap-copy", function () {
    gulp.src(paths.bootstrapsass + "fonts/bootstrap/*")
        .pipe(gulp.dest(paths.fonts))
        .on('error', gutil.log);
    gulp.src(paths.winstrap + "fonts/*")
        .pipe(gulp.dest(paths.fonts))
        .on('error', gutil.log);
    gulp.src(paths.bootstrapsass + "stylesheets/**/*.scss")
        .pipe(gulp.dest("./sass/winstrap/override/bootstrap-sass/assets/stylesheets"))
        .on('error', gutil.log);
    gulp.src(paths.winstrap + "scss/**/*.scss")
        .pipe(gulp.dest("./sass/winstrap"))
        .on('error', gutil.log);
});

var exitWithError = function (msg) {
    gutil.log(gutil.colors.red("ERROR: ") + msg);
    // Use the below code instead of process.exit(1) so that gutil.log is flushed.
    process.on('exit', function () { process.exit(1) });
}


gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:lib", function (cb) {
    rimraf(paths.lib, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:lib"]);

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
