// const {src, dest, watch, parallel, series} = require('gulp');
//
// let gulp = require('gulp');
// let sass = require('gulp-sass')(require('sass'));
// let rename = require('gulp-rename')
// let browserSync = require('browser-sync').create()
// let autoprefixer = require('gulp-autoprefixer')
// let concat = require('gulp-concat')
// let uglify = require('gulp-uglify')
// let cssmin = require('gulp-cssmin')
//
// gulp.task('sass', function (){
//   return gulp.src('app/scss/**/*.scss')
//     // .pipe(sass({outputStyle: 'compressed'}))
//     // .pipe(rename({suffix: '.min'}))
//     // .pipe(autoprefixer({
//     //   overrideBrowserslist: ['last 8 versions']
//     // }))
//     // .pipe(gulp.dest('app/css'))
//     // .pipe(browserSync.reload({stream: true}))
//
//
//
//     .pipe(concat('style.min.css'))
//     .pipe(sass({ outputStyle: 'compressed' }))
//     .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
//     .pipe(dest('app/css'))
//     .pipe(browserSync.stream())
// })
//
// gulp.task('style', function () {
//   return gulp.src([
//     'node_modules/normalize.css/normalize.css',
//     'node_modules/slick-carousel/slick/slick.css',
//     'node_modules/magnific-popup/dist/magnific-popup.css'
//   ])
//     .pipe(concat('libs.min.css'))
//     .pipe(cssmin())
//     .pipe(gulp.dest('app/css'))
// })
//
// gulp.task('script', function () {
//   return gulp.src([
//     'node_modules/slick-carousel/slick/slick.js',
//     'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
//   ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.stream())
// })
//
// gulp.task('html', function () {
//   return gulp.src('app/*.html')
//     .pipe(browserSync.reload({stream: true}))
// })
//
// gulp.task('js', function () {
//   return gulp.src('app/js/*.js')
//     .pipe(browserSync.reload({stream: true}))
// })
//
// gulp.task('browser-sync', function (){
//   browserSync.init({
//     server: {
//       baseDir: "app/"
//     }
//   })
// })
//
// gulp.task('watch', function () {
//   gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
//   gulp.watch('app/*.html', gulp.parallel('html'));
//   gulp.watch('app/js/*.js', gulp.parallel('js'));
// })
//
// gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))




const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
let cssmin = require('gulp-cssmin');

function pages() {
  return src('app/*.html')
    .pipe(browserSync.stream())
}
//
// function fonts() {
//   return src('app/fonts/src/*.*')
//     .pipe(fonter({
//       formats: ['woff', 'ttf']
//     }))
//     .pipe(src('app/fonts/*.ttf'))
//     .pipe(ttf2woff2())
//     .pipe(dest('app/fonts'))
// }


// function images() {
//   return src(['app/images/src/*.*', '!app/images/src/*.svg'])
//     .pipe(newer('app/images'))
//     .pipe(avif({quality: 50}))
//
//     .pipe(src('app/images/src/*.*'))
//     .pipe(newer('app/images/dist'))
//     .pipe(webp())
//
//     .pipe(src('app/images/src/*.*'))
//     .pipe(newer('app/images'))
//     .pipe(imagemin())
//
//     .pipe(dest('app/images'))
// }
//
// function sprite() {
//   return src('app/images/*.svg')
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg',
//           example: true
//         }
//       }
//     }))
//     .pipe(dest('app/images/'))
// }

// function spriteReuse() {
//   return src('app/images/sprite.svg')
//     .pipe(dest('app/images/'))
// }

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src(
    'node_modules/rateyo/src/jquery.rateyo.css',
    'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
  )
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function sass() {
  return src(
    'app/scss/style.scss',
  )
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
  watch(['app/scss/*.scss'], sass)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

exports.sass = sass;
exports.pages = pages;
exports.scripts = scripts;
exports.watching = watching;

exports.default = parallel(styles, scripts, sass, pages, watching)