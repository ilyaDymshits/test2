"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csso = require("gulp-csso");
// var server = require("browser-sync").create();
// var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore");
// var svgmin = require("gulp-svgmin");
var sequence = require("gulp-sequence");
var del = require("del");

// remui  -style

gulp.task("clean", function() {
  return del("build/custom-style.css");
});

gulp.task("style", function() {

  gulp.src("style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions"]}),
      mqpacker({sort: true})
    ]))
    .pipe(rename("custom-style.css"))
    .pipe(gulp.dest("build"));
    // .pipe(csso())
    // .pipe(rename("style.css"))
    // .pipe(gulp.dest("../blocks/search_custom/css"))
    // .pipe(server.stream());
});


gulp.watch("*.scss", ["style"]);

gulp.task("build_remui", function(end) {
  sequence("clean","style", end);
});
