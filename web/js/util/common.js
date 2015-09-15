/*!
 *  
 * https://www.recmh.com
 *
 * Copyright 2015-2020 fafer
 * Released under the MIT license
 */
var commonUtil = {
    //判断对象是否为空
    isBlank:function(obj) {
        var blank = false;
        switch(typeof obj) {
            case 'undefined':
                blank = true;
                break;
            case 'object':
                if(obj === null) {
                    blank = true;
                } else if(obj instanceof Object) {
                    for(var key in obj) {
                        blank = true;
                        break;
                    }
                } else if(obj instanceof Array) {
                    if(obj.length === 0) blank = true;
                }
                break;
            case 'string':
                if(obj.trim() === '') {
                    blank = true;
                }
                break;
            case 'boolean':
                blank = obj;
                break;
            case 'number':
                if(Number.isNaN(obj) || obj <= 0) {
                    blank = true;
                }
                break;
        }
        return blank;
    },
    regex:function(reg,str) {
        if ( reg.test( str ) ) {
            return true;
        }
        return false;
    },
    //检测是否为邮箱
    isMail:function(email) {
        var reg = /^([a-zA-Z0-9\-_\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return this.regex(reg,email);
    },
    //携程邮件格式检验
    _isMail:function(email) {
        return (/^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/).test(email);
    },
    isUrl:function(url) {
        var reg = /^(http|https|ftp):\/\/[a-z0-9_.%?\-&\/=#+@:~]{3,}$/i;
        return this.regex(reg,url);
    },
    //检测是否为手机号
    isMobile:function ( mobile ) {
        var reg = /^1([3578]\d{9}|4\d{9})$/;
        return this.regex(reg,mobile);
    },
    //用户名检测 手机号或者邮箱
    isMobEmail:function(val) {
        var mobile = this.isMobile(val);
        if(mobile) return true;
        var email = this.isMail(val);
        if(email) return true;
        return false;
    },
    //密码为6-16位，不能包含空格，不能为纯数字
    isPassWord:function( pass ) {
        if ( /\s+/g.test( pass ) ) {
            return false;
        } else {
            var reg = /(^[0-9]{0,}$)|(^.{0,5}$)|(^.{17,}$)/; //空格
            if ( reg.test( pass ) ) {
                return false;
            }
            return true;
        }
    },
    //检测是否为身份证号
    isIDCard:function( card ) {
        var reg = /^([\d]{17}[xX\d]|[\d]{15})$/;
        return this.regex(reg,card);
    },
    //是否为android设备
    isAndroid:function() {
        var ua = navigator.userAgent.toLowerCase();
        return this.regex(/android/i,ua);
    },
    //判断是否为微信浏览器
    isWeiXin:function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }
        return false;
    },
    //Android手机微信浏览器
    isAndroidWx:function() {
        var ua = navigator.userAgent.toLowerCase();
        if(/android/i.test( ua ) && /mqqbrowser/i.test( ua )) {
            return true;
        }
        return false;
    },
    //判断是否是移动设备
    isMobileDevice:function() {
        var android = navigator.userAgent.match( /Android/i );
        var webOS = navigator.userAgent.match( /webOS/i );
        var iPhone = navigator.userAgent.match( /iPhone/i );
        var iPad = navigator.userAgent.match( /iPad/i );
        var iPod = navigator.userAgent.match( /iPod/i );
        var BlackBerry = navigator.userAgent.match( /BlackBerry/i );
        if ( android || webOS || iPhone || iPad || iPod || BlackBerry || navigator.userAgent.match( /Windows Phone/i ) ) {
            return true;
        } else {
            return false;
        }
    },
    //取cookie
    getCookie: function(name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },
    //设置cookie
    setCookie: function(name,value,expires,domain,path,secure){
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += "; expires=" + expires.toGMTString();
        }
        if(path){
            cookieText += "; path=" + path;
        }
        if(domain){
            cookieText += "; domain=" + domain;
        }
        if(secure){
            cookieText += "; secure=" + secure;
        }
        document.cookie = cookieText;
    }
};


 
 
 
