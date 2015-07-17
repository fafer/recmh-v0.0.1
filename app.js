/*!
 *  
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fafer
 * Released under the MIT license
 */

'use strict';

var log = require('./config/logger'),
    join = require('path').join,
    http = require('http'),
    https = require('https'),
    express = require('express');

/**
 * 创建express实例
 */
var app = express();

/**
 * express启用log4js日志管理
 */
log.use(app);

/**
 * 设置静态资源文件目录
 */
app.use(express.static(join(__dirname,'web')));

/**
 * 设置模板资源文件目录，对应路由配置
 */
app.set( 'view engine', 'ejs' );
app.set( 'views', join( __dirname, '/server/views' ) );

/**
 * 设置模板引擎，express默认使用的jade
 */
//app.engine( 'jade' , require( 'jade' ).__express);

/**
 * 设置express使用EJS模板引擎
 */
app.engine( 'ejs' , require( 'ejs' ).__express);

/**
 * 加载路由设置
 */
require('./server/router')(app);

/**
 * express启动web服务
 */
app.listen(3000);

/**
 * 启动web服务，express实例等同于原始http的回调
 */
//http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);


 
