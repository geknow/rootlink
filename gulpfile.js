/**
 * Created by webhugo on 1/13/17.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    gLess=require('gulp-less'),// 编译less生成css文件
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息

// 合并、压缩、重命名css
gulp.task('css', function () {
    return gulp.src('view/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dest/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({message: 'css task ok'}));
});

// 合并、压缩js文件
gulp.task('js', function () {
    return gulp.src('view/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(notify({message: 'js task ok'}));
});

// 移动文件
gulp.task('mv', function () {
    return gulp.src('./view/img/*')
        .pipe(gulp.dest('./public/img'))
});

// 压缩图片
gulp.task('img', function () {
    return gulp.src('view/img/*')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('public/img/'))
        .pipe(notify({message: 'img task ok'}));
});

// 默认任务
gulp.task('default', function () {
    gulp.run('css', 'js', 'img', 'mv');

    // 监听文件变化
    // gulp.watch('./view/*', function(){
    //    gulp.run('css', 'js','mv');
    // });
});