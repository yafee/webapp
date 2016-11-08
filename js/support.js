$(function() {
  var dealId = getQueryString('dealId');
  var header = $('header');
  var item = '';
  var location = window.location;
  var history = window.history;
  // 加载数据
  $.ajax({
    url: '/price/choose',
    type: 'GET',
    data: { dealId: dealId },
    dataType: 'json',
    success: function(data) {
      if (data.state == 'success') {
        for (i in data.object) {
          var tempData = data.object[i];
          var hasSale = tempData.totalNumber - tempData.restNumber;
          item += '<div class="item"><div class="am-vertical-align item-top"><span id="money">¥ ' + tempData.dealPrice + '</span><span>库存' + tempData.restNumber + '</span><div class="line inlineBlock"></div><span>已售' + hasSale + '</span></div><span class="block">' + tempData.dealGift + '</span><div class="item-cont"><img src="' + tempData.dealGiftImage + '"></div><div class="tip-bottom"><span class="font15 block am-hide">预计回报发送时间：项目成功结束后20日内</span></div><div class="item-bottom"><button type="button" onclick="support(' + tempData.dealId + ',' + tempData.priceId + ',' + tempData.dealPrice + ',' + tempData.restNumber + ');">' + tempData.dealPrice + '元购票'+'</button><div class="am-vertical-align"></div></div></div>';
        }
        header.after(item);
        $('.item').last().css('marginBottom', 0);
      } else {
        alert(data.msg);
      }
    }
  });
  $('.back').on('click', function() { location.href = 'item.html?dealId=' + dealId; });
});

// 点击支持事件
function support(dealId, priceId, price, restNumber) {
  if (restNumber === 0) {
    showTip('已售空！');
  } else {
    zhuge.track('选择门票价格', {
      '票价': price
    }, function() {
      location.href = 'order.html?dealId=' + dealId + '&priceId=' + priceId + '&price=' + price;
    });
  }
}

// 模态窗口提示
function showTip(str) {
  $('#tipCont').html(str);
  $('#sendTip').modal();
}
