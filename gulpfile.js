'use strict';
const gulp = require('gulp'),
include = require('gulp-include'),
uglify = require('gulp-uglify'),
rename = require("gulp-rename");

gulp.task('default', ['gcpi', 'watch']);

gulp.task('gcpi', function() {
	gulp.src('./gcpi.js')
	.pipe( include() )
	.pipe( gulp.dest('dist/') );
	return;
});

gulp.task('watch', function() {
	gulp.watch('./gcpi.js', ['gcpi']);
	return;
})

gulp.task('build', function() {
	gulp.src('./gcpi.js')
	.pipe( include() )
	.pipe( gulp.dest('dist/') )
	.pipe( uglify() )
	.pipe( rename('gcpi.min.js') )
	.pipe( gulp.dest('dist/') );
	return;
});
