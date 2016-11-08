var tip_send = {
		NOTLOGIN: '请先登录哦～',
		NULL: '请输入内容哦～'
	},
	moreBtn_content = {
		NORMAL: '点击查看更多 &raquo;',
		LOADING: '加载中...',
		NOMORE: '没有更多'
	},
	head_img = 'imgs/login/touxiang-1@2x.png',
	love_img = {
		NORMAL: 'imgs/item/nolove@2x.png',
		LOVE: 'imgs/item/love@2x.png'
	},
	zan_img = {
		NORMAL: 'imgs/item/zan@3x.png',
		ACTIVE: 'imgs/item/zan_2@3x.png'
	},
	unit = {
		RMB: '¥',
		DAY: '天',
		PERCENT: '%'
	},
	star_img = {
		NORMAL: 'imgs/item/star_1@3x.png',
		ACTIVE: 'imgs/item/star_2@3x.png'
	},
	tab_icon = {
		XNORMAL: 'imgs/item/xiangqing_1@3x.png',
		XACTIVE: 'imgs/item/xiangqing_2@3x.png',
		PNORMAL: 'imgs/item/pinglun_1@3x.png',
		PACTIVE: 'imgs/item/pinglun_2-@3x.png',
		SNORMAL: 'imgs/item/guize_2@3x.png',
		SACTIVE: 'imgs/item/guize_1@3x.png'
	},
	finish = '<img src="imgs/myLove/yiwancheng-@2x.png" class="finish absolute">';

$(function() {

  var play = $('.play'), videoDiv = $('.video'),
  		loveBtn = $('.love'), zanBtn = $('#zan'), supportBtn = $('#support'),
  		pPage = 1, dealId = getQueryString('dealId'),
  		imgList = $('#imgList'),
  		more = $('.more'), moreBtn = more.find('a'),
			bottom = $('#bottom'), fenxiang = $("#fenxiang"),
			sendMsg = $('#sendMsg'), textarea = sendMsg.find('textarea'),
			user = JSON.parse(window.sessionStorage.getItem('user'));
			praiseNum = $('#praiseNum');

	$.ajax({
		url: '/detail/detailPage',
		type: 'GET',
		data: {dealId: dealId, userId: (!user) ? 0 : user.userId},
		dataType: 'json',
		success: function(data) {
			if (data.state == 'success') {
        var tempData = data.object,
        		requestData = data.object.requestData[0],
        		himage = tempData.himage,
        		simage = tempData.simage,
        		poster = $('.poster'),
        		picList = $('.main'),
        		simgList = '';
        requestData.isFinished && poster.before(finish);
				loveBtn[0].src = tempData.isFocus ? love_img.LOVE : love_img.NORMAL;
				poster[0].src = requestData.vedioImage;
				checkImgComplete(poster[0], function() { initPage(play, poster, loveBtn); });
				zanBtn[0].src = tempData.isPraise ? zan_img.ACTIVE : zan_img.NORMAL;
				praiseNum.html(tempData.praiseNum);
        videoDiv[0].innerHTML = requestData.vedioWebSource;
        play.on('click', function(){ 
        	loveBtn.hide();    
          videoDiv.css({
            'width': poster.width(),
            'height': poster.height(),
            'left': poster.css('marginLeft')
          }).show().find('iframe').attr({ 
            'width': '100%', 
            'height': '100%'
          });
          poster.css('visibility', 'hidden');               
          play.css('visibility', 'hidden');              
        })    
        var stars = '', i = j = 0;
        for ( ; i < requestData.star; i++) {
        	stars += '<img src="'+ star_img.ACTIVE +'">'
        }
        for ( ; j < (5 - requestData.star); j++) {
        	stars += '<img src="'+ star_img.NORMAL +'">'
        }
        $('.title').html(requestData.name);
        $('#stars')[0].innerHTML = stars;
        $('#startTime').html(requestData.startTime);
        $('#address').html(requestData.address);
        $('#successCount').html(unit.RMB + requestData.successSupportCount);
        $('#restDays').html(requestData.restDays + unit.DAY); 
        $('#dacheng').html(Math.floor(requestData.successSupportCount / requestData.totalSupportCount * 100) + unit.PERCENT); 
        $('#totalCount').html(unit.RMB + requestData.totalSupportCount);
        $('#totalDays').html(requestData.totalDays + unit.DAY);
        for (i in simage) {
        	simgList += '<img src="imgs/index/tupianjiazai-4@2x.png" data-original="'+ simage[i] +'" class="am-img-responsive descImg" style="width:100%;">';
        }
        imgList[0].innerHTML = simgList;
				$(".descImg").lazyload({ threshold: -50 }); 
			} else {
				alert(data.msg);
			}
		}
	})

	loveBtn.on('click', function(){
		if (!user) {     
			showTip(tip_send.NOTLOGIN);
		} else {
			$.ajax({
				url: '/project/isFocus',
				type: 'POST',
				data: { dealId: dealId, userId: user.userId },
				dataType: 'json',
				beforeSend: function() { $('.loadingWrap').show(); },
				success: function(data) {
					if (data.state == 'success') {
						$('.loadingWrap').hide();  
						if (loveBtn.attr('src') == love_img.LOVE) {
							loveBtn.animate({opacity:'toggle'},150).attr('src', love_img.NORMAL).animate({opacity:'toggle'},150);
						} else {
							loveBtn.animate({opacity:'toggle'},150).animate({opacity:'toggle'},150).attr('src',love_img.LOVE);
						}
					} else {
						alert(data.msg);
					}
				}
			})
		}
	})

	zanBtn.on('click', function() {
		if (!user) {
			showTip(tip_send.NOTLOGIN);
		} else {
			$.ajax({
				url: '/praise/dianzhan',
				type: 'GET',
				data: { dealId: dealId, userId: user.userId },
				success: function(data) {
					if (data.state == 'success') {
						if (zanBtn.attr('src') == zan_img.NORMAL) {
							zanBtn[0].src = zan_img.ACTIVE;
							praiseNum.html(parseInt(praiseNum.html()) + 1);
						}
					} else {	 
						alert(data.msg);
					}
				}
			})
		}
	})
	
	var ximg = $('#ximg'), pimg = $('#pimg'), simg = $('#simg');
	var xfont = $('#xfont'), pfont = $('#pfont'), sfont = $('#sfont');
	var xtab = $('.xiangqing'), ptab = $('.pinglun'), stab = $('.shiyong');
	var xcontent = $('.xiangqing-content'), scontent = $('#guize');

	ptab.on('click', function(){
		changeTab.clearTab(ximg, tab_icon.XNORMAL, xfont, xtab);
		changeTab.clearTab(simg, tab_icon.SNORMAL, sfont, stab);
		changeTab.activeTab(pimg, tab_icon.PACTIVE, pfont, ptab); 
		$(".pinglun-content").remove(); pPage = 1;
		loadPinglunData();
		displayController([xcontent, imgList, scontent], more, false);
	})

	more.on('click', function(){ loadPinglunData(); });

	xtab.on('click' ,function(){
		changeTab.clearTab(pimg, tab_icon.PNORMAL, pfont, ptab);
		changeTab.clearTab(simg, tab_icon.SNORMAL, sfont, stab);
		changeTab.activeTab(ximg, tab_icon.XACTIVE, xfont, xtab);
		$(".pinglun-content").remove();
		displayController([more, scontent], [xcontent, imgList], false);
	})

	stab.on('click', function() {
		changeTab.clearTab(ximg, tab_icon.XNORMAL, xfont, xtab);
		changeTab.clearTab(pimg, tab_icon.PNORMAL, pfont, ptab);
		changeTab.activeTab(simg, tab_icon.SACTIVE, sfont, stab);
		$(".pinglun-content").remove();
		displayController([xcontent, imgList, more], scontent, false);
	})

	bottom.find('input').focus(function(){
		displayController(bottom, sendMsg, false);
		textarea.focus();
	})

	$('.cancel').on('click' ,function(){ displayController(sendMsg, bottom, false); })

	$('.send').on('click' ,function(){
		if (!user) {    
			showTip(tip_send.NOTLOGIN);
		} else if (trim(textarea.val()) == '') {     
			showTip(tip_send.NULL);
		} else {
			$.ajax({
				url: '/Comment/saveComments', 
				type: 'POST',
				data: {dealId: dealId, userId: user.userId, userName: user.nickname, content: textarea.val()},
				dataType: 'json',
				success: function(data) {
					if (data.state == 'success') {
						ptab.click();
						displayController(sendMsg, bottom, false);
					} else {
						alert(data.msg);
					}
				}
			})
		}
	})

	supportBtn.on('click' ,function(){
		if (!user) {    
			showTip(tip_send.NOTLOGIN);
		} else {
			var location = window.location;
			location.href = 'support.html?dealId='+ dealId;
		}
	})

	function loadPinglunData() {
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
						for (i in data.object) {               
							var tempData = data.object[i];     
							headImg = ((!tempData.headImg) || (tempData.headImg == '')) ? head_img : tempData.headImg;
							pContent += '<ul class="pinglun-content am-text-sm"><li><img src="'+ headImg +'" class="am-margin-right-sm"><span>'+ tempData.dealUserName +' : '+ tempData.content +'</span></li></ul>';
						}
						more.before(pContent);
					}
				} else {
					alert(data.msg);
				}
			}
		})
	}

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

	function showTip(str) {  
		$('#tipCont').html(str);
		$('#sendTip').modal();
	}

})

$(window).load(function() { $('.loadingWrap').hide(); });

$(window).resize(function() { initPage($('.play'), $('.poster'), $('.love')); });
  
$(window).scroll(function() {
	var percent = parseInt($('#dacheng').html()),
			num = $('.num');
	if ($(document).scrollTop() >= 130) {
		if (percent >= 100) {
			num.width('99.6%');
		} else {
			num.width(percent +'%');      
		}
		return;
	}
})

function checkImgComplete(img, callback) {
	var timer = setInterval(function() {
		if (img.complete) {
			callback();
			clearInterval(timer);
		}
	}, 50);
}
 
function initPage(playBtn, poster, loveBtn){
	playBtn.css({ 'top': ((poster.height() - playBtn.height()) / 2), 'display': 'block' });
	loveBtn.show();
}

var changeTab = {
	clearTab: function(imgEle, imgPath, font, tab) {
		imgEle[0].src = imgPath;
		font.css('color', '#fff');
		tab.css('borderBottom', 'none');
	},
	activeTab: function(imgEle, imgPath, font, tab) {
		imgEle[0].src = imgPath;
		font.css('color', '#2BC0D4');
		tab.css('borderBottom', '.1rem solid #2BC0D4');
	}
}

