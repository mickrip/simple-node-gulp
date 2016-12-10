const gulp = require("gulp");
const babel = require("gulp-babel");
const del = require("del");
const watch = require("gulp-watch");
const shell = require("gulp-shell");
const runSequence = require("run-sequence");

const config = {
  src: "src/",
  dest: "dist/"
};

gulp.task("clean", function () {
  return del([
    config.dest + "**/*"
  ]);
});

gulp.task("js", () => {
  return gulp.src(config.src + "**/*.js")
    .pipe(babel({presets: ["es2015"]}))
    .on("error", errHandler)
    .pipe(gulp.dest(config.dest));
});

gulp.task("runmain", shell.task([
  "node dist/main.js"
]));

gulp.task("watch", () => {
  gulp.watch(config.src + "**/*.js", ["compileAndRun"]);
});

gulp.task("compileAndRun", (cb) => {
  runSequence("clean", "js", "runmain", cb);
});

gulp.task("default", ["compileAndRun", "watch"]);

const errHandler = (err) => {
  console.log(`\n${err.name} - ${err.message}\n`);
};