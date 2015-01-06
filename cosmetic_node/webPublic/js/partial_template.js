var hotSalesTemp = 
			'<% products.forEach(function(v){ %>'+
			'<li>'+
				'<div class="pic">'+
					'<a href=/product/detail/<%= v.uuid%>><img src=<%= v.pic_url %> alt=""></a>'+
				'</div>'+
				'<div class="info">'+
					'<p class="title"><%= v.title %></p>'+
					'<div class="meta">'+
						'<p class="cur_price">兑换积分<%= v.cur_price %></p>'+
						'<p class="og_price">原价<%= v.og_price %></p>'+					
					'</div>'+
					'<div class="layout_bot">'+
						'<p class="sales"><%= v.sales %>人已兑换</p>'+
						'<div class="cart"><a href="/uuid"></a></div>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<% }) %>';	
var cartListTemp = 
		'<% products.forEach(function(v){ %>'+
		'<li>'+
			'<div class="checkbox_wrap"><i class="checkbox checked" data-skuuuid=<%=v.sku_uuid %> data-skuflag=<%=v.sku_flag %>></i></div>'+
			'<a class="pic" href="javascript:;"><img src="http://121.40.209.34/productImg/c58xH1414987566382.jpg" alt=""></a>'+
			'<div class="info">'+
				'<p class="title"><%= v.sku_title %></p>'+
				'<p class="sku_name"><%= v.show_name %></p>'+
				'<div class="re-count">'+
					'<div class="product_detail_minus"></div>'+
					'<div class="value"><%= v.sku_count %></div>'+
					'<div class="product_detail_plus"></div>'+
				'</div>'+
			'</div>'+
			'<div class="price">'+
				'<div class="discount">￥<%= v.sku_price %></div>'+
				'<div class="count">X<%= v.sku_count %></div>'+
			'</div>'+
		'</li>'+
		'<% }) %>';	