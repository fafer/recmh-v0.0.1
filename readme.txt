设置全局安装路径
npm config set prefix "D:\nodejs\global"
npm config set cache "D:\nodejs\cache"

设置全局模块查找path
NODE_PATH="D:\nodejs\global\node_modules"

添加"D:\nodejs\global"到path下

安装jshint、browserify等模块

编译node代码给front-end使用

browserify source.js > dest.js

页面引入 dest.js 执行效果同node端一样


