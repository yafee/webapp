/**
 * JSSDK权限验证，需要用到JSSDK API的时候引入该文件
 * 
 * @type {String}
 */
var session = window.sessionStorage;
var appId = 'wxc7975b00353ef7f2';
var timestamp,
  nonceStr,
  signature;

session.wxConfig = 0; // 是否初始化了access_token   
try {
  $.get('/Sign/GetInfo', function(data) {
    timestamp = data.timestamp;
    nonceStr = data.nonce_str;
    signature = data.signature;
 alert('appId: ' + appId + 'timestamp: ' + timestamp + 'nonceStr: ' + nonceStr + 'signature: ' + signature);
     if (session.wxConfig == '0') { // 缓存access_token
      session.access_token = data.access_token;
      session.wxConfig = 1;
    }

    try {
      wx.config({
        debug: true,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'onMenuShareAppMessage'
        ]
      });
      wx.error(function(res) {
        alert(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

      });
    } catch (e) {
      alert(e);
      alert('微信权限验证失败！');
      alert('appId: ' + appId + 'timestamp: ' + timestamp + 'nonceStr: ' + nonceStr + 'signature: ' + signature);
    }

  });

} catch (e) {
  alert('微信权限验证参数获取失败！');
}
