/*!
 *  
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fafer
 * Released under the MIT license
 */

'use strict';

var fs = require('fs');
var join = require('path').join;
var logger = require('../config/logger').getDefault();
var initial = false;
var routePath = join(__dirname,'routers');
module.exports = function(app,passport) {
    if(initial) return;
    initial = true;
    fs.readdir(routePath,function(err,files) {
        if(err) logger.error(routePath+',this path not found!');
        else {
            files.forEach(function(file) {
                require(join(routePath,file))(app,passport);
            });
        }
        loadDefaultRoute(app,passport);
    });
};

function loadDefaultRoute(app,passport) {
    app.get( '*', function(req,res) {
        if ( ( /json|txt|js|css|gif|png|jpg|jpeg|ico/ ).test( req.url ) ) {
            res.status( 404 ).end();
        } else {
            res.statusCode = 404;
            res.render( '404');
        }
    });
}
 
