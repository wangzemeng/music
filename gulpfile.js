var gulp = require("gulp");
var connect =require("gulp-connect");
var less = require("gulp-less");
var js = 
// gulp.task("task1")
// gulp.task("html",["task1"],function() {
//     console.log(111)
// })
gulp.task("html",function(){
    gulp.src("./src/index.html")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist"))
})
gulp.task("watch",function(){
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/js/*.js")
    gulp.watch("./src/less/*.less",["less"]);
})
gulp.task("server",function(){
    connect.server({
        root: "./dist",
        port: 8091,
        livereload: true
    })
})
gulp.task("less",function(){
    gulp.src("./src/less/*.less")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload())
})
gulp.task("default",["html","watch","server","less","js"],function(){
    
})