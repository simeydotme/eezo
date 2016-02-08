
var _ = require("lodash"),
    fs = require("fs"),
    del = require("del"),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    nano = require("gulp-cssnano"),
    size = require("gulp-size"),
    header = require("gulp-header"),
    rename = require("gulp-rename"),
    prefix = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),

    banner = function() {

        var pkg = JSON.parse( fs.readFileSync("./package.json", "utf-8") );
        var tpl = fs.readFileSync("./src/header.txt", "utf-8");

        return ( _.template( tpl , {
            interpolate: /{{=\s*?(.*?)\s*?}}/g
        })( pkg ));

    };



gulp.task( "clean", function() {

    return del( "./dist/**/*" );

});

gulp.task( "max", ["clean"], function() {

    return gulp.src("./src/eezo.scss")

        .pipe( sass({ 
            outputStyle: "nested"
        }).on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( header( banner() ) )
        .pipe( size({ title: "~~ reg: "}) )

        .pipe( gulp.dest("./dist") );

});

gulp.task( "min", ["clean"], function() {

    return gulp.src("./src/eezo.scss")

        .pipe( sourcemaps.init() )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( nano({ safe: true }) )
        .pipe( header( banner() ) )
        .pipe( size({ title: "~~ min: "}) )
        .pipe( size({ title: "~~ gzip: ", gzip: true }) )
        .pipe( rename("eezo.min.css") )
        .pipe( sourcemaps.write("./") )

        .pipe( gulp.dest("./dist") );

});

gulp.task( "default", [ "min", "max" ] );

gulp.task("spy", function() {
    gulp.watch( "./src/**/*.scss" , [ "default" ] );
});