var btn_tip = {
	NORMAL: '点击查看更多 &raquo;',
	NOMORE: '没有更多',
	LOADING: '正在加载...'
}
var finish = "<img class='am-img-responsive finish' src='imgs/myLove/yiwancheng-@2x.png'>";

$(function(){

	var user = JSON.parse(window.sessionStorage.getItem('user')),
			more = $('#more'), moreBtn = more.find('a'),
			item = '', page = 1;

	queryUserLoves(); 

	more.on('click', function() { queryUserLoves(); });   

	function queryUserLoves() {
		$.ajax({
			url: '/project/focus',
			type: 'GET',
			data: {userId: user.userId ,page: page++},
			dataType: 'json',
			beforeSend: function() { moreBtn.html(btn_tip.LOADING); },
			success: function(data) {
				if (data.state == 'success') {
					if (!data.object || data.object.length == 0) {     
						moreBtn.html(btn_tip.NOMORE);
					} else {     
						moreBtn.html(btn_tip.NORMAL);
						item = '';
						for(i in data.object){ 
							var tempData = data.object[i],
									success = tempData.success,
									targetUrl;
							if (tempData.cateId == 4) {     // 星动
								targetUrl = 'item_star.html';
							} else if (tempData.cateId == 7) {     // 梦想
								targetUrl = 'item_dream.html';
							} else {     
								targetUrl = 'item.html';
							}
							item += "<div class='item'><a href='"+ targetUrl +"?from=l&dealId="+ tempData.dealId +"'><img src='imgs/index/tupianjiazai-4@2x.png' class='am-img-responsive poster' data-original='"+ tempData.dealBanner +"'/></a><div class='info'><span>目标"+ tempData.totalSupportCount +"</span><span>已筹"+ tempData.successSupportCount +"</span><span>剩余"+ tempData.restDays +"天</span><button type='button' onclick='noLove($(this),"+ tempData.dealId +","+ user.userId +")'>取消关注</button></div>"+ (success ? finish : '') +"</div>";
						}
						more.before(item);
						$(".poster").lazyload();
						// 设置层宽度
						// 这样每次从头遍历并不好
						$('.item').each(function() {
							var _this = $(this),
									poster = _this.find('.poster');
							_this.find('.poster').css('maxWidth', poster.width());
						})
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

})

$(window).load(function() { $('.loadingWrap').hide(); })

function noLove(ele, dealId, userId) {
	var item = ele.parents('.item');
	$('#my-confirm').modal({
		relatedTarget: this,
    onConfirm: function() {
    	$.ajax({
				url: '/project/isFocus',
				type: 'POST', 
				data: { dealId: dealId, userId: userId },  
				dataType: 'json',   
				success: function(data) {
					if (data.state == 'success') {  
						// 前台删除
						item.animate({ 
							right: '-=' + $(window).width() + 'px' 
						}, 500, function() { 
							$(this).remove(); 
							window.location.reload();
						});
					} else {
						alert(data.msg);  
					}
				}
			})
    },
    onCancel: function() { return; }
  });
}

