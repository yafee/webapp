$(function() {

  var receiver = $('#receiver'),
    phone = $('#phone'),
    provinceWrap = $('#provinces'),
    provinces = '',
    cityWrap = $('#citys'),
    citys = '',
    address = $('#address'),
    saveBtn = $('#saveBtn'),
    tip = $('#tip');
  var parameters = {
    dealId: getQueryString('dealId'),
    priceId: getQueryString('priceId'),
    price: getQueryString('price')
  };
  var userId = window.sessionStorage.getItem('userId');
  // 获取省份信息
  $.ajax({
    url: '/Info/getProvince',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      if (data.state == 'success') {
        for (i in data.object) {
          var tempData = data.object[i];
          provinces += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
        }
        provinceWrap.append(provinces);
        provinceWrap.find('option[data-id="10"]').attr('selected', true);
        // 默认加载第一个省份的所有城市
        var province = provinceWrap.val();
        var provinceId = 10;
        // alert(provinceId);
        // alert('000');
        // alert('====='+provinceWrap.find('option:selected').data('id'));
        // alert('====='+provinceWrap.find('option:selected').text());
        // provinceWrap.find('option').each(function() {
        //   var _this = $(this);
        //   var curProvince = _this.text();
        //   (curProvince == province) && (provinceId = _this.data('id'));
        // });
        
        $.get('/Info/getCity', { cityId: provinceId }, function(data) {
          for (i in data.object) {
            var tempData = data.object[i];
            citys += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
          }
          cityWrap.append(citys);
        });

        // 省份切换监听
        provinceWrap.on('change', function() {
          province = $(this).val();
          citys = '';
          $(this).find('option').each(function() {
            var _this = $(this);
            var curProvince = _this.text();
            if (curProvince == province) {
              provinceId = _this.data('id');
            }
          });
          $.get('/Info/getCity', { cityId: provinceId }, function(data) {
            for (i in data.object) {
              var tempData = data.object[i];
              citys += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
            }
            cityWrap.html(citys);
          });
        });

      } else {
        alert(data.msg);
      }
    }
  });

  // 保存地址
  saveBtn.on('click', function() {
    var _this = $(this);
    _this.button('loading');
    var location = window.location,
      ls = window.localStorage,
      user = JSON.parse(session.getItem('user'));

    // 抽取常量
    var tip_illegal = {
      RECEIVER_NULL: '收件人不能为空～',
      PHONE_NULL: '手机号不能为空～',
      PHONE_ILLEGAL: '请输入正确的手机号～',
      ADDRESS_NULL: '详细地址不能为空～',
      ADDRESS_ILLEGAL: '请填写正确地址'
    };
    if (trim(receiver.val()) == '') {
      setTip(tip_illegal.RECEIVER_NULL);
      _this.button('reset');
    } else if (trim(phone.val()) == '') {
      setTip(tip_illegal.PHONE_NULL);
      _this.button('reset');
    } else if (!/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(trim(phone.val()))) {
      setTip(tip_illegal.PHONE_ILLEGAL);
      _this.button('reset');
    } else if (trim(address.val()) == '') {
      setTip(tip_illegal.ADDRESS_NULL);
      _this.button('reset');
    } else if (trim(address.val()).length < 6) {
      setTip(tip_illegal.ADDRESS_ILLEGAL);
      _this.button('reset');
    } else {
      $.ajax({
        url: '/Info/addAddress',
        type: 'POST',
        data: {
          userId: userId,
          consignee: receiver.val(),
          mobile: phone.val(),
          province: provinceWrap.val(),
          city: cityWrap.val(),
          address: address.val()
        },
        dataType: 'json',
        success: function(data) {
          if (data.state == 'success') {
            location.href = 'getAddress.html?dealId='+ parameters.dealId +'&priceId='+ parameters.priceId +'&price='+ parameters.price;
          } else {
            alert(data.msg);
            _this.button('reset');
          }
        },
        error: function(data) {
          alert(data.msg);
        }
      });
    }
  });
  //返回
  $('.back a').on('click',function(){
    location.href = 'getAddress.html?dealId='+ parameters.dealId +'&priceId='+ parameters.priceId +'&price='+ parameters.price;
  });

  // 设置提示
  function setTip(tipStr) {
    var tipWrap = $('#tipWrap');
    var str = '<div id="tip"></div>';
    $('#tip').remove();
    tipWrap[0].innerHTML = str;
    tipShowHide($('#tip'), warning, tipStr);
  }

})
