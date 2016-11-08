var moreBtn_tip = {
    NORMAL: '点击查看更多 &raquo',
    NOMORE: '没有更多',
    LOADING: '加载中...'
  },
  order_status = {
    HASPAY: '已付款',
    NOTPAY: '等待付款'
  },
  icon = {
    TIME: 'imgs/dingdan/shijian-@2x.png',
    ADDRESS: 'imgs/dingdan/changguan@2x.png'
  };
var which = getQueryString('which');
// 判断用户登录状态  
var flag = session.getItem('flag');
if (flag != 'success') {
  window.location.href = '/user/WechatWebLogin?which=' + which; // 跳到授权页去登陆
}

$(function() {
  var local = window.location,
    // user = JSON.parse(window.sessionStorage.getItem('user')),
    page = 0,
    orders = '',
    moreBtn = $('.more'),
    userId = session.getItem('userId'),
    moreBtnText = moreBtn.find('a');
  if (userId) {
    queryOrderData(); // 加载数据
    moreBtn.on('click', function() { queryOrderData(); });
  }
  // 加载订单数据
  function queryOrderData() {
    $.ajax({
      url: '/dealOrder/myOrder',
      type: 'GET',
      data: { userId: userId, page: ++page },
      dataType: 'json',
      beforeSend: function() { moreBtnText.html(moreBtn_tip.LOADING); },
      success: function(data) {
        var datas = data.object,
          orders = '',
          hr = '<hr data-am-widget="divider" class="am-divider am-divider-dashed"/>',
          clearFl = '<div class="am-cf"></div>';
        if (data.state == 'success') {
          moreBtnText[0].innerHTML = (!datas || datas.length == 0) ? moreBtn_tip.NOMORE : moreBtn_tip.NORMAL;
          for (i in datas) {
            var tempData = datas[i],
              orderStatus = datas[i].orderStatus ? order_status.HASPAY : order_status.NOTPAY;
            orders += '<div class="item"><a href="orderItem.html?id=' + tempData.id + '&dealId=' + tempData.dealId + '&priceId=' + tempData.priceId + '"><div><span class="order-no">订单编号 : </span><span>' + tempData.orderNumber + '</span><span class="order-status">' + orderStatus + '</span></div>' + clearFl + '<div class="order-time"><span>下单时间 : </span><span>' + tempData.createTime + '</span></div><span class="restTime" data-haspay=' + datas[i].orderStatus + '>' + tempData.restTime + '分钟后自动关闭</span>' + clearFl + hr + '<div class="intro am-g"><img src="' + tempData.image + '" class="am-u-sm-4 poster"><span class="title block">' + tempData.dealName + '</span><div class="time am-vertical-align"><img src="' + icon.TIME + '"/><span>' + tempData.dealOntime + '</span></div><div class="place am-vertical-align"><div class="inlineBlock am-vertical-align-middle"><img src="' + icon.ADDRESS + '"/></div><span class="inlineBlock">' + tempData.dealAddress + '</span></div></div>' + hr + '</a></div>';
          }
          moreBtn.before(orders);
          $('.item').last().css('marginBottom', 0);
          $('.restTime').each(function() {
            var _this = $(this);
            _this.data('haspay') ? _this.hide() : _this.show();
          });
        } else {
          alert(data.msg);
        }
      }
    });
  }

});

$(window).load(function() { $('.loadingWrap').hide(); });

// // 取消订单
// function orderCancel(ele, id) {
//  $('#my-confirm').modal({
//    relatedTarget: this,
//    onConfirm: function(options) {
//      ele.parents('.item').remove();
//      jQuery.ajax({
//        url: '/dealOrder/orderCancel',
//        type: 'POST',
//        data: {id: id},
//        success: function(data) {
//          if (data.state == 'success') {
//            console.log(data)
//          } else {
//            alert(data.msg);
//          }
//        }
//      })
//    },
//    onCancel: function() {
//      return;
//    }
//  });
// }

// function orderPay(ele, id, dealId, priceId) {
//  jQuery.ajax({
//    url: '/dealOrder/OrderDetail',
//    type: 'GET',
//    data: {id: id, dealId: dealId, priceId: priceId},
//    success: function(data) {
//      if (data.state == 'success') {   
//        console.log(data)
//      } else {
//        alert(data.msg);
//      }
//    }
//  })
// }
