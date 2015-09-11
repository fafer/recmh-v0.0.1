/**
 * dependence on jquery、/js/util/
 */
!(function($) {

    var OK_ClASS = 'text-ok',HIDE_CLASS = 'hide';

    function find(form) {
        var _validator = this;
        var formItems = [];
        $('[validate-item]',form).each(function() {
            var item = $(this);
            var name = $(this).attr('validate-item');
            var obj = {
                legal:false,
                name:name,
                item:{
                    dom:item,
                    nonValidate: typeof item.attr('nonValidate') != 'undefined'?true:false
                },
                ok:$('[validate-ok='+name+']',item).length?$('[validate-ok='+name+']',item):$('[validate-ok='+name+']'),
                fields:[],
                msg:$('[validate-msg='+name+']',item).length?$('[validate-msg='+name+']',item):$('[validate-msg='+name+']')
            };
            $('[validate-field='+name+']',item).each(function() {
                var _dom = $(this);
                var field = {
                    dom:_dom,
                    type:typeof _dom.attr('validate-type') != 'undefined'?_dom.attr('validate-type'):undefined,
                    focus:_dom.attr('validate-focus'),
                    blur:_dom.attr('validate-blur')
                };
                obj.fields.push(field);
            });
            obj.fields.forEach(function(field) {
                field.dom.on('focus',function() {
                    field.dom.parents('.form-input-item-b').addClass(OK_ClASS);
                    obj.ok.addClass(OK_ClASS);
                    obj.msg.addClass( HIDE_CLASS );
//                    if(field.focus) eval(field.focus);
                }).on('blur',function() {
                    if ( field.dom.val() != '' ) {
                        obj.ok.addClass(OK_ClASS);
                    } else {
                        obj.ok.removeClass(OK_ClASS);
                        field.dom.parents('.form-input-item-b').removeClass(OK_ClASS);
                    }
                    if(typeof field.blur != 'undefined') {
                        _validator.validate(obj);
                    }
                });
            });
            formItems.push(obj);

        });
        return formItems;
    }

    function Validator(form) {
        var initial = false,
            items = [];
        return {
            container:form,
            init:function() {
                if(!initial) {
//                    initial = true;
                    items = find.call(this,this.container);
                }
                return this;
            },
            validateAll:function(cache) {
                var result = true;
                var _this = this;
                items.forEach(function(obj) {
                    if(!_this.validate(obj,cache)) result = false;
                });
                return result;
            },
            validateByItem:function(item,cache) {
                for(var index=0;index<items.length;index++) {
                    var obj = items[index];
                    if(obj.name === item) return this.validate(obj,cache);
                }
                return true;
            },
            validate:function(obj,cache) {
                if(cache) return obj.legal;
                if(!obj.item.nonValidate) {
                    for(var _index=0;_index<obj.fields.length;_index++) {
                        var field = obj.fields[_index];
                        var types = [];
                        if(field.type) {
                            types = field.type.split(',');
                        }
                        for(var index=0;index<types.length;index++) {
                            var type = types[index];
                            var validate = ValidatorType[type];
                            if(validate) {
                                if(!validate.call(ValidatorType,field.dom)){
                                    if(field.dom.attr(type+'-msg')) obj.msg.html(field.dom.attr(type+'-msg'));
                                    else if(ValidatorTypeMsg[type]) obj.msg.html(ValidatorTypeMsg[type]);
                                    obj.msg.removeClass('hide');
                                    if(field.dom.attr('validate-fail')) eval(field.dom.attr('validate-fail'));
                                    return false;
                                } else {
                                    obj.msg.addClass('hide');
                                    if(field.dom.attr('validate-success')) eval(field.dom.attr('validate-success'));
                                }
                            }
                            var data_eq = field.dom.attr('data_eq');
                            if(data_eq) {
                                if($('[validate-field='+data_eq+']').val() != field.dom.val()) {
                                    if(field.dom.attr('eq-msg')) obj.msg.html(field.dom.attr('eq-msg'));
                                    obj.msg.removeClass('hide');
                                    if(field.dom.attr('validate-fail')) eval(field.dom.attr('validate-fail'));
                                    return false;
                                } else {
                                    obj.msg.addClass('hide');
                                    if(field.dom.attr('validate-success')) eval(field.dom.attr('validate-success'));
                                }
                            }
                        }
                    }
                }
                obj.legal = true;
                return true;
            }
        }.init();
    }

    $.fn.validate = function() {
        var validator = $(this).data('validator');
        if(!validator) {
            validator = new Validator(this);
            $(this).data('validator',validator);
            return validator;
        }
        return validator.init();
    };

    $.fn.getValidator = function() {
        return $(this).data('validator');
    };

    $.fn.doValidate = function(cache) {
        var validator = $(this).data('validator');
        return validator.validateAll(cache);
    };

    var ValidatorType = {
        required:function(dom) {
            var val = $(dom).val();
            if(val.trim() == '') return false;
            return true;
        },
        checked:function(dom) {
            var val = $(dom).val();
            if(val === '' || val === '0') return false;
            return true;
        },
        email:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.isMail(val);
        },
        mobile:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.isMobile(val);
        },
        mobileEmail:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.isMobEmail(val);
        },
        password:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.isPassWord(val);
        },
        IDCard:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.IDCard(val);
        },
        uniqueEmail:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.uniqueEmail(val);
        },
        nonExistEmail:function(dom) {
            return !this.uniqueEmail(dom);
        },
        uniqueMobile:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.uniqueMobile(val);
        },
        nonExistMobile:function(dom){
           return !this.uniqueMobile(dom);
        },
        nonExistMobileEmail:function(dom) {
            if(this.mobile(dom)) {
                var result = this.nonExistMobile(dom);
                if(!result) {
                    ValidatorTypeMsg.nonExistMobileEmail = ValidatorTypeMsg.nonExistMobile;
                    return false;
                }
            }
            if(this.email(dom)) {
                var result = this.nonExistEmail(dom);
                if(!result) {
                    ValidatorTypeMsg.nonExistMobileEmail = ValidatorTypeMsg.nonExistEmail;
                    return false;
                }
            }
            return true;
        },
        sms:function(dom) {
            var val = $(dom).val();
            var params = $(dom).get(0).dataset;
            return commonUtilInstance.check_smsCode(params.mobile,val);
        },
        img:function(dom) {
            var val = $(dom).val();
            return commonUtilInstance.check_imgCode(val);
        },
        number:function(dom) {
            var val = $(dom).val();
            if (val == "") {
                return true
            }
            if (isNaN(val)) {
                return false;
            }
            return true;
        },
        pint:function(dom) {
            var val = $(dom).val();
            if (val == "") {
                return true
            }
            var regexp = /^[1-9]\d*$/;
            return regexp.test(val);
        },
        pfloat:function(dom) {
            var val = $(dom).val();
            if (val == "") {
                return true
            }
            var regexp = /^\d+(\.\d+)?$/;
            return regexp.test(val);
        },
        regexp:function(dom) {
            var val = $(dom).val();
            var reg = $(dom).attr('regexp');
            return (new RegExp(reg)).test(val);
        }
    };

    var ValidatorTypeMsg = {
//        required:'必填',
//        number:'请输入数字',
//        email:'请输入正确的邮件',
//        mobile:'请输入正确的手机号'
        nonExistMobile:'该手机号未被注册！',
        nonExistEmail:'该邮箱未被注册！',
        nonExistMobileEmail:''
    }

})(jQuery);
