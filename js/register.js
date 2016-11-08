// 抽取常量
var mod_tip = {
		MOBILE: '请填写正确的手机号！',
		CODE: '验证码只能输入六位数字！',
		NICKNAME: '昵称只能输入中文、数字、字母或下划线！',
		PASSWORD: '密码至少六位字符！'
	},
	regular = {
		MOBILE: /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
		CODE: /^\d{6}$/,
		NICKNAME: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
	};

$(function() {

	var mobile = $('#mobile'),
		code = $('#code'),
		userName = $('#userName'),
		userPwd = $('#userPwd'),
		codeBtn = $('#codeBtn'),
		location = window.location,
		tip = $('#tip'),
		timer, // 计时器 
		mobileCache = session.getItem('mobile'), // 缓存手机号到本地
		hasTimer = session.getItem('hasTimer'); // 存在定时器

	hasTimer && timer(60); // 如果获得验证码后用户刷新了页面，则重置倒计时 
	mobileCache && (mobile[0].value = mobileCache);

	// 发送验证码      
	codeBtn.on('click', function() {
		if (!regular.MOBILE.test(trim(mobile.val()))) { // 手机号不合法 
			setTip(mod_tip.MOBILE, warning);
		} else {
			codeBtn.html('正在获取...');
			codeBtn.attr('disabled', 'disabled');
			$.post('/Mobile/sendCode', {
				mobile: mobile.val()
			}, function(data) {
				if (data.state == 'fail') {
					setTip(data.msg, error);
				} else {
					session.setItem('hasTimer', true);
					session.setItem('mobile', mobile.val());
					timer(60);
				}
			})
		}
	})

	// 倒计时，seconds为秒数        
	function timer(seconds) {
		timer = setInterval(function() {
			if (seconds == 0) {
				session.removeItem('hasTimer');
				codeBtn.html('获取验证码').attr('disabled', 'enabled');
				clearInterval(timer);
			} else {
				codeBtn.html(seconds-- + '秒').attr('disabled', 'disabled');
			}
		}, 1000);
	}

	// 注册事件         
	$('.btn').on('click', function() {
		var _this = $(this);
		_this.button('loading');
		// 数据合法性验证      
		if (!regular.MOBILE.test(trim(mobile.val()))) { // 手机号不合法 
			setTip(mod_tip.MOBILE, warning);
			_this.button('reset');
		} else if (!regular.CODE.test(trim(code.val()))) { // 验证码不合法
			setTip(mod_tip.CODE, warning);
			_this.button('reset');
		} else if (!regular.NICKNAME.test(trim(userName.val()))) { // 用户名不合法     
			setTip(mod_tip.NICKNAME, warning);
			_this.button('reset');
		} else if (trim(userPwd.val()).length < 6) { // 密码不合法    
			setTip(mod_tip.PASSWORD, warning);
			_this.button('reset');
		} else { // 输入正确
			jQuery.ajax({
				url: '/Mobile/Register',
				type: 'POST',
				data: {
					mobile: mobile.val(),
					code: code.val(),
					userName: userName.val(),
					userPwd: userPwd.val()
				},
				success: function(data) {
					if (data.state == 'success') {
						session.removeItem('mobile');
						session.removeItem('hasTimer');
						location.href = 'login.html?mobile=' + mobile.val();
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