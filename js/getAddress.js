var radio = {
  NORMAL: 'imgs/city/yixuan@2x.png',
  ACTIVE: 'imgs/city/daixuan@2x.png'
};
var parameters = {
  dealId: getQueryString('dealId'),
  priceId: getQueryString('priceId'),
  price: getQueryString('price')
};
// alert('dealId:' + parameters.dealId + ',priceId:' + parameters.priceId + ',price:' + parameters.price);
$(function() {
  var location = window.location,
    user = JSON.parse(window.sessionStorage.getItem('user')),
    addBtn = $('#addBtn'),
    addresses = '';
  var userId = window.sessionStorage.getItem('userId');
  // alert(userId);
  // 获取地址信息
  $.get('/Info/displayAddress', { userId: userId }, function(data) {
    if (data.state == 'success') {
      addresses = ''; // 每次加载重置addresses   
      for (i in data.object) {
        var tempData = data.object[i],
          cityAndProvince;
        cityAndProvince = (tempData.city == tempData.province) ? (tempData.province) : (tempData.province + tempData.city);
        addresses += '<div class="address-card"><span>' + tempData.consignee + '</span><i class="am-icon-angle-right am-fr"></i><span class="am-fr mobile" onclick="setAddress(' + tempData.id + ');">' + tempData.mobile + '</span><span class="block">' + cityAndProvince + tempData.address + '</span><i class="am-icon-trash trash" onclick="delAddress($(this),' + tempData.id + ',' + userId + ');"></i><div class="default am-fr am-vertical-align" data-id="' + tempData.id + '" onclick="setDefault($(this),' + tempData.id + ',' + userId + ');"><img src="' + (tempData.isDefault ? radio.NORMAL : radio.ACTIVE) + '" class="am-vertical-align-middle"><span class="am-vertical-align-middle">设为默认</span></div></div>';
      }
      addBtn.before(addresses).show().on('click', function() {
        location.href = 'addAddress.html?dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
      });
    } else {
      alert(data.msg);
    }
  });

  // 返回上一页
  $('.back').on('click', function() {
    // if (getQueryString('from') == 'o') {     // 从确认订单页面进来的
    // 	location.href = 'order.html?dealId='+ parameters.dealId +'&priceId='+ parameters.priceId +'&price='+ parameters.price;
    // } else if (getQueryString('from') == 'mi') {
    // 	history.go(-1);
    // }else {    
    // 	location.href = 'myInfo.html';
    // }
    location.href = 'order.html?dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
  });

});

// 设为默认
function setDefault(defaultEle, id, userId) {
  var curRadio = defaultEle.find('img')[0];
  var defTip = $('#defTip'),
    content = $('#content');
  $('.default').each(function() {
    var _radio = $(this).find('img')[0];
    if (_radio.src == radio.NORMAL) {
      _radio.src = radio.ACTIVE;
      curRadio.src = radio.NORMAL;
      // 提交到后台
      $.ajax({
        url: '/Info/setDefault',
        type: 'POST',
        data: { id: id, userId: userId },
        dataType: 'json',
        success: function(data) {
          if (data.state == 'success') {
            defTip.fadeIn(300);
            var timer = setTimeout(function() {
              defTip.fadeOut(300);
              clearInterval(timer);
            }, 2000);
          } else {
            alert(data.state);
          }
        }
      });
      return;
    }
  });
}

// 删除当前地址
function delAddress(ele, id, userId) {
  var address = $('.default');
  var defaultId;
  var addressCard = ele.parents('.address-card');
  $('#delTipCont').html('删除当前地址？');
  $('#delTip').modal({
    onConfirm: function() {
      $.post('/Info/deleteAddress', { id: id, userId: userId }, function(data) {
        if (data.state == 'success') {
          // 前台删除
          addressCard.animate({ right: '-=' + $(window).width() + 'px' }, 400, function() { $(this).remove(); });
          // 找出默认地址的id
          for (i in data.object) {
            var tempData = data.object[i];
            if (tempData.isDefault) {
              defaultId = tempData.id;
              break;
            }
          }
          // 从地址列表中找出匹配的id
          $('.default').each(function() {
            var _this = $(this);
            if (_this.data('id') == defaultId) {
              _this.find('img')[0].src = radio.NORMAL;
              // 特么的模态窗口bug！！！每个 Modal 实例都存储在对应元素的 $('.am-modal').data('am.modal') 属性中，onConfirm/onCancel 会保存第一次运行 Modal 时候的数据
              // 不移除模态你试试！ 
              $('#delTip').on('closed.modal.amui', function() { $(this).removeData('amui.modal'); });
              return;
            }
          })
        } else {
          alert(data.msg);
        }
      })
    },
    onCancel: function() {
      return; }
  })
}

// 跳转去选地址
function setAddress(id) {
  // alert(id);
  window.location.href = 'setAddress.html?id=' + id + '&dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
}

// 页面加载完后关闭加载动画
$(window).load(function() { $('.loadingWrap').hide(); });
