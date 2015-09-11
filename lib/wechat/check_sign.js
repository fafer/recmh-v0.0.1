var sign = require('./sign.js');
var request = require( 'request' );

var config = {
    appID:'wx9037bc18a8016fb5',
    appSecret:'c15c32f6f2ca373cd3b4545e768133db',
    url:'http://test.fangcheng.cn/test'
};

var SIGNATURE = {
    appId:config.appID,
    jsapi_ticket:'',
    nonceStr:'',
    timestamp:'',
    url:'',
    signature:'',
    beginTime:(new Date()).getTime(),
    expires_in:7200,
    status:false
},INTERVAL = 30 * 1000 * 60,//30分钟
  signatureTimer = new SignatureTimer();



var accsess_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appID+"&secret="+config.appSecret;

function getSignature(callback) {
    request.get( accsess_url, function(err, response, body ) {
        try {
            var access = JSON.parse( body );
            SIGNATURE.expires_in = access.expires_in;
            request.get( "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access.access_token+"&type=jsapi", function(err, response, body ) {
                var ticket = JSON.parse( body).ticket;
                var _sign = sign(ticket, config.url);
                SIGNATURE.jsapi_ticket = _sign.jsapi_ticket;
                SIGNATURE.nonceStr = _sign.nonceStr;
                SIGNATURE.timestamp = _sign.timestamp;
                SIGNATURE.url = _sign.url;
                SIGNATURE.signature = _sign.signature;
                SIGNATURE.status = true;
                SIGNATURE.beginTime = (new Date()).getTime();
                if(typeof callback === 'function') {
                    callback(SIGNATURE);
                }
            });
        } catch(e) {
            if(typeof callback === 'function') {
                callback(SIGNATURE);
            }
            console.log('get weixin signature error');
        }
    } );
}

function SignatureTimer() {

    function worker() {
       var currentTime = (new Date()).getTime(),
           dur = currentTime - SIGNATURE.beginTime;
       if(dur > 7200 * 1000 * 0.9) {
           getSignature();
       }
    }

    return {
        started:false,
        start:function(){
            if(!this.interval && !this.started) {
                this.interval = setInterval(worker,INTERVAL);
                this.started = true;
            }
        },
        stop:function() {
            if(this.interval) {
                clearInterval(this.interval);
                delete this.interval;
                this.started = false;
            }
        }
    }
}

exports.getSignature = function(callback) {
    if(!SIGNATURE.status) {
        getSignature(callback);
        if(!signatureTimer.started) {
            signatureTimer.start();
        }
    } else {
        callback(SIGNATURE);
    }
};



