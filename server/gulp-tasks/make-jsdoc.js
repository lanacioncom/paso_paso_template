/** in dev */
var gulp = require('gulp'),
	jsdoc = require("gulp-jsdoc")
;
var conf = require('../conf').conf;


// default task
gulp.task('make_jsdoc', function() {
	gulp.src(["js/**/*.js", "./DOC_WEBAPP/README.md"], { cwd: conf.app_cwd })
	  .pipe(jsdoc.parser())
	  .pipe(jsdoc('./DOC_WEBAPP'));

});
