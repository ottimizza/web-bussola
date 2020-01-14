const gulp = require('gulp');

gulp.task('compress', function() {
	return gulp.src(['./dist/**/*.*']).pipe(gulp.dest('./dist'));
});
