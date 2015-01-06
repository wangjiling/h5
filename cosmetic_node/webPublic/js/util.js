var Utils = {
    'cutText' : function(str, length){
        var sub_length = length ;
        var temp1 = str.replace(/[^\x00-\xff]/g,"**");//匹配双字节字符
        var temp2 = temp1.substring(0,sub_length);
        //找出有多少个*
        var x_length = temp2.split("\*").length - 1 ;
        var hanzi_num = x_length /2 ;
        sub_length = sub_length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
        var res = str.substring(0,sub_length);
        if(sub_length < str.length ){
            var end  =res+"..." ;
        }else{
            var end  = res ;
        }
        return end ;
    },

    'loadImages' : (function() {
        var imgIndex = 0;

        return function(imgs, index, data){ // param imgs: dom collections
            data = data ? data : 'data-original';

            if (index == 0) {
                imgIndex = 0;
            }

            for (var i = imgIndex; i < imgs.length; i++){
                if ($(imgs[i]).offset().top < $(imgs[i]).scrollTop() + window.innerHeight){
                    var data_src = $(imgs[i]).attr(data);
                    if (data_src) {
                        $(imgs[i]).attr('src', data_src);
                    }
                    imgs[i].onload = function(){
                        $(this).css('opacity', '1');
                    };
                } else {
                    imgIndex = i;
                    break;
                }
            }
        };
    })(),

    'getQueryString' : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
    },

    'storageGetItem' : function(key){
        if(window.localStorage){
            return window.localStorage.getItem(key);
        }else{
            return '';
        }
    },

    'storageSetItem' : function(key, val){
        if(window.localStorage){
            window.localStorage.setItem(key, val);
        }
    },

    'storageRemoveItem' : function(key){
        if(window.localStorage){
            window.localStorage.removeItem(key);
        }
    },

    'addCart': function(skuInfo){// skuInfo: { key: value}
        if(skuInfo){
            var localCartList = new Array();
            if(Utils.storageGetItem('local_cart_list')) {
                localCartList = eval(Utils.storageGetItem('local_cart_list'));
            }

            var  iteration_flag = false;
            if(localCartList.length > 0){
                $.each(localCartList, function(i,item){
                    if(item.sku_uuid == skuInfo.sku_uuid){
                        localCartList[i].sku_count +=skuInfo.sku_count;
                        return false;
                    }
                    if(i == localCartList.length-1){
                        iteration_flag = true;
                    }
                });
                if(iteration_flag){
                    localCartList.unshift(skuInfo);
                }
            }else{
                localCartList.unshift(skuInfo);
            }
            Utils.storageSetItem('local_cart_list', JSON.stringify(localCartList));
        }
    },

    'getCartList' : function(){
        var localCartList = new Array();
        if(Utils.storageGetItem('local_cart_list')) {
            localCartList = eval(Utils.storageGetItem('local_cart_list'));
        }

        return localCartList;
    },

    'delCart' : function(sku_uuid){
        if(Utils.storageGetItem('local_cart_list')) {
            var localCartList = eval(Utils.storageGetItem('local_cart_list'));
            $.each(localCartList, function(i,item){
                if(item.sku_uuid == sku_uuid){
                    localCartList.splice(i,1);
                    return false;
                }
            });

            Utils.storageSetItem('local_cart_list', JSON.stringify(localCartList));
        }
    },

    'addSkuCount' : function(sku_uuid, sku_count){
        if(Utils.storageGetItem('local_cart_list')) {
            var localCartList = eval(Utils.storageGetItem('local_cart_list'));
            $.each(localCartList, function(i,item){
                if(item.sku_uuid == sku_uuid){
                    localCartList[i].sku_count = sku_count;
                    return false;
                }
            });

            Utils.storageSetItem('local_cart_list', JSON.stringify(localCartList));
        }
    },

    'editSkuFlag' : function(sku_uuid, sku_flag){// sku_flag: true(selected) / false(unselected)
        if(Utils.storageGetItem('local_cart_list')) {
            var localCartList = eval(Utils.storageGetItem('local_cart_list'));
            $.each(localCartList, function(i,item){
                if(item.sku_uuid == sku_uuid){
                    localCartList[i].sku_flag = sku_flag;
                    return false;
                }
            });

            Utils.storageSetItem('local_cart_list', JSON.stringify(localCartList));
        }
    },

    'showAlert' : function(content){
        if($('.alert_div').length == 0){
            var alertNode = $('<div class="alert_div"><span>' + content + '</span></div>');
            $('#touchSlide').append(alertNode);
            $('.alert_div').animate({opacity: 1}, 1000, 'ease-out');
            setTimeout(function(){
                $('.alert_div').animate({opacity: 0}, 1000, 'ease-in', function(){
                    $('.alert_div').remove();
                });
            }, 2000)
        }
    }
};

/**
 * [Tab description] 选项卡
 * @param {[type]} hd [切换标签集合 jq、zepto、类数组对象]
 * @param {[type]} bd [切换内容集合 jq、zepto、类数组对象]
 */
function Tab(option){
    this.hd = option.hd;
    this.bd = option.bd;
    this.switchEndCB = option.switchEnd;
    this.bind();
}
Tab.prototype.bind = function(){
    var hd = this.hd,
        bd = this.bd,
        _this = this;
    hd.on("tap",function(e){
        $(this).addClass("current").siblings().removeClass("current");
        bd.eq($(this).index()).show().siblings().hide();
        _this.switchEndCB($(this).index())
    })  
};