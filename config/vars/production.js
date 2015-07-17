// production settings
var path = require( 'path' );

module.exports = {
    env: 'production',
    app: {
        name: 'FangCheng'
    },
    server: {
        port: 3000,
        hostname: 'localhost'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    mongod: process.env.MONGODB || 'mongodb://localhost/fangcheng',
    root: path.normalize( __dirname + '/../..' ),
    sessionSecret: process.env.SESSION_SECRET || 'FangCheng',
    apiurl: 'http://127.0.0.1:9698/',
    domain: 'www.fangcheng.cn',
    // Copy in your particulars and rename this to mail.js

    whitelist: [ '/api/upload', '/questions/answer/upload' ],
    mail: {
        service: "error_log",
        host: "smtp.163.com",
        port: 25,
        secureConnection: false,
        name: "163.com",
        auth: {
            user: "fangcheng_log@163.com",
            pass: "log1205"
        },
        ignoreTLS: false,
        debug: true,
        maxConnections: 5 // Default is 5
    },
    oss: {
        accessKeyId: 'jiofjaosdfasdif',
        accessKeySecret: 'fjiaoifMOIFOA()(42901',
        host: 'beijing.example.com',
        bucket: 'test'
    },
    weibo: {
        clientID: "18412341234",
        clientSecret: "620aab5jioiafosijdfiasdf894123",
        callbackURL: "http://www.xxx.com/auth/weibo/callback",
        passReqToCallback: true
    },
    renren: {
        clientID: "ba40c5205da348c18",
        clientSecret: "5095fd114fasdf0da9b1e87eee70",
        callbackURL: "http://www.xxx.com/auth/renren/callback",
        passReqToCallback: true
    },
    qq: {
        clientID: "101101356fasf",
        clientSecret: "6a1ifaisdfi13124fdb5c28",
        callbackURL: "http://www.xxx.com/auth/qq/callback",
        passReqToCallback: true
    },
    linkedin: {
        clientID: "75d51iuwfn",
        clientSecret: "xlvBqhfoasdfasdYm4lKLjNNb",
        callbackURL: "http://www.xxx.com/auth/linkedin/callback",
        passReqToCallback: true
    }
};
