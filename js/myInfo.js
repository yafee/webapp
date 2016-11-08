var mod_tip = {
  HEAD: '要去微信公众号里更换头像哦～',
  NICKNAME: '三方登录不能修改昵称～',
  MOBILE: '三方登录不能修改手机～',
  PASSWORD: '三方登录不能修改密码～'
}

$(function() {

  var location = window.location,
    ua = navigator.userAgent.toLowerCase(),
    userObj = JSON.parse(session.getItem('user')),
    flag = session.getItem('flag'),
    headerImg = $('#headerImg');

  // 获取用户信息   
  $.post('/Info/getUserInfo', { userId: userObj.userId }, function(data) {
    if (data.state == 'success') {
      var tempData = data.object;
      if (tempData.headImage != '' && tempData.headImage != null) {
        session.setItem('imgurl', tempData.headImage);
        headerImg[0].src = imgurl = session.getItem('imgurl');
      }
      showUserInfo(tempData.userName, tempData.mobile);
    } else {
      alert(data.msg);
    }
  })

  // 设置提示
  function setTip(tipStr) {
    var str = '<div id="tip"></div>';
    $('#tip').remove();
    $('#tipWrap')[0].innerHTML = str;
    tipShowHide($('#tip'), warning, tipStr);
  }

  // 显示用户信息             
  function showUserInfo(dataUsername, dataMobile) {
    var userName = $('#userName');
    var phoneNum = $('#mobile');
    userName[0].innerHTML = dataUsername;
    phoneNum[0].innerHTML = dataMobile;
    // 加载完数据后存到本地以保持用户登录状态                
    userObj.nickname = dataUsername;
    userObj.phoneNum = dataMobile;
    session.setItem('user', JSON.stringify(userObj));
  }

  if (ua.match(/MicroMessenger/i) == "micromessenger") { // 在微信中打开

    /**
     * 调用JSSDK获取本地相册和摄像头
     */
    var images = {
      localId: [],
      serverId: [],
      downloadId: []
    };

    // 点击头像进入相册或拍照
    headerImg.on('click', function() {

      $('.loadingWrap').show();

      wx.ready(function() {

        $('.loadingWrap').hide();

        // 选择本地图片
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            headerImg[0].src = images.localId[0];
            session.setItem('imgurl', images.localId[0]);

            // 上传图片到微信服务器 
            wx.uploadImage({
              localId: images.localId[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示   
              success: function(res) {
                images.serverId.push(res.serverId);
                $.ajax({
                  url: '/Download/getMedia',
                  type: 'GET',
                  data: { media_id: res.serverId, access_token: session.access_token, userId: userObj.userId }
                })
              },
              error: function(res) {
                alert(JSON.stringify(res));
              }
            });

          }
        });
        wx.onMenuShareAppMessage({
          title: '我在西瓜虫发现一个非常棒的演出！', // 分享标题
          desc: title, // 分享描述
          link: 'www.xiguachong.cn/item.html', // 分享链接
          imgUrl: 'www.xiguachong.cn/imgs/index/2@3x.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分   享后执行的回调函数
            alert('chpngong');
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            alert('sbibaile');
            
          }
        });



      });

    })

  } else {
    headerImg.on('click', function() { setTip(mod_tip.HEAD); });
  }

})

// 页面加载完后关闭加载动画
$(window).load(function() { $('.loadingWrap').hide(); });
