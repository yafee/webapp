$(function() {
  var prevPageBtn = $('header').find('a');
  var radios = $('.radio');
  var sendAddress = $('#sendAddress');
  var useTicket = false; // 是否使用瓜子券
  var ticketBtn = $('#ticketBtn');
  var orderBtn = $('#orderBtn');
  var ls = window.localStorage;
  var location = window.location;
  // var user = JSON.parse(session.getItem('user'));
  var userId = window.sessionStorage.getItem('userId');
  var nickname = session.getItem('nickname');
  var userName = session.getItem('userName');
  var hasSend = true;
  var hasPick = false;
  // alert('userId:' + window.sessionStorage.getItem('userId'));

  // 封装参数
  var parameters = {
    dealId: getQueryString('dealId'),
    priceId: getQueryString('priceId'),
    price: getQueryString('price')
  };
  // alert('dealId:' + parameters.dealId + ',userId:' + userId + ',priceId:' + parameters.priceId);
  // alert('nickname:'+nickname+',userId:'+userId+',dealId:'+parameters.dealId+',priceId:'+parameters.priceId+',price:'+parameters.price);
  // 配送方式：1代表邮寄，0代表自取。默认邮寄
  var shipping_method = {
    SEND: 1,
    PICK: 0,
    FINAL: 1
  };
  var postage;
  // 初始化页面数据
  $.ajax({
    url: '/dealOrder/beforeSubmit',
    type: 'GET',
    data: { dealId: parameters.dealId, userId: userId, priceId: parameters.priceId },
    success: function(data) {
      var dealConsignee = data.object.dealConsignee[0],
        dealInfo = data.object.dealInfo[0],
        dealReply = data.object.dealReply,
        points = money = data.object.points,
        cityAndProvince;
      var isFullPoints = (Number(points / 10) > (Number(parameters.price) + Number(dealReply.postage)));
      if (isFullPoints) {
        points = money = (Number(parameters.price) + Number(dealReply.postage)) * 10;
      }
      if (data.state == 'success') {
        if (!dealConsignee) { // 未设置收货地址
          alert('请先设置收货地址哦～');
          location.href = 'addAddress.html?dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
        } else {
          $('#poster')[0].src = dealInfo.image;
          $('#showName')[0].innerHTML = dealInfo.name;
          $('#startTime')[0].innerHTML = dealInfo.startTime;
          $('#address')[0].innerHTML = dealInfo.address;
          $('#dealReply')[0].innerHTML = dealReply.gift;
          $('#zCont').html('地址：南京市建邺区汉中门大街1号金鹰汉中新城31楼E座江苏华瀚国际娱乐文化有限公司');
          cityAndProvince = (dealConsignee.province == dealConsignee.city) ? dealConsignee.province : (dealConsignee.province + dealConsignee.city);
          $('#userAddress')[0].innerHTML = cityAndProvince + dealConsignee.address;
          $('#consignee')[0].innerHTML = dealConsignee.consignee;
          $('#mobile')[0].innerHTML = dealConsignee.mobile;
          $('#postage')[0].innerHTML = dealReply.postage;
          $('#points')[0].innerHTML = points;
          $('#money')[0].innerHTML = points / 10;
          $('#price')[0].innerHTML = Number(parameters.price) + dealReply.postage;
          // 下订单
          orderBtn.on('click', function() {
            if (hasSend) postage = dealReply.postage;
            if (hasPick) postage = 0;
            $.ajax({
              url: '/dealOrder/newOrder',
              type: 'POST',
              data: {
                dealId: parameters.dealId,
                dealName: dealInfo.name,
                userName: userName,
                userId: userId,
                province: dealConsignee.province,
                city: dealConsignee.city,
                consignee: dealConsignee.consignee,
                totalPayment: Number($('#price').html()),
                ticketPrice: parameters.price,
                deliverFee: useTicket ? Number($('#money').html()) : 0,
                postage: postage,
                address: dealConsignee.address,
                mobile: dealConsignee.mobile,
                dealOntime: dealInfo.startTime,
                dealAddress: dealInfo.address,
                shippingMethod: shipping_method.FINAL,
                priceId: parameters.priceId
              },
              success: function(data) {
                if (data.state == 'success') {
                  var price = $('#price').html();
                  zhuge.track('准备支付', {
                    dealName: dealInfo.name
                  }, function() {
                    location.href = 'pay.html?&price=' + price + '&id=' + data.object;
                  });
                } else {
                  alert(data.msg);
                  window.location.href = 'myOrder.html?which=order';
                }
              },
              error: function() {
                alert('下单失败！');
              }
            });
          });
        }
      } else {
        alert(data.msg);
      }
    },
    error: function() {
      alert('页面请求失败！');
    }
  });

  var youji = $('#youji'),
    youjiBtn = $('#youjiBtn'),
    youjiCont = $('#yCont'),
    ziqu = $('#ziqu'),
    ziquBtn = $('#ziquBtn'),
    ziquCont = $('#zCont');

  // 点击单选按钮
  clickRadioAction([youji, youjiBtn], shipping_method.SEND);
  clickRadioAction([ziqu, ziquBtn], shipping_method.PICK);

  // 点击地址事件
  sendAddress.on('click', function() {
    location.href = 'getAddress.html?from=o&dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
  });

  // 瓜子券按钮点击事件
  ticketBtn.on('click', function() {
    var _this = $(this),
      totalPrice = $('#price').html(),
      ticketPrice = $('#money').html();
    if (!useTicket) { // 使用瓜子券
      _this.addClass('active').children('div').addClass('offset');
      useTicket = true;
      // 总价减折扣
      if (totalPrice - ticketPrice < 0) {
        $('#price')[0].innerHTML = 0;
      } else {
        $('#price')[0].innerHTML = subtraction(totalPrice, ticketPrice);
      }
    } else { // 
      _this.removeClass('active').children('div').removeClass('offset');
      useTicket = false;
      // 撤回折扣
      if (hasPick) {
        $('#price')[0].innerHTML = parameters.price;
      } else {
        $('#price')[0].innerHTML = addition(Number(totalPrice), Number(ticketPrice));
      }
    }
  });

  // 返回上一页
  prevPageBtn.on('click', function() { location.href = 'support.html?dealId=' + parameters.dealId; });

  // 单选按钮渲染
  function drawRadio(radioWrap) {
    var str = '<div class="inner"></div>';
    radios.empty();
    radioWrap[0].innerHTML = str;
  }

  /**
   * 配送方式切换
   * @param  {Element} eles 
   * @param  {Number} type 配送方式
   */
  function clickRadioAction(eles, type) {
    for (i in eles) {
      eles[i].on('click', function() {
        ticketBtn.removeClass('active').children('div').removeClass('offset');
        useTicket = false;
        if (type) { // 邮寄
          $('#price').html(addition(Number(parameters.price), Number($('#postage').html())));
          drawRadio(youjiBtn);
          ziquCont.hide();
          youjiCont.show();
          shipping_method.FINAL = shipping_method.SEND;
          if (!hasSend) {
            // $('#price').html(Number($('#price').html()) + Number($('#postage').html()));
            hasPick = false;
            hasSend = true;
          }
        } else { // 自取
          $('#price').html(parameters.price);
          drawRadio(ziquBtn);
          youjiCont.hide();
          ziquCont.show();
          shipping_method.FINAL = shipping_method.PICK;
          if (!hasPick) {
            // $('#price').html(Number($('#price').html()) - Number($('#postage').html()));
            hasPick = true;
            hasSend = false;
          }
        }
      });
    }
  }

  // 模态窗口提示
  function showTip(str) {
    var tipCont = $('#tipCont');
    var tip = $('#tip');
    tipCont.html(str);
    tip.modal();
  }

  //加法  
  function addition(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }
  //减法  
  function subtraction(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }
});
