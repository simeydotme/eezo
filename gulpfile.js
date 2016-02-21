
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
    sourcemaps = require("gulp-sourcemaps");

var out =       "./dist",
    minName =   "eezo.min.css",
    nanoOpts =  { safe: true },
    style =     { outputStyle: "nested" },
    regular =   { title: "~~ 🐢 | "},
    minified =  { title: "~~ 🐇 | "},
    gzipped =   { title: "~~ ⚡ | ", gzip: true },

    banner = function( type ) {

        var pkg = JSON.parse( fs.readFileSync("./package.json", "utf-8") );
        var tpl = fs.readFileSync("./src/header.txt", "utf-8");

        pkg.type = type || "";

        return ( _.template( tpl , {
            interpolate: /{{=\s*?(.*?)\s*?}}/g
        })( pkg ));

    };

gulp.task( "clean", function() {

    return del( "./dist/**/*" );

});

gulp.task( "max", ["clean"], function() {

    return gulp.src("./src/eezo.scss")

        .pipe( sourcemaps.init() )
        .pipe( sass( style ).on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( header( banner() ) )
        .pipe( gulp.dest( out ) );

});

gulp.task( "min", ["clean"], function() {

    return gulp.src("./src/eezo.scss")

        .pipe( sourcemaps.init() )
        .pipe( sass( style ).on( "error", sass.logError ) )
        .pipe( prefix() )
        .pipe( size( regular ) )
        .pipe( nano( nanoOpts ) )
        .pipe( header( banner() ) )
        .pipe( size( minified ) )
        .pipe( size( gzipped ) )
        .pipe( rename( minName ) )
        .pipe( sourcemaps.write("./") )
        .pipe( gulp.dest( out ) );

});

gulp.task( "default", [ "min", "max" ] );

gulp.task("spy", function() {
    gulp.watch( "./src/**/*.scss" , [ "default" ] );
});