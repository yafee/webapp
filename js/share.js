// 判断用户登录状态  
var ua = navigator.userAgent.toLowerCase(),
  flag = window.sessionStorage.getItem('flag'),
  isWx = ua.match(/MicroMessenger/i) == "micromessenger";
if (isWx && flag != 'success') {
  window.location.href = '/user/WechatWebLogin?which=share'; // 跳到授权页去登陆
}
$(function() {
  var userId = window.sessionStorage.getItem('userId'),
    userName = window.sessionStorage.getItem('userName');
  wx.ready(function() {
    var url = 'http://www.xiguachong.cn/invite.html?userId=' + userId + '&userName=' + userName;
    wx.onMenuShareTimeline({
      title: '西瓜虫请您看演出！', // 分享标题
      link: url, // 分享链接
      imgUrl: 'http://www.xiguachong.cn/imgs/invite/logo@2x.png', // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareAppMessage({
      title: '西瓜虫请您看演出！', // 分享标题
      desc: '50积分限时狂送，先到先得！', // 分享描述
      link: url, // 分享链接
      imgUrl: 'http://www.xiguachong.cn/imgs/invite/logo@2x.png', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
  });
});
