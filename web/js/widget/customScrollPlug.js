!( function( $ ) {

    function Scroll(conf,container) {
        var _conf = {
            container:container,
            load:undefined,
            upScroll:undefined,
            downScroll:undefined,
            bottom:100,
            pageNum:1
        };

        $.extend(_conf,conf);
        var containerDom = _conf.container.get(0);
        if(!containerDom) return false;
        function init() {
            var _this = this;
            var currentY = 0;
            
            containerDom.addEventListener("touchstart", function(event) {
                _this.doProcess();
            }, false);
            containerDom.addEventListener("touchmove", function(event) {
                _this.doProcess();
            }, false);
            containerDom.addEventListener("touchend",function(event) {
                _this.doProcess();
            } , false);

            function doscroll() {
                if(window.scrollY - currentY > 0) {
                    currentY = window.scrollY;
                    if(typeof _conf.downScroll === 'function') _conf.downScroll();
                }
                if(window.scrollY - currentY < 0) {
                    currentY = window.scrollY;
                    if(typeof _conf.upScroll === 'function') _conf.upScroll();
                }
            }
            
            // begin 返回记住之前的滚动轴和加载页数-- by Jason
            if(typeof conf.load === 'function') {
                var pathname_scrollPage = window.location.pathname+'/scrollPage';
                $(window).unload(function(){
                	if(!commonUtilInstance.isClearScrollPage) {
                		var scrollPos = $(window).scrollTop();
                		commonUtilInstance._setCookie({name:pathname_scrollPage,value:scrollPos + "," + _conf.pageNum,expires:15*60*1000});
                	}
            	});
            	var pathname_scrollPage_cookie = commonUtilInstance.getCookie(pathname_scrollPage);
	            if (pathname_scrollPage_cookie != '') {
	            	var scrollList = commonUtilInstance.getCookie(pathname_scrollPage).split(',');
	            	document.cookie = pathname_scrollPage + '=; expires=-1';
	            	_conf.pageNum = parseInt(scrollList[1]);
	            	var pageI=1;
	            	while(pageI < _conf.pageNum){
	            		conf.load();
	            		pageI++;
	            	}
                    $.mobile.defaultHomeScroll = parseInt(scrollList[0]);
                    
                    setTimeout(function(){
                    	$('body').css('visibility', 'visible');
                    }, 400);
	            }
            }
            // end
        }

        return {
            init:function() {
                init.call(this);
                return this;
            },
            doProcess:function() {
                var bottom = $(document).height()-$(window).height()-window.scrollY;
                if(bottom <= _conf.bottom) this.loadData();
            },
            loadData:function() {
                if(typeof _conf.load === 'function') {
                	if(_conf.load() !== false){
                		_conf.pageNum++;	// add by Jason
                	}
                	
                }
            }
        }.init();
    }

    $.fn.customScroll = function( conf ) {
        var scroll = this.data('scroll');
        if(scroll) return scroll;
        scroll = new Scroll(conf,this);
        this.data('scroll',scroll);
        return scroll;
    }
})(jQuery);

setTimeout(function(){
	$('body').css('visibility', 'visible');
}, 800);
$(document).on('pageshow',function() {
    var dom = $('[data-scroll-down]'),content = $('[data-scroll-content]'),top = $('[data-scroll-top]');
    if(top.length) top = top.height();
    $('[data-scroll]').customScroll({
        load:function() {
            var _this = this;

            if(this.loading) return false;
            this.loading = true;
            var url = $('[data-scroll-url]').attr('data-scroll-url');

            if(url == '' || typeof url === 'undefined') {
                this.loading = false;
                return false;
            }
            $.ajax({
                url:url,
                dataType:'html',
                type:'get',
                async: false,	// add by Jason
                success:function(html) {
                    $('[data-scroll-url]').remove();
                    $('[data-scroll-datarender]').append(html);
                    _this.loading = false;
                },
                error:function(res) {
                    _this.loading = false;
                }
            });
        },
        downScroll:downScroll,
        upScroll:upScroll
    });

    function upScroll() {
        if(dom.hasClass('fiexd_bar')) dom.removeClass('hide');
        else {
            if(window.scrollY > top+10) {
                dom.addClass('fiexd_bar');
                content.css('margin-top',top+'px');
            } else {
                dom.removeClass('fiexd_bar');
                content.css('margin-top','0px');
            }
        }
    }

    function downScroll() {
        if(dom.hasClass('fiexd_bar')) dom.addClass('hide');
    }
});

