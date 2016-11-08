// 判断用户登录状态  
var flag = session.getItem('flag');
var which = getQueryString('which');
if (flag != 'success') {
  $('.cover').show();
  window.location.href = '/user/WechatWebLogin?which=' + which; // 跳到授权页去登陆
}
var userId = window.sessionStorage.getItem('userId');
var userName = window.sessionStorage.getItem('userName');
zhuge.track('打开每日抽奖');
$(function() {
  var $btn = $('.playbtn');
  var isDraw = false;
  var clickfunc = function(point) {
    switch (point) {
      case 10:
        rotateFunc(300, '运气不错，恭喜您获得10积分<br><img src="imgs/prizeDraw/smile.png" class="emoji">');
        break;
      case 1:
        rotateFunc(60, '运气不错，恭喜您获得1积分<br><img src="imgs/prizeDraw/smile.png" class="emoji">');
        break;
      case 5:
        rotateFunc(0, '运气不错，恭喜您获得5积分<br><img src="imgs/prizeDraw/smile.png" class="emoji">');
        break;
      case 3:
        rotateFunc(180, '运气不错，恭喜您获得3积分<br><img src="imgs/prizeDraw/smile.png" class="emoji">');
        break;
      case 7:
        rotateFunc(240, '运气不错，恭喜您获得7积分<br><img src="imgs/prizeDraw/smile.png" class="emoji">');
        break;
      case 0:
        rotateFunc(120, '今天手气不佳，明天再来吧<br><img src="imgs/prizeDraw/cry.png" class="emoji">');
        break;
    }
  };
  $btn.click(function() {
    if (!userName) { // userName为空，未绑定手机号
      window.location.href = '../bind.html?which=prizeDraw';
    } else if (userId) {
      $.ajax({
        url: '/PrizeDraw/start',
        type: 'post',
        data: { userId: userId },
        dataType: 'json',
        success: function(data) {
          if (data.state == 'success') {
            zhuge.track('点击抽奖');
            clickfunc(data.object);
          } else {
            $('.tips').html('今天您已经抽过奖了！明天再来哟<br><img src="imgs/prizeDraw/happy.png" class="emoji">');
            $('#modal').modal('open');
          }
        },
        error: function() {
          $('.tips').html('网络有问题，请重试！');
          $('#modal').modal('open');
        }
      });
    } else {
      return false;
    }
  });
  var rotateFunc = function(angle, text) {
    isture = true;
    $btn.stopRotate();
    $btn.rotate({
      angle: 0,
      duration: 4000, //旋转时间
      animateTo: angle + 1500, //让它根据得出来的结果加上1500度旋转
      callback: function() {
        isture = false; // 标志为 执行完毕
        $('.tips').html(text);
        $('#modal').modal('open');
      }
    });
  };
  $('.watch').on('click', function() {
    zhuge.track('查看奖品', {}, function() {
      window.location.href = 'myGold.html';
    });
  });

});
