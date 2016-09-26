import gulp from 'gulp';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';

// post css processors
import customProperties from 'postcss-custom-properties';
import customMedia from 'postcss-custom-media';
import flexbugsfixes from 'postcss-flexbugs-fixes';
import cssFor from 'postcss-for';
import importPlugin from 'postcss-import';

// minify
import csso from 'gulp-csso';

let watching = false;

const processors = [
  importPlugin,
  customProperties,
  customMedia,
  cssFor,
  flexbugsfixes
]

const plumberCallback = function() {
  // https://github.com/floatdrop/gulp-plumber/issues/30#issuecomment-191682090
  this.emit('end');
}

const build = (source, dest) => {
  return gulp.src(source)
    .pipe(watching ? plumber(plumberCallback) : gutil.noop())
    .pipe(postcss(processors))
    .pipe(gulp.dest(dest))
    .pipe(csso())
    .pipe(gulp.dest(dest))
}

const watch = (target, task) => {
  watching = true;
  gulp.watch(target, [task])
}

gulp.task('build', () => build('index.css', 'dist'));
gulp.task('watch', () => watch('index.css', 'build'));
gulp.task('build:example', () => build('examples/index.css', 'examples/dist'));
gulp.task('watch:example', () => watch(['index.css', 'examples/index.css'], 'build:example'));
