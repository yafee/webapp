$(function(){

	var houseId = getQueryString('houseId'),
			poster = $('#posterImg'),
			title = $('#title'),
			people = $('#people'),
			region = $('#region'),
			phone = $('#phone');
	$.ajax({
		url: '/house/houseDetail',
		type: 'GET',
		data: { houseId: houseId },
		dataType: 'json',
		beforeSend: function() {  },
		success: function(data) {
			if (data.state == 'success') {
				var imageBack = data.object.imageBack,
						projectDetail = data.object.projectDetail,
						content = '',
						futureShow = '';
				for (i in imageBack) {
					content += '<li><img src="'+ imageBack[i] +'"></li>';
				}
				$('.am-slides').html(content);
				$('.am-slider').flexslider();     // 初始化轮播图

				var detail = data.object.detail[0];
				poster.attr('src', data.object.imageBack[0]);
				title.html(detail.houseName);
				people.html(detail.housePeople + '人');
				region.html(detail.houseAddress);
				phone.html(detail.housePhoneNumber);
				$('.place').click(function(){
					// window.location.href = 'location.html?latitude=' + data.object[0].houseLatitude + '&longitude=' + data.object[0].houseLongitude;
					window.location.href = 'location.html?name=' + encodeURI(encodeURI(detail.houseName)) + 
					'&address=' + encodeURI(encodeURI(detail.houseAddress)) + '&houseId=' + houseId;
				})

				// 未来演出
				for (i in projectDetail) {
					futureShow += "<li class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'style='background:#202020;' onclick='support("+ projectDetail[i].dealId +");'><div class='am-u-sm-4 am-u-md-2 am-list-thumb' style='margin-top:-.5rem;'><img src='imgs/paihang/tupianjiazai-@2x.png' data-original='"+ projectDetail[i].image +"' class='am-img-responsive paihang-poster'/></div><div class='am-u-sm-8 am-u-md-10 am-list-main' style='padding-left:0rem;'><p class='paihang-title'>"+ projectDetail[i].name +"</p><img class='paihang-jiantou' src='imgs/paihang/xiayiji@2x.png'><div class='paihang-content'><span class='am-sans-serif'>目标"+ projectDetail[i].totalSupportCount +"</span><span class='am-sans-serif'>已筹"+ projectDetail[i].successSupportCount +"</span><span class='am-sans-serif'>剩余"+ projectDetail[i].restDays +"天</span></div></div></li>";
				}
				$('#paihang').find('ul').html(futureShow);
				$(".paihang-poster").lazyload({ threshold: -50 });
			} else {
				alert(data.msg);
			}
		}
	});

})

// 点击数据列表跳转事件 
function support(dealId) {
  var location = window.location;
  location.href = 'item.html?from=i&dealId=' + dealId;
}
