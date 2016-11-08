var mod_tip = {
		MOBILE: '请填写正确的手机号！',
		PASSWORD: '密码至少六位字符！'
	},
	defaultImgUrl = 'imgs/login/touxiang-1@2x.png',
	ls = window.localStorage,
	session = window.sessionStorage;

$(function() {

	setIconPosition();
	var dealId = getQueryString('dealId');
	// var userId = getQueryString('userId');

	// alert(dealId);
	// alert('userId:'+session.getItem('userId'));
	var mobile = $('#mobile'),
		userPwd = $('#userPwd'),
		location = window.location,
		tip = $('#tip');

	// 若是注册成功后跳转到本页面，则自动填写帐号                     
	if (getQueryString('mobile')) mobile.val(getQueryString('mobile'));

	// 登录事件           
	$(".btn").on('click', function() {
		var _this = $(this);
		_this.button('loading');
		if (!/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(trim(mobile.val()))) { // 手机号不合法       
			setTip(mod_tip.MOBILE, warning);
			_this.button('reset');
		} else if (trim(userPwd.val()).length < 6) { // 密码不合法           
			setTip(mod_tip.PASSWORD, warning);
			_this.button('reset');
		} else {
			$.ajax({
				url: '/Mobile/login',
				type: 'POST',
				data: {
					mobile: mobile.val(),
					userPwd: userPwd.val()
				},
				dataType: 'json',
				success: function(data) {
					if (data.state == 'success') {
						var tempData = data.object,
							defaultImgUrl = tempData.headImage || defaultImgUrl,
							userStr = JSON.stringify(new User(tempData.userId, tempData.userName, null, null, defaultImgUrl, null));
						session.setItem('status', 'online');
						session.setItem('user', userStr);
						session.setItem('hasLogin', true);
						location.href = 'support.html?dealId='+dealId;
					} else {
						setTip(data.msg, error);
						_this.button('reset');
					}
				}
			})
		}
	})

	// 设置提示
	function setTip(tipStr, tipType) {
		var str = '<div id="tip"></div>';
		tip.remove();
		$('#tipWrap')[0].innerHTML = str;
		tipShowHide($('#tip'), tipType, tipStr);
	}

})

$(window).resize(function() {
	setIconPosition();
});

// 页面初始化时，用JS定位部分元素    
function setIconPosition() {
	var accIpt = $(".phone input"),
		phoneIcon = $(".phone img"),
		pwdIcon = $(".pwd img"),
		phoneleft = parseInt(accIpt.css("marginLeft")) + accIpt.width() - phoneIcon.width();
	phoneIcon.css('left', phoneleft).show();
	pwdIcon.css('left', phoneleft).show();
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function error(tipEle, errInfo) {
	tipEle.addClass('am-alert am-alert-danger am-animation-shake').css('margin', 0).alert().html(errInfo);
}

function warning(tipEle, warInfo) {
	tipEle.addClass('am-alert am-alert-warning am-animation-shake').css('margin', 0).alert().html(warInfo);
}

function tipShowHide(tip, Fuc, msg) {
	Fuc(tip, msg);
}

var User = function(userId, nickname, sex, phoneNum, imgurl, email) {
	this.userId = userId;
	this.nickname = nickname;
	this.sex = sex;
	this.phoneNum = phoneNum;
	this.imgurl = imgurl;
	this.email = email;
}