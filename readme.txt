设置全局安装路径
npm config set prefix "D:\nodejs\global"
npm config set cache "D:\nodejs\cache"

设置全局模块查找path,这样项目才能直接require到全局模块，否则只能命令行，或者copy模块到项目中
NODE_PATH="D:\nodejs\global\node_modules"

添加"D:\nodejs\global"到path下

安装jshint、browserify等模块

编译node代码给front-end使用

browserify source.js > dest.js

页面引入 dest.js 执行效果同node端一样

安装forever
npm install forever -g

项目内部使用forever的话，安装forever-monitor
npm install forever-monitor --save


