var gulp = require("gulp");
var jq = require("jquery");

// 压缩html
var htmlClean = require("gulp-htmlclean");

// 压缩图片
var imageMin = require("gulp-imagemin");

// 压缩js
var uglify = require("gulp-uglify");

// 去掉js中的调试语句
var debug = require("gulp-strip-debug");

// 将less转化成css
var less = require("gulp-less");

// 压缩css
var cleanCss = require("gulp-clean-css");

// postcss autoprefixer
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// 开启服务器
var connect = require("gulp-connect");

// 判断当前环境变量
var devMod = process.env.NODE_ENV !== "development";
// git中使用export NODE_ENV=development设置环境变量

console.log(devMod);

var folder = {
    src:"src/",
    dist:"dist/"
};

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
            .pipe(connect.reload()) //自动刷新浏览器
        if(!devMod){
            page.pipe(htmlClean());
        }
            page.pipe(gulp.dest(folder.dist + "html/"));
})

gulp.task("image",function(){
    gulp.src(folder.src + "images/jakob-owens-208991.jpg")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images/test.jpg"));
})

gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
                .pipe(connect.reload())
                .pipe(less())
                .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
            page.pipe(gulp.dest(folder.dist + "css/"));
})

gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
                .pipe(connect.reload())
        if(!devMod){
            page.pipe(uglify())
                .pipe(debug())
        }
            page.pipe(gulp.dest(folder.dist + "js"));
})

gulp.task("server",function(){
    connect.server({
        port: "8888",
        livereload: true //会改变文件中的内容但浏览器中不会自动刷新
    });
})

// 监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
})
gulp.task("default",["html","css","js","server","watch"]);