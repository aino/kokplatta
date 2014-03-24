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
var browserify = require('gulp-browserify')
var less = require('gulp-less')
var es = require('event-stream')
var streamqueue = require('streamqueue')

var pjson = require('./package.json')
var config = require('./conf/config')


// Echo to HTML
var echo = function(obj) {
  return gulp.src(config.src + 'html/*.html')
    .pipe(htmltemplate(obj, {
      'interpolate': /{{([\s\S]+?)}}/g
    }))
    .pipe(htmlminify(opts))
    .pipe(gulp.dest(config.public))
}

// Raise error
var raise = function(err) {
  console.error(err.stack)
  echo({ 
    errmsg: '<pre>'+err.stack+'</pre>',
    appname: 'Error'
  })
}

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

// Html
gulp.task('html', function() {
  return echo({
    errmsg: '',
    appname: pjson.name || 'Name your app'
  })
})

// Clean
gulp.task('clean', function() {
  return gulp.src([config.public + 'html', config.public + 'css', config.public + 'js', config.public + 'i'], {read: false})
    .pipe(clean())
})

// Build lib css+js
gulp.task('bundle:libs', function() {
  
  var scriptpaths = config.bowerlibs.map(function(p) {
    return path.resolve('bower_components', p)
  })
  
  var stylepaths = config.bowerstyles.map(function(p) {
    return path.resolve('bower_components', p)
  })

  return es.concat(
    streamqueue({ objectMode: true },
      gulp.src(scriptpaths),
      gulp.src(config.src + 'js/_lib.js').pipe(browserify( { require: config.libs } ))
    )
      .pipe(concat('lib.bundle.js'))
      //.pipe(uglify())
      .pipe(gulp.dest(config.public + 'js')),
    gulp.src( stylepaths )
      .pipe(concat('lib.bundle.css'))
      .pipe(minifycss())
      .pipe(gulp.dest(config.public + 'css'))
  )
})

// Build app js
gulp.task('bundle:appscripts', function(cb) {

  return es.concat(
    gulp.src( config.src + 'js/index.js', { read: false } )
      .pipe(browserify({ 
        transform: ['reactify', 'debowerify'], 
        external: config.libs,
        debug: true 
      }))
      .on('error', raise)
      .pipe(rename('app.bundle.js'))
      //.pipe(uglify())
      .pipe(gulp.dest(config.public + 'js')),
    gulp.src( config.src + 'js/loader.js' )
      .pipe(rename('i'))
      .pipe(uglify({mangle:false}))
      .pipe(gulp.dest( config.public + 'js' ))
  )

})

// Build app css
gulp.task('bundle:appstyles', function() {
  return gulp.src(config.src + 'css/app.css')
    //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 2')) // <!-- production
    .pipe(less({ sourceMap: true, silent: true }))  // <-- development
    .pipe(rename('app.bundle.css'))
    //.pipe(minifycss()) // <-- production
    .pipe(gulp.dest(config.public + 'css'))
})

gulp.task('watch', function() {
  gulp.watch(config.src + 'js/**/*.js', ['bundle:appscripts', 'html'])
  gulp.watch(config.src + 'html/**/*.html', ['html'])
  gulp.watch(config.src + 'css/**/*.css', ['bundle:appstyles'])
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

gulp.task( 'build:app', ['html', 'bundle:appscripts', 'bundle:appstyles'], function () {
  gutil.log( 'Build done' )
})

gulp.task( 'build:libs', ['bundle:libs'], function () {
  gutil.log( 'Build done' )
})

gulp.task( 'default', ['build:app', 'watch', 'supervisor'], function () {
  gutil.log( 'Running server on ' + config.port )
})