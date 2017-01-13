/**
 * Created by webhugo on 1/13/17.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var del = require('del');

//压缩css
gulp.task('minifycss', function () {
    return gulp.src('./view/css/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('./public/css'))   //输出文件夹
});

//压缩js
gulp.task('minifyjs', function () {
    return gulp.src('./view/js/*.js')
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./public/js'));  //输出
});

// 移动文件
gulp.task('mv', function () {
    return gulp.src('./view/img/*')
        .pipe(gulp.dest('./public/img'))
});

// 执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['./public/css', './public/js','./public/img'], cb)
});
// 默认任务
gulp.task('default', function () {
    gulp.run('clean','minifycss', 'minifyjs','mv');

    // 监听文件变化
    // gulp.watch('./view/*', function(){
    //     gulp.run('clean','minifycss', 'minifyjs','mv');
    // });
});