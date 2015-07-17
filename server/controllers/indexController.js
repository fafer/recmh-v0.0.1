/*!
 *  
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fafer
 * Released under the MIT license
 */

'use strict';
 
exports.home = function(req,res,next) {
    console.log('home');
    res.render( 'home',{
        name:['one','two','three']
    });
};

exports.login = function(req,res,next) {
    console.log('login')
    res.render( 'account/login');

};

exports.logout = function(req,res,next) {
    console.log('logout')
    res.render( 'account/logout');
};

 
