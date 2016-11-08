var tip_send = {
	NOTLOGIN: '请先登录哦～',
	NULL: '请输入内容哦～'
}

$(function() {

	var more = $('.more');
	var moreBtn = more.find('a');
	var page = 1;
	var sex = $('.sex').find('div');
	var location = window.location;
	var user = JSON.parse(session.getItem('user'));
	var cateId = 5; // 默认加载男神数据

	// 抽取常量
	var moreBtn_tip = {
		NORMAL: '点击查看更多 &raquo;',
		LOADING: '加载中...',
		NOMORE: '没有更多'
	}
	var zan_img = {
		NORMAL: 'imgs/panxi/zan@3x.png',
		ACTIVE: 'imgs/panxi/zan2@3x.png'
	}

	queryListData(); // 初始化数据     

	// 点击查看更多事件
	more.on('click', function() {
		queryListData();
	})

	// 男神女神切换
	sex.each(function() {
		$(this).on('click', function() {
			var _this = $(this),
				boy = _this.hasClass('boy') ? true : false,
				title = _this.find('span');
			sex.removeClass('active')
			_this.addClass('active');
			sex.find('span').css('color', '#cfcfcf');
			boy ? title.css('color', '#105FC5') : title.css('color', '#f29715');
			$('.panxi').remove();
			page = 1;
			cateId = boy ? 5 : 6;
			queryListData();
		})
	})

	// 查询人物列表信息
	function queryListData() {
		var userId = user == null ? 0 : user.userId;
		$.ajax({
			url: '/project/getList',
			type: 'GET',
			data: {
				page: page++,
				cateId: cateId,
				userId: userId
			},
			dataType: 'json',
			beforeSend: function() {
				moreBtn.html(moreBtn_tip.LOADING);
			},
			success: function(data) {
				if (data.state == 'success') {
					var content = '';
					if (!data.object || data.object.length == 0) { // 没有数据了 
						moreBtn.html(moreBtn_tip.NOMORE);
					} else { // 还有数据 
						moreBtn.html(moreBtn_tip.NORMAL);
						for (i in data.object) {
							var tempData = data.object[i],
								zanImg = tempData.isPraise ? zan_img.ACTIVE : zan_img.NORMAL;
							content += '<div class="panxi"><img src="http://www.d-du.com/images/grey.gif" data-original="' + tempData.vedioImage + '" class="am-img-responsive poster"/><img src="imgs/index/shipin@2x.png" class="am-img-responsive play" onclick="play($(this));"/><img src="imgs/panxi/dingcengmengban-@3x.png" class="am-img-responsive zhezhao"><div class="video">' + tempData.vedioWebSource + '</div><div class="am-vertical-align"><img src="' + zanImg + '" class="zan am-vertical-align-middle" onclick="zan($(this),' + tempData.dealId + ',' + userId + ',' + tempData.isPraise + ');"/><span class="am-vertical-align-middle">' + tempData.praiseNum + '</span><img src="imgs/panxi/pinglun@3x.png" class="talk am-vertical-align-middle" data-id="' + tempData.dealId + '"><img src="imgs/panxi/fenxiang@3x.png" class="share"><img src="' + tempData.image + '" class="header-icon absolute" onclick="toHotPage($(this),' + tempData.dealId + ',' + cateId + ');"></div></div>';
						}
						more.before(content);
						$(".poster").lazyload({
							threshold: -50
						});
						$.each($('.panxi'), function(index, val) {
							var _this = $(this);
							checkImgComplete(_this.find('.zhezhao')[0], function() {
								var play = _this.find('.play');
								if (play.is(':hidden')) {
									play.show().addClass('am-animation-fade');
								}
							})
						});
						// 点击评论跳转事件
						$('.talk').each(function() {
							var _this = $(this),
								panxi = _this.parent().parent(),
								poster = panxi.find('.poster').data('original'),
								video = panxi.find('.video').html();
							_this.on('click', function() {
								session.setItem('video_source', video); // url传参不能超过2k，所以用localStorage存储视频地址
								location.href = 'pinglun.html?poster_face=' + poster + '&dealId=' + _this.data('id');
							})
						})
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

})

// 视频播放事件
function play(playBtn) {
	var curPoster = playBtn.prev();
	var curVideoDiv = playBtn.parent().find('.video');
	// 设置视频的大小
	curVideoDiv.css({
			'width': curPoster.width(),
			'height': curPoster.height(),
			'left': curPoster.css('marginLeft')
		})
		.find('iframe').attr({
			'width': '100%',
			'height': '100%'
		});
	// 先隐藏不必要的元素        
	curPoster.css('visibility', 'hidden');
	playBtn.css('visibility', 'hidden');
	// 再显示视频层      
	curVideoDiv.show();
}

// 点击头像跳转
function toHotPage(ele, dealId, cateId) {
	var location = window.location;
	location.href = 'renqi.html?dealId=' + dealId + '&cateId=' + cateId;
}

// 点赞
function zan(ele, dealId, userId, _isPraise) {
	if (!userId) {
		showTip(tip_send.NOTLOGIN);
	} else {
		if (ele[0].src.indexOf('imgs/panxi/zan2@3x.png') == -1) {
			$.ajax({
				url: '/praise/dianzhan',
				type: 'GET',
				data: {
					dealId: dealId,
					userId: userId
				},
				success: function(data) {
					if (data.state == 'success') {
						var totalCount = parseInt(ele.next().html()) + 1;
						ele[0].src = 'imgs/panxi/zan2@3x.png';
						ele.next().html(totalCount);
					} else {
						alert(data.msg);
					}
				}
			})
		}
	}
}

// 循环监测图片是否加载完成
function checkImgComplete(img, Fuc) {
	var timer = setInterval(function() {
		if (img.complete) {
			if (img.src != 'http://www.d-du.com/images/grey.gif') {
				Fuc();
				clearInterval(timer);
			}
		}
	}, 100);
}

// 模态窗口提示
function showTip(str) {
	$('#tipCont').html(str);
	$('#sendTip').modal();
}