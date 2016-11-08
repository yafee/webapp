$(function() {
  var location = window.location,
    prevPageBtn = $('header').find('a'),
    // alipay = $('#alipay'),
    // alipayRadio = alipay.find('.radio'),
    // wcpay = $('#wcpay'),
    // wcpayRadio = wcpay.find('.radio'),
    // radios = $('.radio'),
    payBtn = $('#payBtn');
  var parameters = {
      id: getQueryString('id'),
      price: getQueryString('price')
    };
    // radio_icon = {
    //   NORMAL: 'imgs/pay/daixuan@2x.png',
    //   CHOOSED: 'imgs/pay/yixuan@2x.png'
    // };

  // 初始化页面
  $('#price')[0].innerHTML = parameters.price;

  // 点击单选框
  // cilckRadioAction([alipay, wcpay]);

  // 单选框切换
  function cilckRadioAction(eles) {
    for (i in eles) {
      eles[i].on('click', function() {
        radios.attr('src', radio_icon.NORMAL);
        var radio = $(this).find('.radio');
        if (radio.attr('src') == radio_icon.NORMAL) {
          radio.attr('src', radio_icon.CHOOSED);
        } else {
          radio.attr('src', radio_icon.NORMAL);
        }
      })
    }
  }

  // 返回上一页
  prevPageBtn.on('click', function() {
    var history = window.history;
    history.go(-1);
  })

  payBtn.on('click', function() {
    // var _this = $(this);
    $(this).button('loading');
    // if (alipayRadio[0].src.indexOf(radio_icon.CHOOSED) != -1) { // 支付宝支付
    //   $.ajax({
    //     url: '/alipay/WebPay',
    //     type: 'GET',
    //     data: { id: parameters.id },
    //     dataType: 'text',
    //     success: function(data) {
    //       $('#callBack').html(data);
    //       _this.button('reset');
    //     }
    //   })
    // }
    // if (wcpayRadio[0].src.indexOf(radio_icon.CHOOSED) != -1) { // 微信支付
    //   _this.button('reset');
      location.href = 'http://www.xiguachong.cn/wxpay/postorder?id=' + parseInt(parameters.id);
    // }
  });
});
