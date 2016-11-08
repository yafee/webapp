$(function(){      

	var mobile = $('#mobile');
	var code = $('#code'); 
	var userName = $('#userName');        
	var userPwd = $('#userPwd');    
	var codeBtn = $('#codeBtn');        
  var location = window.location; 
  var tipWrap = $('#tipWrap');   
  var timer;     // 计时器 
  var mobileCache = session.getItem('mobile');     // 缓存手机号到本地
  var hasTimer = session.getItem('hasTimer');     // 存在定时器

  // url参数
  var url_parameter = {
  	userId: getQueryString('userId'),
  	userName: getQueryString('userName')
  };
  // 抽取常量
  var mod_tip = {
    MOBILE: '请填写正确的手机号！',
    CODE: '验证码只能输入六位数字！',
    NAME: '昵称只能输入中文、数字、字母或下划线！',
    PWD: '密码至少六位字符！'
  };

  // 正则
  var regular = {
    MOBILE: /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    CODE: /^\d{6}$/,
    NAME: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g
  };

  $('#shareUser')[0].innerHTML = decodeURI(escape(url_parameter.userName));

  hasTimer && timer(60);     // 如果获得验证码后用户刷新了页面，则重置倒计时  
  mobileCache && (mobile[0].value = mobileCache);

	// 发送验证码      
  codeBtn.on('click', function(){     
    if(!regular.MOBILE.test(trim(mobile.val()))){     // 手机号不合法 
      setTip(mod_tip.MOBILE, warning);         
    }else{                   
      $.post('/Mobile/sendCode', {mobile: mobile.val()}, function(data){       
        if(data.state == 'fail'){      
          setTip(data.msg, error);
        }else{ 
          session.setItem('hasTimer', true);
          session.setItem('mobile', mobile.val());    
          timer(60);                        
        }                                           
      });                          
    }     
  });  

	// 倒计时，seconds为秒数        
  function timer(seconds){      
    timer = setInterval(function(){     
      if(seconds == 0){         
        session.removeItem('hasTimer');          
        codeBtn.html('获取验证码').attr('disabled', 'enabled');   
        clearInterval(timer);       
      }else{         
        codeBtn.html(seconds-- + '秒').attr('disabled', 'disabled');
      }               
    }, 1000);        
  }
               
	// 注册事件         
	$('.btn').on('click', function(){                  
		// 数据合法性验证      
		if(!regular.MOBILE.test(trim(mobile.val()))){     // 手机号不合法 
			setTip(mod_tip.MOBILE, warning);            
			return false;                
		}else if(!regular.CODE.test(trim(code.val()))){     // 验证码不合法
			setTip(mod_tip.CODE, warning);                       
			return false;   
		}else if(!regular.NAME.test(trim(userName.val()))){     // 用户名不合法     
			setTip(mod_tip.NAME, warning);
			return false;        
		}else if(trim(userPwd.val()).length < 6){     // 密码不合法    
			setTip(mod_tip.PWD, warning);        
			return false;          
		}else{     // 输入正确
			jQuery.post(
				'/Mobile/ShareRegister', 
				{
					shareUserId: url_parameter.userId,
					mobile: mobile.val(), 
					code: code.val(), 
					userName: userName.val(), 
					userPwd: userPwd.val()
				}, function(data){  
				  if(data.state == 'fail'){  
				  	setTip(data.msg, error);
				  }else if(data.state == 'success'){
				  	session.removeItem('mobile');
				    location.href = 'inviteOk.html'; 
				  }
			});        
		}   
	});

	// 设置提示
  function setTip(tipStr, tipType) {
    var str = '<div id="tip"></div>';
    $('#tip').remove();
    tipWrap[0].innerHTML = str;
    tipShowHide($('#tip'), tipType, tipStr);   
  } 

  // 服务条款跳转
  $('.fuwu').on('click', function() {
    location.href = 'fuwu.html';
  });

  // 活动说明
  $('#shuoming').on('click', function() {
    location.href = 'shuoming.html';
  });

}); 
