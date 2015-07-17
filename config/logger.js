/*!
 *  logger
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fafer
 * Released under the MIT license
 */
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        },
        {
            type: 'express',
            filename: 'logs/express.log',
            pattern: '_yyyy-MM-dd',
            alwaysIncludePattern: false,
            category: 'express'
        },
        {
            type: 'file',
            filename: 'logs/common.log',
            maxLogSize: 20480,
            backups: 3,
            category: 'common'
        },
        {
            type: 'file',
            filename: 'logs/app.log',
            maxLogSize: 20480,
            backups: 10,
            category: 'app'
        }
    ],
    replaceConsole:true,
    levels:{
        console: 'debug',
        express: 'debug',
        common: 'debug',
        app:'debug'
    }
});

exports.getLog = function(name) {
    var logger = log4js.getLogger(name);
    return logger;
};

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(exports.getLog('express'), {level:'debug', format:':method :url'}));
};
