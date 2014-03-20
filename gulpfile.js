// Load plugins
var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var concat = require('gulp-concat')
var cache = require('gulp-cache')
var supervisor = require('gulp-supervisor')
var shell = require('shelljs')
var htmltemplate = require('gulp-template')
var htmlminify = require('gulp-minify-html')
var browserify = require('gulp-browserify');

// Configs
var pjson = require('./package.json')
var config = require('./conf/config')
var shims = ['es5-shim/es5-shim.js', 'html5shiv/dist/html5shiv.js']
var libs = ['react', 'jquery', 'underscore', 'backbone']

// Check if installed version of node is enough. Need >=0.11
// Else, check if n is installed and use that
var nodeversion = process.version
var nodepath = ''
if ( ~~nodeversion.match(/\d+\.(\d+)/)[1] > 10 ) {
  nodepath = shell.which('node')
} else if (shell.which('n')) {
  nodeversion = pjson.engines.node
  nodepath = shell.exec( 'n bin ' + nodeversion ).output
} else {
  gutil.log('n not found. Please install it to enable node versioning.')
  process.exit(1)
}

// Styles
gulp.task('styles', function() {
  return gulp.src(config.src + 'css/main.css')
   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 2'))
   .pipe(gulp.dest(config.public + 'css'))
})

// Shims
gulp.task('shims', function() {
  var paths = shims.map(function(p) {
    return path.resolve('bower_components', p)
  })
  return gulp.src(paths)
    .pipe(concat('shims.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.public + 'js'))
})

// Html
gulp.task('html', function() {
  var opts = {}
  return gulp.src(config.src + 'html/*.html')
    .pipe(htmltemplate( { 
      debug: config.debug,
      appname: pjson.name || 'Name your app'
    }, {
      'interpolate': /{{([\s\S]+?)}}/g
    } ))
    .pipe(htmlminify(opts))
    .pipe(gulp.dest(config.public))
})

// Clean
gulp.task('clean', function() {
  return gulp.src([config.public + 'html', config.public + 'css', config.public + 'js', config.public + 'i'], {read: false})
    .pipe(clean())
})

// Build external libs with browserify
gulp.task('browserify:libs', function() {
  gutil.log('Building libs');
  gulp.src( config.src + 'js/index.js', { read: false } )
    .pipe(browserify( { transform: ['reactify'], require: libs } ))
    .pipe(rename('libs.bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.public + 'js'))
    .on('error', function() {
      gutil.log('Error building libs')
    })
});

// Build app
gulp.task('browserify:app', function() {
  gutil.log('Building app');
  gulp.src( config.src + 'js/index.js', { read: false } )
    .pipe(browserify( { transform: ['reactify'], external: libs } ))
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest(config.public + 'js'))
    .on('error', function() {
      gutil.log('Error when building app')
    })
});

gulp.task('watch', function() {
  gulp.watch(config.src + 'js/**/*.js', ['browserify:app'])
  gulp.watch(config.src + 'html/**/*.html', ['html'])
  gulp.watch(config.src + 'css/**/*.scss', ['styles'])
  gulp.watch(config.src + 'i/**/*', ['images'])
  gulp.watch('gulpfile.js', ['build:libs', 'build:app'])
})

gulp.task( 'supervisor', function() {
  supervisor('server/app.js', {
    args: [],
    watch: [ 'node_modules', 'server', 'conf' ],
    extensions: [ 'js', 'json' ],
    exec: nodepath,
    debug: true,
    harmony: true,
    noRestartOn: 'error',
    quiet: false
  } )
} )

gulp.task( 'build:app', ['browserify:app', 'styles', 'html'], function () {
  gutil.log( 'Build done' )
})

gulp.task( 'build:libs', ['shims', 'browserify:libs'], function () {
  gutil.log( 'Build done' )
})

gulp.task( 'default', ['clean', 'build:libs', 'build:app', 'watch', 'supervisor'], function () {
  gutil.log( 'Running server on ' + config.port )
})