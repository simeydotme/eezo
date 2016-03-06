
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
    minName =   function( x ) { return x + ".min.css"; },
    nanoOpts =  { safe: true },
    style =     { outputStyle: "nested" },
    regular =   function( x ) { return { title: "~~ 🐢 | " + x + " |" }; },
    minified =  function( x ) { return { title: "~~ 🐇 | " + x + " |" }; },
    gzipped =   function( x ) { return { title: "~~ 🐆 | " + x + " |" , gzip: true }; },

    banner = function( type ) {

        var pkg = JSON.parse( fs.readFileSync("./package.json", "utf-8") );
        var tpl = fs.readFileSync("./src/header.txt", "utf-8");

        pkg.type = type || "";

        return ( _.template( tpl , {
            interpolate: /{{=\s*?(.*?)\s*?}}/g
        })( pkg ));

    },

    maxTask = function( path, name ) {

        return gulp.src( path )

            .pipe( sourcemaps.init() )
            .pipe( sass( style ).on( "error", sass.logError ) )
            .pipe( prefix() )
            .pipe( header( banner() ) )
            .pipe( gulp.dest( out ) );

    },

    minTask = function( path, name ) {

        return gulp.src( path )

            .pipe( sourcemaps.init() )
            .pipe( sass( style ).on( "error", sass.logError ) )
            .pipe( prefix() )
            .pipe( size( regular( name ) ) )
            .pipe( nano( nanoOpts ) )
            .pipe( header( banner() ) )
            .pipe( size( minified( name ) ) )
            .pipe( size( gzipped( name ) ) )
            .pipe( rename( minName( name ) ) )
            .pipe( sourcemaps.write("./") )
            .pipe( gulp.dest( out ) );

    },

    bundles = [{

        name: "eezo",
        path: "./src/eezo.scss"

    },{

        name: "eezo-core",
        path: "./src/bundles/eezo-core.scss"

    }];

gulp.task( "clean", function() {

    return del( "./dist/**/*" );

});

gulp.task( "max", ["clean"], function() {

    _.each( bundles, function( obj, key ) {

        return maxTask( obj.path, obj.name );

    });

});

gulp.task( "min", ["clean"], function() {

    _.each( bundles, function( obj, key ) {

        return minTask( obj.path, obj.name );

    });

});

gulp.task( "default", [ "min", "max" ] );

gulp.task("spy", function() {
    gulp.watch( "./src/**/*.scss" , [ "default" ] );
});