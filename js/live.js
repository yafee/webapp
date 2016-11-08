var session = window.sessionStorage;

$(function(){

	var more = $('.more'),
			moreBtn = more.find('a'),
			page = 1,     // 数据列表分页
			houseCity = '北京';     // 默认北京

	loadDataList();
	
	function loadDataList() {
		if (session.hasChangeCity == 'true') {
			houseCity = session.getItem('newCity');
		} else {
			if (session.getLocation == 'success') {
				houseCity = session.getItem('curCity');
			}
		}
		$.ajax({
			url: 'house/liveHouse',
			type: 'GET',
			data: { page: page++, houseCity: houseCity },
			dataType: 'json',
			beforeSend: function() { moreBtn.html('加载中...'); },
			success: function(data) {
				if (data.state == 'success') {
					if (data.object == null || (data.object != null && data.object.length == 0)) {
						moreBtn.html('没有更多');
					} else {
						moreBtn.html('点击查看更多 &raquo;');
					}
					for (i in data.object) {
						$('#content').find('.more').before(
							'<a href="javascript:void(0);" class="am-g live" data-id="'+ data.object[i].houseId +'"><div class="am-u-sm-5 am-u-md-3">' +      
					    '<img src="'+ data.object[i].houseImageFace +'" class="am-img-responsive poster"></div>' +    
					    '<div class="am-u-sm-7 am-u-md-9"><span>'+ data.object[i].houseName +'</span>' +
					    '<span class="am-margin-top-xs">'+ data.object[i].houseCity +' '+ data.object[i].houseRegion +'</span><br>' +    
					    '<span>容纳人数：'+ data.object[i].housePeople +'人</span></div><img src="imgs/live/xiayiye-@3x.png" class="jiantou"></a>'
						)
						// 给每个链接加上houseId属性
						$('.live').each(function(){
							$(this).click(function(){
								window.location.href = 'place.html?houseId=' + $(this).attr('data-id');
							})
						})
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

	// 加载更多事件
	more.click(function(){ loadDataList(); })

})