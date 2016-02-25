var del = require("del"),
    gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    live = require("gulp-livereload");




gulp.task( "default", [
        "wipe",
        "landing",
        "docs",
        "sass"
    ], function() {

        console.log( "gulping things !!" );

    });

gulp.task( "wipe", function() {
    return del( ["./index.html", "./dist/**/*.*"] );
});

gulp.task( "landing", ["wipe"], function() {

    return gulp.src([
            "src/index.jade"
        ])
        .pipe( jade({ pretty: true }).on("error", function(err) {
              console.log(err);
        }) )
        .pipe( gulp.dest("./") )
        .pipe( live() );

});

gulp.task( "docs", ["wipe"], function() {

    return gulp.src([
            "src/includes/docs/**/*.jade",
            "!**/partials/**/*"
        ])
        .pipe( jade({ pretty: true }).on("error", function(err) {
              console.log(err);
        }) )
        .pipe( gulp.dest("./dist/docs") )
        .pipe( live() );

});

gulp.task( "sass", ["wipe"], function() {

    return gulp.src([
            "./src/assets/*.scss"
        ])
        .pipe( sass().on("error", sass.logError ) )
        .pipe( gulp.dest("./dist/assets/css") )
        .pipe( live() );

});

gulp.task( "spy", function() {

    live.listen();
    gulp.watch( "src/**/*.*", ["default"] );

});
