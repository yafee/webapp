var zan_img = {
		NORMAL: 'imgs/item/zan@3x.png',
		ACTIVE: 'imgs/item/zan_2@3x.png'
	},
	send_tip = {
		NOTLOGIN: '请先登录哦～',
		NULL: '请输入内容哦～',
		SUCCESS: '发送成功~'
	},
	moreBtn_content = {
		NORMAL: '点击查看更多 &raquo;',
		LOADING: '加载中...',
		NOMORE: '没有更多'
	};
var dealId = getQueryString('dealId'), 
	user = JSON.parse(window.sessionStorage.getItem('user')),
	zanBtn = $('#zan'),
  praiseNum = $('#praiseNum'),
  pPage = 1;
    

$(function() {

	var bottom = $('#bottom'),
	  sendMsg = $('#sendMsg'),
	  textarea = sendMsg.find('textarea'),
		more = $('.more'), moreBtn = more.find('a');

	queryCommentData();

	$.ajax({
		url: '/detail/detailPage',
		type: 'GET',
		data: { dealId: dealId, userId: user.userId },
		dataType: 'json',
		success: function(data) {
			var posters = '';
			for (i in data.object.simage) {
				posters += '<img src="'+ data.object.simage[i] +'" class="poster">';
			}
			zanBtn.before(posters);
			zanBtn[0].src = data.object.isPraise ? zan_img.ACTIVE : zan_img.NORMAL;
			praiseNum.html(data.object.praiseNum);
		}
	})

	zanBtn.on('click', function() {
		if (zanBtn.attr('src') == zan_img.NORMAL) {
			$(this)[0].src = zan_img.ACTIVE;
			praiseNum.html(parseInt(praiseNum.html()) + 1);
			$.get('/praise/dianzhan', { dealId: dealId, userId: user.userId }, function(data) {
				if (data.state != 'success') { alert(data.msg); }
			})
		}
	})

	bottom.on('click', function(){
		displayController(bottom, sendMsg, true);
		textarea.focus();
	})

	$('.cancel').on('click' ,function(){ displayController(sendMsg, bottom, true); })

	$('.send').on('click' ,function(){
		if ($.trim(textarea.val()) == '') {   
			showTip(send_tip.NULL);
		} else {
			$.ajax({
				url: '/Comment/saveComments', 
				type: 'POST',
				data: { dealId: dealId, userId: user.userId, userName: user.nickname, content: textarea.val() },
				dataType: 'json',
				success: function(data) {
					if (data.state == 'success') {
						$('.pinglun-content').remove();
						pPage = 1;
						queryCommentData();
						// 隐藏文本域，显示原底部块
						displayController(sendMsg, bottom, true);
						showTip(send_tip.SUCCESS);
					} else {
						alert(data.msg);
					}
				}
			})
		}
	})

	more.on('click', function(){ queryCommentData(); });

	// 返回上一页
	$('.back').on('click', function() {
		var targetURL = '';
		switch (getQueryString('from')) {
			case 'l':
				targetURL = 'myLove.html';
				break;
			case 'i':
			default: 
				targetURL = 'index.html';
				break;
		}
		location.href = targetURL;
	})

	// 加载评论数据
	function queryCommentData() {
		$.ajax({
			url: '/Comment/getComments',
			type: 'GET',
			data: {page: pPage++, dealId: dealId},
			dataType: 'json',
			beforeSend: function() { moreBtn.html(moreBtn_content.LOADING); },
			success: function(data) {
				if (data.state == 'success') {
					if (!data.object || data.object.length == 0) {
						moreBtn.html(moreBtn_content.NOMORE);
					} else {
						moreBtn.html(moreBtn_content.NORMAL);
						var pContent = '',  
								headImg;  
						for (i in data.object) {               // imgs/index/tupianjiazai-4@2x.png
							var tempData = data.object[i];     
							headImg = ((!tempData.headImg) || (tempData.headImg == '')) ? headImg : tempData.headImg;
							pContent += '<ul class="pinglun-content am-text-sm"><li><img src="'+ headImg +'" class="am-margin-right-sm"><span>'+ tempData.dealUserName +' : '+ tempData.content +'</span></li></ul>';
								// "<p>"+ data.object[i] +"</p></ul>" +
						}
						more.before(pContent);
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

	function showTip(str) {
		$('#tipCont').html(str);
		$('#sendTip').modal();
	}

})

$(window).load(function(){ $('.loadingWrap').hide(); });

