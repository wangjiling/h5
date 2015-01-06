var skuListTemp =
    '<% skus.forEach(function(v){ %>'+
    '<% if(v.sku_flag == "true"){ %>'+
    '<li class="skuInfo">'+
        '<img class="goodsImg" src=<%= v.sku_pic %> />'+
        '<div class="introduceItem">'+
            '<span class="introduce"><%= v.sku_title %></span>'+
            '<span class="category"><%= v.show_name %></span>'+
        '</div>'+
        '<div class="priceItem">'+
            '<span class="price">¥<%= v.sku_price %></span>'+
            '<div class="sku_count_sec"><span class="countBtn"></span><span class="sku_count"><%= v.sku_count %></span></div>'+
        '</div>'+
    '</li>'+
    '<% } %>'+
    '<% }) %>';

$(document).ready(function(){
    //通过本地数据渲染列表
    renderTemplate($('#sku_list'),skuListTemp,Utils.getCartList());
    init();
});

function init(){
    bindEvent();
    initVal();
}

function initVal(){
    var cartList = Utils.getCartList();
    var sku_total_count = 0;
    var sku_total_price = 0;
    var sku_total_point = 0;
    $('.introduce').each(function(){
//        var introduce = 'Jurlique茱莉蔻玫瑰衡肤花卉水澳洲进口正品满200减100满400减200';
        $(this).text(Utils.cutText($(this).text(),40));
    });

    $.each(cartList, function(i, item){
        if(item.sku_flag == 'true'){
            sku_total_count += parseInt(item.sku_count);
            sku_total_price += parseInt(item.sku_count)*parseFloat(item.sku_price);
            sku_total_point += parseInt(item.sku_count)*parseInt(item.sku_point);
        }
    });
    sku_total_price = sku_total_price.toFixed(1);
    $('#total_sku_count').text(sku_total_count);
    $('#total_price').text('¥ ' + sku_total_price);
    if(sku_total_price<100){
        $('#courier').text('¥ 10.0');
        $('#total_money').text(parseFloat(sku_total_price)+10);
    }else{
        $('#courier').text('¥ 0.0');
        $('#total_money').text(sku_total_price);
    }
    $('#integral').text(sku_total_point + ' 积分');
    $('#pay_integral').text(sku_total_point);
}

function bindEvent(){
    $('#addAddress').on('tap', function(){
        $('#addAddress').addClass('displayNone');
        $('#editAddress').removeClass('displayNone');
    });

    $('#buyerName').on('input focus', function(){
        var buyerName = $('#buyerName').val().trim();
        if(!buyerName){
            $('#nameErrMsg').removeClass('displayNone');
        }else{
            $('#nameErrMsg').addClass('displayNone');
        }
    });
    $('#buyerPhone').on('input focus', function(){
        var phoneReg = /^1[3-8]\d{9}$/;
        var buyerPhone = $('#buyerPhone').val().trim();
        if(!phoneReg.test(buyerPhone)){
            $('#phoneErrMsg').removeClass('displayNone');
        }else{
            $('#phoneErrMsg').addClass('displayNone');
        }
    });
    $('#buyerAddress').on('input focus', function(){
        var buyerAddress = $('#buyerAddress').val();
        if(!buyerAddress){
            $('#addressErrMsg').removeClass('displayNone');
        }else{
            $('#addressErrMsg').addClass('displayNone');
        }
    });

    $('#completeBtn').on('tap', function(){
        var checkFlag = checkInputVal();
        if(checkFlag){
            $('#completeName').val($('#buyerName').val());
            $('#completePhone').val($('#buyerPhone').val());
            $('#completeAddr').val($('#buyerAddress').val());
            $('#editAddress').addClass('displayNone');
            $('#completeAddress').removeClass('displayNone');
        }
    });

    $('#editBtn').on('tap', function(){
        $('#completeAddress').addClass('displayNone');
        $('#editAddress').removeClass('displayNone');
    });

    $('#payBtn').on('tap', function(){
        $.ajax({
            type: 'POST',
            url: '/ajax/addOrder',
            data: JSON.stringify(Utils.getCartList()),
            contentType: 'application/json',
            dataType: 'json',
            timeout: 10000,
            beforeSend: function(xhr, opts){
                console.log('opts: ' + JSON.stringify(opts));
            },
            success: function(res){
                console.log('res: ' + JSON.stringify(res));
                if(res && res.success && res.success == 'true'){
                    Utils.storageSetItem('local_cart_list', JSON.stringify(new Array()));
                    var jsApiParameters = res.jsApiParameters;
                    console.log('jsApiParameters: ' + JSON.stringify(jsApiParameters));
                    //        alert('call pay');
                    callPay(jsApiParameters);
                }else{
                    Utils.showAlert('下单失败，重新支付');
                }
            },
            error: function(xhr, errorType, error){
                console.log('error: ' + JSON.stringify(error));
                Utils.showAlert('下单失败，重新支付');
            }
        });
    });
}

function callPay(jsApiParameters){
//        alert('callPay');
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        jsApiCall();
    }

    //调用微信JS api 支付
    function jsApiCall(){
//        alert('jsApiCall');
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            jsApiParameters,
            function(res){
                alert(res.err_msg);
                if(res.err_msg == 'get_brand_wcpay_request:ok'){
                    window.location.href = '/home';
                }else{
                    Utils.showAlert('支付失败，重新支付');
                    setTimeout(function(){
                        window.location.href = '/order/list';
                    }, 2000);
                }
            }
        );
    }
}

function checkInputVal(){
    var checkFlag = false;
    var phoneReg = /^1[3-8]\d{9}$/;
    var buyerName = $('#buyerName').val().trim();
    var buyerPhone = $('#buyerPhone').val().trim();
    var buyerAddress = $('#buyerAddress').val();

    if(buyerName && phoneReg.test(buyerPhone) && buyerAddress){
        checkFlag = true;
    }else{
        if(!buyerName){
            $('#nameErrMsg').removeClass('displayNone');
        }else{
            $('#nameErrMsg').addClass('displayNone');
        }

        if(!phoneReg.test(buyerPhone)){
            $('#phoneErrMsg').removeClass('displayNone');
        }else{
            $('#phoneErrMsg').addClass('displayNone');
        }

        if(!buyerAddress){
            $('#addressErrMsg').removeClass('displayNone');
        }else{
            $('#addressErrMsg').addClass('displayNone');
        }
    }

    return checkFlag;
}

function renderTemplate($wrap,templateStr,data){
    var oData = {};
    oData.skus = data;
    console.log(oData);
    var render = template.compile(templateStr);
    var html = render(oData);
    $wrap.html(html);
}



