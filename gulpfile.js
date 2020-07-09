//一、先导入插件
let gulp = require('gulp');
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')
let rename = require('gulp-rename')
let cssnano = require('gulp-cssnano')
let webserver = require('gulp-webserver')
let htmlmin = require('gulp-htmlmin')
let sass = require('gulp-sass')
// 压缩图片
let imagemin = require('gulp-imagemin')


// 二、处理任务
//测试任务
// function fnTest(){
//     console.log('hello');
// }

// 首页处理
function fnIndex(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}
// 处理html的指令：压缩
function fnHtml(){
    return gulp.src("./src/pages/**/*")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/pages"))
}
//处理js的任务
function fnJS(){
    return gulp.src('./src/js/es6/*.js')
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/js'))
}
//处理css任务
function fnCSS(){
    return gulp.src('./src/sass/*.css')
    .pipe(cssnano())
    // .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}
// sass文件的处理
function fnSass(){
    return gulp.src("./src/sass/*")
            .pipe(sass({outputStyle:'expanded'}))
            // .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            // .pipe(cssmin())
            // .pipe(gulp.dest("./src/css"))
            .pipe(gulp.dest("./dist/css"))
}
// 转存图片
function fnImagemin(){
    return gulp.src('./src/img/**/*')
    // .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
// data数据的批量转存
function fnCopyData(){
    return gulp.src("./src/data/**/*")
            .pipe(gulp.dest("./dist/data"))
}
// libs插件
function fnLibs(){
    return gulp.src("./src/libs/**/*")
            .pipe(gulp.dest("./dist/libs"))
}
// 监听所有文件，只要有文件发生改变了，执行对应功能
function fnWatchAll(qwe){
    gulp.watch("./src/index.html",fnIndex);
    gulp.watch("./src/pages/**/*",fnHtml);
    gulp.watch("./src/sass/**/*",fnSass);
    gulp.watch("./src/js/**/*",fnJS);
    gulp.watch("./src/libs/**/*",fnLibs);
    gulp.watch("./src/data/**/*",fnCopyData)

    // qwe();
}
// 定义服务器功能
function fnServer(){
    return gulp.src("./dist")
        .pipe(webserver({
            host:"localhost",//
            port:"3000",
            livereload:true,
            open:"./index.html",
            proxies:[{
                // source属性用来表示，代理之后的地址
                // 在前端的ajax内，直接请求：http://localhost:3000/abc
                source:"/abc",
                // target属性用来标志要代理的跨域地址
                target:"https://wanandroid.com/wxarticle/chapters/json"
            }]
        }))
}

//三、导出任务
// module.exports.default = fnTest;
exports.index = fnIndex;
exports.html = fnHtml;
exports.js = fnJS;
exports.css = fnCSS;
exports.sass = fnSass;
exports.imagemin = fnImagemin
exports.data = fnCopyData
exports.libs = fnLibs
exports.watchAll = fnWatchAll;
exports.server = fnServer;
// exports.all = gulp.parallel(fnIndex,fnHtml,fnJS,fnCSS,fnSass,fnCopyData,fnLibs,fnWatchAll,fnServer);
exports.all = gulp.series(
    gulp.parallel(fnIndex,fnHtml,fnJS,fnCSS,fnSass,fnCopyData,fnLibs,fnImagemin)
    ,
    gulp.parallel(fnWatchAll,fnServer)
)