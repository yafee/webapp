$(function() {

  // 封装参数
  var parameters = {
    appId: getQueryString('appid'),
    timeStamp: getQueryString('timeStamp'),
    nonceStr: getQueryString('nonceStr'),
    _package: getQueryString('package'),
    signature: getQueryString('sign'),
    price: getQueryString('total_fee')
  };

  $('#payNowBtn').on('click', function() {
    pay();
  });

  $('#price').html(parameters.price / 100);
  // alert('appId:' + parameters.appId + ',timeStamp:' + parameters.timeStamp + ',nonceStr:' + parameters.nonceStr + ',package:' + parameters._package + ',signature:' + parameters.signature);
  // alert('appIdType:' + typeof parameters.appId + ',timeStampType:' + typeof parameters.timeStamp + ',nonceStrType:' + typeof parameters.nonceStr + ',packageType:' + typeof parameters._package + ',signatureType:' + typeof parameters.signature);
  // alert('appIdLength:' + parameters.appId.length + ',timeStamp:' + parameters.timeStamp.length + ',nonceStr:' + parameters.nonceStr.length + ',package:' + parameters._package.length + ',signature:' + parameters.signature.length);
  function onBridgeReady() {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": parameters.appId,
        "timeStamp": parameters.timeStamp,
        "nonceStr": parameters.nonceStr,
        "package": parameters._package,
        "signType": "MD5",
        "paySign": parameters.signature
      },
      function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") { // 支付成功
          var location = window.location;
          zhuge.track('下单成功',{

          },function(){
            location.href = 'myOrder.html';
          });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          zhuge.track('取消支付');
        } else {
          zhuge.track('支付失败');
          alert('支付失败！');
        }
      }
    );
  }

  function pay() {
    if (typeof WeixinJSBridge == "undefined") {
      // alert('不支持WeixinJSBridgeReady');
      // alert('微信版本不支持，请在微信中进行支付!');
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }
});
