var queryUuid = '';// IJ45014z98
var sku_total_count = 0;

$(document).ready(function(){
    init();
    getGoodsInfo();
});

window.onload = function(){
    getCommentList();
    getDetail();
};

function init() {
    queryUuid = $('#uuid').val();
//    queryUuid = Utils.getQueryString('uuid')?Utils.getQueryString('uuid'):'';
    bindEvent();
    initCartCount();
}

function initCartCount(){
//    Utils.storageSetItem('local_cart_list', JSON.stringify(new Array()));
    var cartList = Utils.getCartList();
    $.each(cartList, function(i, item){
        sku_total_count += parseInt(item.sku_count);
    });
    $('#sku_total_count').text(sku_total_count);
}

function bindEvent(){
    $('#add_cart').on('tap', function(){
        var chooseCount = parseInt($('#chooseCount').text());
        if($(this).hasClass('onCategoryArea')){
            var selectSku = $('#categoryList .selected');
            var skuInfo = {};
            skuInfo.sku_uuid = selectSku.attr('sku_uuid');
            skuInfo.show_name = selectSku.attr('show_name');
            skuInfo.outer_id = selectSku.attr('outer_id');
            skuInfo.sku_point = 0;
            skuInfo.sku_stock = selectSku.attr('sku_stock');
            skuInfo.sku_price = selectSku.attr('sku_price');
            skuInfo.sku_pic = selectSku.attr('sku_pic');
            skuInfo.sku_flag = 'true';
            skuInfo.sku_count = chooseCount;
            skuInfo.gift = false;
            skuInfo.sku_title = $('#introduce').attr('title');
            Utils.addCart(skuInfo);
            sku_total_count += chooseCount;
            $('#sku_total_count').text(sku_total_count);
            $('#add_cart').removeClass('onCategoryArea').text('加入购物车');
            closeChooseCategory();
            console.log('local_cart_list: ' + Utils.storageGetItem('local_cart_list'));
        }else{
            $('#add_cart').addClass('onCategoryArea').text('确定');
            showChooseCategory();
        }
    });

    $('#download').on('tap', function(){
        window.location.href = 'http://app.meizhuangyouxuan.com/weixin/appdown.html';
    });

    $('#chooseCategoryArea').on('tap', function(){
        $('#add_cart').addClass('onCategoryArea').text('确定');
        showChooseCategory();
    });

    $('#closeBtn').on('tap', function(){
        $('#add_cart').removeClass('onCategoryArea').text('加入购物车');
        closeChooseCategory();
    });

    $('#minus').on('tap',function(){
        var chooseCount = parseInt($('#chooseCount').text());
        if(chooseCount > 1){
            $('#chooseCount').text(chooseCount-1);
        }
    });

    $('#plus').on('tap',function(){
        var chooseCount = parseInt($('#chooseCount').text());
        $('#chooseCount').text(chooseCount+1);
    });

    $('#detail_tab').on('tap',function(){
        if(!$(this).hasClass('on')){
            $('#params_tab').removeClass('on');
            $('#params_content').addClass('displayNone');
            $(this).addClass('on');
            $('#detailContent').removeClass('displayNone');
        }
    });

    $('#params_tab').on('tap',function(){
        if(!$(this).hasClass('on')){
            $('#detail_tab').removeClass('on');
            $('#detailContent').addClass('displayNone');
            $(this).addClass('on');
            $('#params_content').removeClass('displayNone');
        }
    });

    $('#add_favor').on('tap', function(){
        addFavor();
    });

    $('#go_cart').on('tap', function(){
        window.location.href = '/user/cart';
    });
}

function showChooseCategory(){
    $('#mask').removeClass('displayNone');
    $('#chooseCategory').removeClass('displayNone');
}

function closeChooseCategory(){
    $('#mask').addClass('displayNone');
    $('#chooseCategory').addClass('displayNone');
}

function getGoodsInfo(){
    $.ajax({
        type: 'GET',
//        type: 'POST',
        url: '/ajax/getProductInfo',
//        data: JSON.stringify({ name: 'Zepto.js' }),
//        contentType: 'application/json'
        data: { uuid:queryUuid},
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var goodsInfo = {};
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                goodsInfo = res;
                showGoodsInfo(goodsInfo);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showGoodsInfo(goodsInfo){
    var imgUl = $('#focus .bd ul');
    var categoryList = $('#categoryList');
    var paramsTable = $('#params_table');
    var picUrlArr = new Array();
    var skuInfo = {};

    if(goodsInfo.pic_url){
        picUrlArr = goodsInfo.pic_url.split(',');
        if(picUrlArr && picUrlArr.length>0){
            $.each(picUrlArr, function(i, item){
                var liNode = $('<li><a><img src=' + item + '></a></li>');
                imgUl.append(liNode);
            });

            TouchSlide({
                slideCell:"#focus",
                titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell:".bd ul",
                effect:"leftLoop",
                autoPlay:true,//自动播放
                autoPage:true, //自动分页
//        switchLoad:"_src", //切换加载，真实图片路径为"_src"
                pnLoop:true
            });
        }
    }

//    $('#introduce').text(Utils.cutText(goodsInfo.title,20));
    $('#introduce').text(goodsInfo.title).attr('title',goodsInfo.title);
    var discountPrice = parseInt(goodsInfo.cur_price.split('-')[0]);
    var originalPrice = parseInt(goodsInfo.og_price.split('-')[0]);
    $('#discountPrice').text(discountPrice);
    $('#originalPrice').text(originalPrice);
    if(discountPrice<originalPrice){
        $('#originalPriceArea').removeClass('displayNone');
    }
    $('#integral').text(parseInt(goodsInfo.cur_price.split('-')[0]));
    $('#courierFee').text(parseInt(goodsInfo.cur_price.split('-')[0])<100?10:0);
    $('#monthSale').text(goodsInfo.sales);

    $('#chooseCategory .categoryImg').attr('src', picUrlArr[0]);
    $('#priceRange').text(goodsInfo.cur_price);

    var skuNumber = 0;

    if(goodsInfo.skuinfo){
        skuInfo = goodsInfo.skuinfo;
        if(skuInfo.pvmap){
            $.each(skuInfo.pvmap, function(skuId, pvmapVal){
                skuNumber++;
                var skuKind = pvmapVal.split(';');
                var showName = '';
                $.each(skuKind, function(i, pvid){
                    var pid = pvid.split(':')[0];
                    var vid = pvid.split(':')[1];
                    $.each(skuInfo.pvs, function(i, pvsVal){
                        if(pvsVal.pid == pid){
                            $.each(pvsVal.vals, function(i, vidVal){
                                if(vidVal.vid == vid){
                                    showName = showName + vidVal.name;
                                }
                            });
                        }
                    });
                });

                var spanNone = $('<span>' + showName + '</span>');
                $.each(skuInfo.skumap, function(i, skumapVal){
                    if(skumapVal.skuid == skuId){
                        spanNone.attr('show_name',showName).attr('outer_id',skumapVal.outer_id).attr('sku_point',skumapVal.point).attr('sku_stock',skumapVal.stock).attr('sku_price', skumapVal.price).attr('sku_uuid', skumapVal.uuid).attr('sku_pic', skumapVal.pic_url);
                    }
                });
                if(showName.trim() != ''){
                    categoryList.append(spanNone);
                }
            });

            $('.categoryList span').each(function(i){
                if(i == 0){
                    $(this).addClass('selected');
                    $('#chooseCategory .categoryImg').attr('src', $(this).attr('sku_pic'));
                    $('#priceRange').text($(this).attr('sku_price'));
                    $('#sku_stock').text($(this).attr('sku_stock'));
                }
                $(this).on('tap', function(){
                    $('.categoryList .selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#chooseCategory .categoryImg').attr('src', $(this).attr('sku_pic'));
                    $('#priceRange').text($(this).attr('sku_price'));
                    $('#sku_stock').text($(this).attr('sku_stock'));
                });
            });
        }
    }

    if(goodsInfo.prop){
        var propArr = goodsInfo.prop.split(',');
        if(propArr && propArr.length > 0){
            $.each(propArr, function(i, item){
                var itemArr = item.split(':');
                var trNode = $('<tr><td style="width:30%;color:#4f5051">'+itemArr[0]+'</td><td>'+itemArr[1]+'</td></tr>');
                paramsTable.append(trNode);
            })
        }
    }
}

function getCommentList(){
    $.ajax({
        type: 'POST',
        url: '/ajax/getCommentList',
        data: JSON.stringify({uuid: queryUuid, limit: '10', type: '1'}),
        contentType: 'application/json',
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var comments = new Array();
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                comments = res;
                showCommentList(comments);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showCommentList(comments){
    var evaluationUl = $('#evaluation .bd ul');

    if(comments && comments.length>0){
        $.each(comments, function(i, item){
            if(item.comment && item.comment.trim()){
                var liNoneStr = '<li><div class="userInfo"><span class="userName">'+item.time
                    +'</span><span class="time"></span></div><div class="comment">'
                    + item.comment + '</div></li>';
                var liNode = $(liNoneStr);
                evaluationUl.append(liNode);
            }
        });

        TouchSlide({
            slideCell:"#evaluation",
            titCell:".hd li", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            autoPlay:true,//自动播放
//        autoPage:true, //自动分页
//        switchLoad:"_src", //切换加载，真实图片路径为"_src"
            pnLoop:true
        });
    }
}

function getDetail(){
    $.ajax({
        type: 'GET',
        url: '/ajax/getDetial',
        data: { uuid:queryUuid, last_modified:'0'},
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var productDetail = {};
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                productDetail = res;
                showDetail(productDetail);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showDetail(productDetail){
    var detailContent = $('#detailContent');

    if(productDetail.url){
        detailContent.attr('src', productDetail.url).attr('height', '400px');
    }
}

function addFavor(){
    $.ajax({
        type: 'GET',
        url: '/ajax/addFavor/' + queryUuid,
        data: {},
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            if((res && res.success && res.success == 'true')){
//                alert('收藏成功');
                Utils.showAlert('收藏成功');
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

