var which = getQueryString('which');
// 判断用户登录状态  
var flag = session.getItem('flag');
if (flag != 'success') {
  window.location.href = '/user/WechatWebLogin?which=' + which; // 跳到授权页去登陆
}
$(function() {
  var content = $('#content'),
    posterWrap = $('#posterWrap'),
    poster = $('#poster'),
    totalPoints = $('#totalPoints'),
    userId = window.sessionStorage.getItem('userId'),
    item = '';
  posterWrap.css('maxWidth', poster.width());
  if (userId) {
    $.get('/Info/myWallet', { userId: userId }, function(data) {
      if (data.state == 'success') {
        checkImgComplete(poster[0], function() {
          $('#curPoint').show();
          totalPoints.show();
          $('.how').show();
        });
        totalPoints.html(data.object.totalPoints);
        for (i in data.object.pointsDetail) {
          var tempData = data.object.pointsDetail[i];
          item += '<div class="item"><span>' + tempData.pointsSource + '</span><span>' + tempData.points + '</span><span>' + tempData.createTime + '</span></div>';
        }
        content.append(item);
      } else {
        alert(data.msg);
      }
    });
  }
  $('.how span').on('click',function(){
    window.location.href = 'pointRule.html';
  });

  // 循环监测图片是否加载完成
  function checkImgComplete(img, Fuc) {
    var timer = setInterval(function() {
      if (img.complete) {
        Fuc();
        clearInterval(timer);
      }
    }, 100);
  }
});
