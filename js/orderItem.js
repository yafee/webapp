$(function(){

  var location = window.location;
  var price;
  var orderBtn = $('#orderBtn');

  // 封装参数
  var parameters = {
    id: getQueryString('id'),
    dealId: getQueryString('dealId'),
    priceId: getQueryString('priceId')
  };

  // 配送方式：1代表邮寄，0代表自取 
  var shipping_method = {     
    SEND: '邮寄',
    PICK: '自取' 
  };

  // 加载数据
  $.ajax({
    url: '/dealOrder/OrderDetail',
    type: 'GET',
    data: {
      id: parameters.id, 
      dealId: parameters.dealId, 
      priceId: parameters.priceId
    },
    dataType: 'json',
    success: function(data) {
      if (data.state == 'success') {   
        var orderInfo = data.object.orderInfo[0],
            dealImage = data.object.dealImage,
            dealReply = data.object.dealReply,
            cityAndProvince;
        // 已支付订单隐藏取消和支付入口
        orderInfo.orderStatus ? orderBtn.remove() : orderBtn.show();
        $('#poster')[0].src = dealImage;
        $('#showName')[0].innerHTML = orderInfo.dealName;
        $('#startTime')[0].innerHTML = orderInfo.dealOntime;
        $('#address')[0].innerHTML = orderInfo.dealAddress;
        $('#dealReply')[0].innerHTML = dealReply.gift;
        $('#shippingMethod')[0].innerHTML = (orderInfo.shippingMethod == '1') ? shipping_method.SEND : shipping_method.PICK;
        cityAndProvince = (orderInfo.province == orderInfo.city) 
          ? orderInfo.province 
            : (orderInfo.province + orderInfo.city);
        $('#userAddress')[0].innerHTML = cityAndProvince + orderInfo.address;
        $('#deliveryFee')[0].innerHTML = orderInfo.deliveryFee;
        $('#money')[0].innerHTML = orderInfo.deliveryFee;
        $('#totalPayment')[0].innerHTML = orderInfo.totalPayment;
        price = orderInfo.totalPayment;
      } else {
        alert(data.msg);
      } 
    }
  })

  // 取消订单
  $('#cancelBtn').on('click', function(){
    $('#my-confirm').modal({
      relatedTarget: this,
      onConfirm: function(options) {
        $.ajax({
          url: '/dealOrder/orderCancel',
          type: 'POST',
          data: { id: parameters.id },
          dataType: 'json',
          success: function(data) {
            if(data.state == 'success'){
              zhuge.track('取消订单',{},function(){
                location.href = 'myOrder.html';
              });
            }else{
              alert(data.msg);
            }
          }
        });
      },
      onCancel: function() { return; }
    });
  });

  // 订单支付
  $('#payBtn').on('click', function(){
    zhuge.track('支付',{},function(){
      location.href = 'pay.html?price='+ price +'&id='+ parameters.id;
    });
  }); 

});

$(window).load(function() { $('.loadingWrap').hide(); });
