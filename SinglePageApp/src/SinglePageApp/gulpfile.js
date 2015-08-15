/// <binding BeforeBuild='min' Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    project = require("./project.json");
    rjs = require('requirejs');

var paths = {
    webroot: "./" + project.webroot + "/",
    lib: "./" + project.webroot + "/lib/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task('requirejsBuild', function () {
    rjs.optimize({
        baseUrl: paths.webroot + 'app',
        removeCombined: true,
        out: './requirejs/app-combined.js',
        optimize: 'none',
        name: 'main'
    });
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
