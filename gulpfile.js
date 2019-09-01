var gulp =require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

var paths = {
    "scss":{
        src: "src/styles/*.scss",
        dest: "src/styles"
    }
}

gulp.task('sass',function(){
    return gulp.src(paths.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scss.dest))
});
