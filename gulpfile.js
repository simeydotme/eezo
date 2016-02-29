var del = require("del"),
    gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    live = require("gulp-livereload");




gulp.task( "default", [
        "landing",
        "docs",
        "sass"
    ], function() {

        console.log( "gulping things !!" );

    });

gulp.task( "landing", function() {

    del( ["./index.html"] );

    return gulp.src([
            "src/index.jade"
        ])
        .pipe( jade({
            pretty: true,
            basedir: "./"
        }).on("error", function(err) {
              console.log(err);
        }) )
        .pipe( gulp.dest("./") )
        .pipe( live() );

});

gulp.task( "docs", function() {

    del( ["./dist/docs/*.html"] );

    return gulp.src([
            "src/includes/docs/**/*.jade",
            "!**/partials/**/*"
        ])
        .pipe( jade({
            pretty: true,
            basedir: "./"
        }).on("error", function(err) {
              console.log(err);
        }) )
        .pipe( gulp.dest("./dist/docs") )
        .pipe( live() );

});

gulp.task( "sass", function() {

    del( ["./dist/**/*.css"] );

    return gulp.src([
            "./src/assets/*.scss"
        ])
        .pipe( sass().on("error", sass.logError ) )
        .pipe( gulp.dest("./dist/assets/css") )
        .pipe( live() );

});

gulp.task( "img", function() {

    return gulp.src([ "./src/assets/*.*(jpg|svg|png|jpeg|gif)" ])
        .pipe( gulp.dest("./dist/assets/img") );

});

gulp.task( "spy", function() {

    live.listen();
    gulp.watch( "src/**/*.*", [
        "landing",
        "docs",
        "sass"
    ]);

});
