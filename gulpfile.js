var browserSync = require('browser-sync'),
	gulp		= require('gulp'),
    watch       = require('gulp-watch'),
	rimraf      = require('rimraf'),
    useref      = require('gulp-useref'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-clean-css'),
    rigger      = require('gulp-rigger'),
	reload 		= browserSync.reload;

var config = {
    server: { baseDir: "./app" }, 
    host: 'localhost',
    port: 3000,
    // notify: false
    tunnel: true,
    // logPrefix: "ShablonLight"
};

gulp.task('browserSync',function(){
	browserSync(config);
});

gulp.task('clean', function(cb){
    rimraf('js/*', cb);
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js',uglify()))
    .pipe(gulpif('*.css',minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
    return gulp.src('app/sass/*.+(sass|scss)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));

});
gulp.task('rigger', function(){
    return gulp.src('app/html/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('app/'))
        .pipe(reload({stream: true}));
});
gulp.task('default',['browserSync','sass','rigger'] ,function(){
	watch('app/sass/*.*', function(event, bc){
        gulp.start('sass');
    });
    watch('app/js/*.js', reload); 
    watch('app/html/*.html', function(event, bc){
        gulp.start('rigger');
    });
});