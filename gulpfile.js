var del = require("del"),
    gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    live = require("gulp-livereload"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify");




gulp.task( "default", [
        "landing",
        "docs",
        "sass",
        "js"
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
            "!**/partials/**/*",
            "!**/layout/**/*"
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
            "./src/assets/css/styles.scss"
        ])
        .pipe( sass().on("error", sass.logError ) )
        .pipe( gulp.dest("./dist/assets/css") )
        .pipe( live() );

});

gulp.task( "js", function() {

    del( ["./dist/**/*.js"] );

    return gulp.src([
            "./bower_components/jquery/dist/jquery.js",
            "./bower_components/prism/prism.js",
            "./bower_components/prism/components/prism-css.js",
            "./bower_components/prism/components/prism-css-extras.js",
            "./bower_components/prism/components/prism-scss.js",
            "./bower_components/prism/components/prism-sass.js",
            "./src/assets/js/app.js"
        ])
        .pipe( concat("app.js") )
        .pipe( uglify() )
        .pipe( gulp.dest("./dist/assets/js") )
        .pipe( live() );

});

gulp.task( "img", function() {

    return gulp.src([ "./src/assets/img/**/*.*(jpg|svg|png|jpeg|gif)" ])
        .pipe( gulp.dest("./dist/assets/img/") );

});

gulp.task( "spy", function() {

    live.listen();
    gulp.watch( "src/**/*.*", [
        "landing",
        "docs",
        "sass",
        "js"
    ]);

});
