$(function() {

  var receiver = $('#receiver'),
    phone = $('#phone'),
    provinceWrap = $('#provinces'),
    provinces = '',
    cityWrap = $('#citys'),
    citys = '',
    address = $('#address'),
    saveBtn = $('#saveBtn'),
    tip = $('#tip'),
    id = getQueryString('id'),
    activeProvince, // 当前省份
    activeCity; // 当前城市
  var parameters = {
    dealId: getQueryString('dealId'),
    priceId: getQueryString('priceId'),
    price: getQueryString('price')
  };
  // alert(parameters.dealId);
  var userId = window.sessionStorage.getItem('userId');
  // 根据地址id获取地址信息
  $.ajax({
    url: '/Info/setAddress',
    type: 'GET',
    data: { id: id },
    success: function(data) {
      if (data.state == 'success') {
        var tempData = data.object;
        receiver.val(tempData.consignee);
        phone.val(tempData.mobile);
        activeProvince = tempData.province;
        activeCity = tempData.city;
        address.val(tempData.address);

        // 获取省份信息
        $.ajax({
          url: '/Info/getProvince',
          type: 'GET',
          success: function(data) {
            if (data.state == 'success') {
              for (i in data.object) {
                var tempData = data.object[i];
                provinces += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
              }
              provinceWrap.append(provinces).val(activeProvince); //设置当前省份

              // 默认加载第一个省份的所有城市 
              var province = provinceWrap.val(),
                provinceId;
              provinceWrap.find('option').each(function() {
                var _this = $(this),
                  curProvince = _this.text();
                if (curProvince == province) {
                  provinceId = _this.data('id');
                }
              })
              $.get('/Info/getCity', { cityId: provinceId }, function(data) {
                for (i in data.object) {
                  var tempData = data.object[i];
                  citys += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
                }
                cityWrap.append(citys).val(activeCity); //设置当前城市
              })

              // 省份切换监听
              provinceWrap.on('change', function() {
                province = $(this).val();
                citys = '';
                $(this).find('option').each(function() {
                  var _this = $(this),
                    curProvince = _this.text();
                  if (curProvince == province) {
                    provinceId = _this.data('id');
                  }
                })
                $.get('/Info/getCity', { cityId: provinceId }, function(data) {
                  for (i in data.object) {
                    var tempData = data.object[i];
                    citys += '<option data-id="' + tempData.cityId + '">' + tempData.name + '</option>';
                  }
                  cityWrap[0].innerHTML = citys;
                })
              })

            } else {
              alert(data.msg);
            }
          }
        })
      } else {
        alert(data.msg);
      }
    }
  })

  // 保存地址
  saveBtn.on('click', function() {
    var _this = $(this);
    _this.button('loading');
    var history = window.history,
      user = JSON.parse(window.localStorage.getItem('user'));
    // 抽取常量
    var tip_illegal = {
      RECEIVER_NULL: '收件人不能为空～',
      PHONE_NULL: '手机号不能为空～',
      PHONE_ILLEGAL: '请输入正确的手机号～',
      ADDRESS_NULL: '详细地址不能为空～',
      ADDRESS_ILLEGAL: '请填写正确地址'
    }
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
        url: '/Info/updateAddress',
        type: 'POST',
        data: {
          id: id,
          consignee: receiver.val(),
          mobile: phone.val(),
          province: provinceWrap.val(),
          city: cityWrap.val(),
          address: address.val()
        },
        dataType: 'json',
        success: function(data) {
          if (data.state == 'success') {
            location.href = 'getAddress.html?dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
          } else {
            alert(data.msg);
            _this.button('reset');
          }
        }
      });
    }
  });
  $('.back a').on('click',function(){
    location.href = 'getAddress.html?dealId=' + parameters.dealId + '&priceId=' + parameters.priceId + '&price=' + parameters.price;
  });
  // 设置提示
  function setTip(tipStr) {
    var tipWrap = $('#tipWrap');
    var str = '<div id="tip"></div>';
    $('#tip').remove();
    tipWrap[0].innerHTML = str;
    tipShowHide($('#tip'), warning, tipStr);
  }
});
