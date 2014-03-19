// Load plugins
var gulp = require('gulp')
var gutil = require('gulp-util')
//var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var concat = require('gulp-concat')
//var notify = require('gulp-notify')
var cache = require('gulp-cache')
var supervisor = require('gulp-supervisor')
var shell = require('shelljs')
var pjson = require('./package.json')
var svgsprites = require('gulp-svg-sprites')
var htmltemplate = require('gulp-template')
var htmlminify = require('gulp-minify-html')

var config = require('./conf/config')

var nodeversion, nodepath, cwd

if (!shell.which('n')) {
  gutil.log('n not found. Please install it to enable node versioning.')
  process.exit(1)
} else {
  nodeversion = pjson.engines.node
  nodepath = shell.exec( 'n bin ' + nodeversion ).output
  cwd = shell.exec('pwd')
}


// Styles
  gulp.task('styles', function() {
    return gulp.src(config.src + 'css/*.css')
     .pipe(concat('all.css'))
     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
     .pipe(gulp.dest(config.public + 'css'))
     .pipe(rename({ suffix: '.min' }))
     .pipe(minifycss())
     .pipe(gulp.dest(config.public + 'css'))
})
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src(config.src + 'js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(config.public + 'js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(config.public + 'js'))
})

// Images
gulp.task('images', function() {
  return gulp.src(config.src + 'i/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 4, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.public + 'i'))
})

// Sprites
gulp.task('sprites', function () {
  var svg = svgsprites.svg
  var png = svgsprites.png
  var svgconfig = {
    cssFile: 'css/sprites.css',
    svgFile: 'i/sprites.svg',
    className: '.icon-%f'
  }
  return gulp.src(config.src + 'svg/*.svg')
    .pipe(svg(svgconfig))
    .pipe(minifycss())
    .pipe(gulp.dest(config.public))
    .pipe(png())
    .pipe(cache(imagemin({ optimizationLevel: 4 })))
    .pipe(gulp.dest(config.public))
})

// Html
gulp.task('html', function() {
  var opts = {}
  return gulp.src(config.src + 'html/*.html')
    .pipe(htmltemplate( { debug: config.debug } ))
    .pipe(htmlminify(opts))
    .pipe(gulp.dest(config.public))
})

// Clean
gulp.task('clean', function() {
  return gulp.src([config.public + 'html', config.public + 'css', config.public + 'js', config.public + 'i'], {read: false})
    .pipe(clean())
})
 
gulp.task('watch', function() {
  // Watch .html files
  gulp.watch(config.src + 'html/**/*.html', ['html'])

  // Watch .css files
  gulp.watch(config.src + 'css/**/*.css', ['styles'])

  // Watch .svg files
  gulp.watch(config.src + 'svg/**/*.svg', ['sprites'])

  // Watch .js files
  gulp.watch(config.src + 'js/**/*.js', ['scripts'])

  // Watch image files
  gulp.watch(config.src + 'i/**/*', ['images'])

})

gulp.task( 'supervisor', function() {
  supervisor('server/app.js', {
    args: [],
    watch: [ '.' ],
    ignore: [ 'node_modules', 'src' ],
    //pollInterval: 500,
    extensions: [ 'js', 'json' ],
    //extensions: [ 'html|js|json' ],
    exec: nodepath,
    debug: true,
    //debugBrk: false,
    harmony: true,
    noRestartOn: 'error',
    //forceWatch: true,
    quiet: false
  } )
} )

gulp.task( 'default', ['clean', 'images', 'sprites', 'scripts', 'styles', 'html', 'watch', 'supervisor'], function () {
  gutil.log( 'Running server on ' + config.port )
})