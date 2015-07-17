var production = require( './vars/production' );
var test = require( './vars/test' );
var develop = require( './vars/develop' );

process.env.NODE_ENV = process.env.NODE_ENV || 'develop';

if ( process.env.NODE_ENV.replace( /\W/g, '' ) === 'production' ) {
    module.exports = production;
}
if ( process.env.NODE_ENV.replace( /\W/g, '' ) === 'test' ) {
    module.exports = test;
}
if ( process.env.NODE_ENV.replace( /\W/g, '' ) === 'develop' ) {
    module.exports = develop;
}
