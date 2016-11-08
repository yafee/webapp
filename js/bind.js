var dealId = getQueryString('dealId');
var mod_tip = {
  MOBILE: '请填写正确的手机号！',
  CODE: '验证码只能输入六位数字！',
  NICKNAME: '昵称只能输入中文、数字、字母或下划线！',
  PASSWORD: '密码至少六位字符！'
};
var regular = {
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
  var which = getQueryString('which'); //判断哪个页面跳进绑定页面
  var userId = window.sessionStorage.getItem('userId');
  clearInterval(timer);
  // 发送验证码      
  codeBtn.on('click', function() {
    if (!regular.MOBILE.test(trim(mobile.val()))) { // 手机号不合法 
      setTip(mod_tip.MOBILE, warning);
    } else {
      codeBtn.attr('disabled', 'disabled');
      $.ajax({
        url: '/Mobile/sendBindCode',
        type: 'POST',
        data: { mobile: trim(mobile.val()) },
        dataType: 'json',
        beforeSend: function() { codeBtn.html('获取中...'); },
        success: function(data) {
          var dataObj = {};
          if (data.state == 'success') {
            $('#userName,#userPwd').show();
            session.setItem('hasTimer', true);
            session.setItem('mobile', trim(mobile.val()));
            timer(60);
            // 注册事件         
            $('.btn').on('click', function() {
              $('.btn').button('loading');
              dataObj = {
                mobile: trim(mobile.val()),
                code: trim(code.val()),
                userName: trim(userName.val()),
                userPwd: trim(userPwd.val()),
                userId: userId
              };
              bind(true, dataObj);
            });
          } else if (data.state == 'chengGong') {
            session.setItem('hasTimer', true);
            session.setItem('phoneRegisted', true);
            alert(data.msg);
            timer(60);
            $('#userName,#userPwd').hide();
            $('.btn').on('click', function() {
              $('.btn').button('loading');
              dataObj = {
                mobile: trim(mobile.val()),
                code: trim(code.val()),
                userId: userId
              };
              bind(false, dataObj);
            });
          } else {
            setTip(data.msg, error);
            codeBtn.removeAttr('disabled').html('获取验证码');
            session.setItem('phoneRegisted', true);
          }
        },
        error: function() {
          alert('获取验证码失败！');
        }
      });
    }
  });

  //注册事件
  function bind(flag, dataObj) {
    var _this = $('.btn');
    var url = flag ? '/Mobile/bingDings' : '/Mobile/ConfirmBind';
    if (!regular.MOBILE.test(dataObj.mobile)) { // 手机号不合法 
      setTip(mod_tip.MOBILE, warning);
      _this.button('reset');
    } else if (!regular.CODE.test(dataObj.code)) { // 验证码不合法
      setTip(mod_tip.CODE, warning);
      _this.button('reset');
    } else {
      if (flag) {
        if (!regular.NICKNAME.test(dataObj.nickname)) { // 用户名不合法     
          setTip(mod_tip.NICKNAME, warning);
          _this.button('reset');
        } else if (dataObj.psw.length < 6) { // 密码不合法    
          setTip(mod_tip.PASSWORD, warning);
          _this.button('reset');
        }
      } else { // 输入正确
        $.ajax({
          url: url,
          type: 'POST',
          data: dataObj,
          dataType: 'json',
          success: function(data) {
            alert('===' + data.state);
            if (data.state == 'success') {
              session.removeItem('mobile');
              session.removeItem('hasTimer');
              session.setItem('userName', data.object.username);
              if (which == 'prizeDraw') {
                window.location.href = 'prizeDraw.html';
              } else if (which == 'prizeDraw') {
                window.location.href = 'support.html?dealId=' + dealId;
              }
            } else {
              setTip(data.msg, error);
              _this.button('reset');
            }
          }
        });
      }
    }

  }

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



  // 设置提示
  function setTip(tipStr, tipType) {
    var str = '<div id="tip"></div>';
    tip.remove();
    $('#tipWrap')[0].innerHTML = str;
    tipShowHide($('#tip'), tipType, tipStr);
  }
});
