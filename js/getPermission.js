var which = getQueryString('which'),
  dealId = getQueryString(('dealId'));
var ua = navigator.userAgent.toLowerCase(),
  flag = session.getItem('flag'),
  isWx = ua.match(/MicroMessenger/i) == "micromessenger";
if (dealId) {
  which = 'item&dealId=' + dealId + '&from=i';
}
// 判断用户登录状态  
if (isWx && flag != 'success') {
  window.location.href = '/user/WechatWebLogin?which=' + which; // 跳到授权页去登陆
}
