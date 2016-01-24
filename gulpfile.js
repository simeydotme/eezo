
var fs = require("fs"),
    del = require("del"),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    nano = require("gulp-cssnano"),
    size = require("gulp-size"),
    header = require("gulp-header"),
    rename = require("gulp-rename"),
    prefix = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),

    banner = fs.readFileSync("./src/header.txt", "utf-8");

gulp.task( "clean", function() {

    del( "./dist/**/*" );

});

gulp.task( "max", ["clean"], function() {

    gulp.src("./src/eezo.scss")

        .pipe( sass({ 
            outputStyle: "nested"
        }).on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( header( banner ) )
        .pipe( size({ title: "~~ reg: "}) )

        .pipe( gulp.dest("./dist") );

});

gulp.task( "min", ["clean"], function() {

    gulp.src("./src/eezo.scss")

        .pipe( sourcemaps.init() )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( header( banner ) )
        .pipe( nano({ safe: true }) )
        .pipe( size({ title: "~~ min: "}) )
        .pipe( size({ title: "~~ gzip: ", gzip: true }) )
        .pipe( rename("eezo.min.css") )
        .pipe( sourcemaps.write("./") )

        .pipe( gulp.dest("./dist") );

});

gulp.task("default", ["min", "max"]);