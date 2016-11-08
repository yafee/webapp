$(function(){

	var dealId = getQueryString('dealId');
	var poster = $('.poster');
	var videoDiv = $('.video');
	var play = $('#play');
	var more = $('.more');
	var moreBtn = more.find('a');
	var pPage = 1;     // 评论分页
	var bottom = $('#bottom');
	var sendMsg = $('#sendMsg');
	var textarea = sendMsg.find('textarea');
	var user = JSON.parse(session.getItem('user'));

	// 设置视频封面和视频源
	poster[0].src = getQueryString('poster_face');
	videoDiv.html(session.getItem('video_source'));

	// 按钮垂直居中
	checkImgLoad(poster[0], function() { 
		play.css( 'marginTop', ((poster.height() - play.height()) / 2) ).show();
		$('.zhezhao').show();
	})

	// 视频播放事件
	play.on('click', function(){
		// 先隐藏不必要的元素        
	  poster.css('visibility', 'hidden');                
	  $(this).css('visibility', 'hidden'); 
		// 设置视频的位置和大小，并显示视频层
	  videoDiv.css({ 'width': poster.width(), 'height': poster.height(), 'left': poster.css('marginLeft')})
	  	.show().find('iframe').attr({ 'width': '100%', 'height': '100%' })      
	})

	loadPinglunData();     // 初始化评论数据

	// 死按钮
	$('#btn').on('click', function(){ showTip('请先输入内容～'); })

	// 加载更多评论
	more.on('click', function(){ loadPinglunData(); })

	// 弹出发送评论文本域 
	$('#msg').on('focus', function(){
		displayController(bottom, sendMsg, false);
		textarea.focus();
	})

	// 取消发送评论
	$('.cancel').on('click', function(){ displayController(sendMsg, bottom, false); })

	// 发送评论
	$('.send').on('click', function(){
		if (!user) {     // 未登录用户不能评论
			showTip('请先登录哦～');
		} else if (trim(textarea.val()) == '') {     // 不能发送空串
			showTip('请输入内容哦～');
		} else {
			$.ajax({
				url: '/Comment/saveComments',
				type: 'POST',
				data: {dealId: dealId, userId: user.userId, userName: user.nickname, content: textarea.val()},
				success: function(data) {
					if (data.state == 'success') {
						showTip('评论成功～');
						// 重新获取数据
						$(".pinglun-content").remove();
						pPage = 1;
						loadPinglunData();
					} else {
						alert(data.msg);
					}
				}
			})
		}
	})

	// 加载评论数据
	function loadPinglunData() {
		jQuery.ajax({
			url: '/Comment/getComments',
			type: 'GET',
			data: {page: pPage++, dealId: dealId},
			beforeSend: function() { moreBtn.html('加载中...'); },
			success: function(data) {
				if (data.state == 'success') {
					if (!data.object || data.object.length == 0) {
						moreBtn.html('没有更多');
					} else {
						moreBtn.html('点击查看更多 &raquo;');
					}
					for (i in data.object) {
						var tempData = data.object[i];
						more.before(     //imgs/login/touxiang-1@2x.png
							'<ul class="pinglun-content" style="margin-bottom:1rem;"><li><img src="'+ tempData.headImg +'" class="am-margin-right-sm"><span>'+ tempData.dealUserName +' : '+ tempData.content +'</span></li></ul>'
							// "<p>"+ data.object[i] +"</p></ul>" +
						)
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

	// 模态窗口提示
	function showTip(str) {
		$('#tipCont').html(str);
		$('#sendTip').modal();
	}

})

// 循环侦测图片是否加载完成
function checkImgLoad(img, Fuc) {
	var timer = setInterval(function() {
		if (img.complete) {
			Fuc();
			clearInterval(timer);
		}
	}, 50);
}


