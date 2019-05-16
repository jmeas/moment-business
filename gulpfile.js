var { dest, task, series, src, parallel, watch } = require('gulp');
var $ = require('gulp-load-plugins')({
  replaceString: /^gulp(-|\.)([0-9]+)?/
});
const fs = require('fs');
const del = require('del');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');
const to5ify = require('6to5ify');
const isparta = require('isparta');
const esperanto = require('esperanto');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const manifest = require('./package.json');
const config = manifest.to5BoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

// Remove the built files
task('clean', cb => del([destinationFolder], cb));

// Remove our temporary files
task('clean-tmp', cb => del(['tmp'], cb));

// Send a notification when JSHint fails,
// so that you know your changes didn't build
function jshintNotify(file) {
  if (!file.jshint) { return; }
  return file.jshint.success ? false : 'JSHint failed';
}

function jscsNotify(file) {
  if (!file.jscs) { return; }
  return file.jscs.success ? false : 'JSRC failed';
}

// Lint our source code
task('lint-src', () => {
  return src(['src/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(jshintNotify))
    .pipe($.jscs())
    .pipe($.notify(jscsNotify))
    .pipe($.jshint.reporter('fail'));
});

// Lint our test code
task('lint-test', () => {
  return src(['test/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(jshintNotify))
    .pipe($.jscs())
    .pipe($.notify(jscsNotify))
    .pipe($.jshint.reporter('fail'));
});

// Build two versions of the library
task('build', series('lint-src', 'clean', async (done) => {
  let bundle = await esperanto.bundle({
    base: 'src',
    entry: config.entryFileName,
  });

  let res = bundle.toUmd({
    sourceMap: true,
    sourceMapSource: config.entryFileName + '.js',
    sourceMapFile: exportFileName + '.js',
    name: config.exportVarName
  });

  // Write the generated sourcemap
  mkdirp.sync(destinationFolder);
  fs.writeFileSync(path.join(destinationFolder, exportFileName + '.js'), res.map.toString());

  $.file(exportFileName + '.js', res.code, { src: true })
    .pipe($.plumber())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.to5({ blacklist: ['useStrict'] }))
    .pipe($.sourcemaps.write('./', {addComment: false}))
    .pipe(dest(destinationFolder))
    .pipe($.filter(['*', '!**/*.js.map']))
    .pipe($.rename(exportFileName + '.min.js'))
    .pipe($.uglifyjs({
      outSourceMap: true,
      inSourceMap: destinationFolder + '/' + exportFileName + '.js.map',
    }))
    .pipe(dest(destinationFolder))
    .on('end', done);
}));

// Bundle our app for our unit tests
task('browserify', () => {
  var testFiles = glob.sync('./test/unit/**/*');
  var allFiles = ['./test/setup/browserify.js'].concat(testFiles);
  var bundler = browserify(allFiles);
  bundler.transform(to5ify.configure({
    sourceMapRelative: __dirname + '/src',
    blacklist: ['useStrict']
  }));
  var bundleStream = bundler.bundle();
  return bundleStream
    .on('error', err => {
      console.log(err.message);
      this.emit('end');
    })
    .pipe($.plumber())
    .pipe(source('./tmp/__spec-build.js'))
    .pipe(dest(destinationFolder))
    .pipe($.livereload());
});

function test() {
  return src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.plumber())
    .pipe($.mocha({reporter: 'dot', globals: config.mochaGlobals}));
}

task('coverage', done => {
  src(['src/*.js'])
    .pipe($.plumber())
    .pipe($.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      return test()
      .pipe($.istanbul.writeReports())
      .on('end', done);
    });
});

// Lint and run our tests
task('test', series(parallel('lint-src', 'lint-test'), () => {
  // require('6to5/register')({modules: 'common'});
  return test();
}));

// Ensure that linting occurs before browserify runs. This prevents
// the build from breaking due to poorly formatted code.
task('build-in-sequence', series('lint-src', 'lint-test', 'browserify'));

// Run the headless unit tests as you make changes.
task('watch', () => watch(['src/**/*', 'test/**/*', '.jshintrc', 'test/.jshintrc'], 'test'));

// Set up a livereload environment for our spec runner
task('test-browser', series('build-in-sequence', () => {
  $.livereload.listen({port: 35729, host: 'localhost', start: true});
  return watch(
    ['src/**/*.js', 'test/**/*', '.jshintrc', 'test/.jshintrc'],
    'build-in-sequence'
  );
}));

// An alias of test
task('default', series('test'));