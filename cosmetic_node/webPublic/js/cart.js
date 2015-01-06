/**
 * [renderTemplate description]数据渲染局部视图
 * @param  {[type]} $wrap       [渲染内容容器]
 * @param  {[type]} templateStr [art 模板片段]
 * @param  {[type]} data        [json]
 * @return {[type]}             [undefined]
 */
function renderTemplate($wrap,templateStr,data){
	var oData = {};
	oData.products = data;
	console.log(oData);
	var render = template.compile(templateStr);
	var html = render(oData);
	$wrap.html(html);	
}
$(function(){
	//通过本地数据渲染列表	
	renderTemplate($('.layout_column_list'),cartListTemp,Utils.getCartList());
	//check事件
	(function(){
		var $checkbox = $('.layout_column_list .checkbox');
		//单选
		$checkbox.on('tap',function(){
			var sku_uuid = $(this).data('skuuuid');
			var count = $(this).parents('li').find('.value').html();
			if($(this).hasClass('checked')){
				$(this).removeClass("checked")[0].dataset.skuflag ="false";
				Utils.editSkuFlag(sku_uuid,"false");
			}else{
				//添加到订单列表
				Utils.addSkuCount(sku_uuid,count);
				$(this).addClass("checked")[0].dataset.skuflag ="true";
				Utils.editSkuFlag(sku_uuid,"true");
			}			
			$checkbox.each(function(i,v){
				//全选后取消单个
				if(!$(v).hasClass('checked')){
					$('.checkall').removeClass("checked");
				}
				//单选完全部
				else{
					$('.checkall').addClass("checked");
				}
			});
		});
		//全选
		$('.checkall').on('tap',function(){		
			if($(this).hasClass('checked')){
				$('.checkbox').each(function(i,v){
					$(v).removeClass("checked");
					if(!$(v).hasClass('checkall')){
						v.dataset.skuflag ="false";
						Utils.editSkuFlag($(v).data('skuuuid'),"false");
					}
				});
			}else{
				$('.checkbox').each(function(i,v){
					$(v).addClass("checked");
					if(!$(v).hasClass('checkall')){
						v.dataset.skuflag ="true";
						Utils.editSkuFlag($(v).data('skuuuid'),"true");
					}	
				});						
			}
		});
		//修改数量
		$('.product_detail_plus').on('tap',function(){
			$(this).prev().html(function(i,oldValue){
				var newValue = oldValue*1+1;
				Utils.addSkuCount($(this).parents('li').find('.checkbox').data('skuuuid'),newValue);
				$(this).parents('li').find('.count').html("x"+newValue);
				return newValue;
			});
		});
		$('.product_detail_minus').on('tap',function(){
			$(this).next().html(function(i,oldValue){
				var newValue = oldValue*1-1;
				if(oldValue==1){newValue=1;}
				Utils.addSkuCount($(this).parents('li').find('.checkbox').data('skuuuid'),newValue);
				$(this).parents('li').find('.count').html("x"+newValue);
				return newValue;
			});
		});	
		//删除收藏
		$('.del_item').on('tap',function(){
			$('.layout_column_list .checked').each(function(i,v){
				Utils.delCart($(v).data('skuuuid'));
				$(v).parents('li').remove();
			})
		});
	})();
});