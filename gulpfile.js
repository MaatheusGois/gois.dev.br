const gulp = require("gulp");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const useref = require("gulp-useref");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

gulp.task("clean:dist", async function () {
  del.sync("dist");
});

gulp.task("useref", async function () {
  return gulp
    .src("*.html")
    .pipe(useref())
    .pipe(gulpIf("js/*.js", htmlmin()))
    .pipe(gulpIf("js/*.js", uglify()))
    .pipe(gulpIf("css/*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function () {
  return gulp
    .src("assets/img/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"));
});

gulp.task("build", gulp.series("clean:dist", "useref", "images"));
