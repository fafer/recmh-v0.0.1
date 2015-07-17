/*!
 *  logger
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fight
 * Released under the MIT license
 */
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: "console",
            category: "console"
        },
        {
            type: "file",
            filename: "logs/common.log",
            maxLogSize: 20480,
            backups: 3,
            category: "common"
        },
        {
            type: "file",
            filename: "logs/app.log",
            maxLogSize: 20480,
            backups: 10,
            category: "app"
        }
    ],
    replaceConsole:true,
    levels:{
        console: "debug",
        common: "debug",
        app:"debug"
    }
});

exports.getLog = function(name) {
    var logger = log4js.getLogger(name);
    return logger;
};