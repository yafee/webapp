var tip_send = {
    NOTLOGIN: '请先登录哦～',
    NULL: '请输入内容哦～'
  },
  moreBtn_content = {
    NORMAL: '点击查看更多 &raquo;',
    LOADING: '加载中...',
    NOMORE: '没有更多'
  },
  unit = {
    RMB: '¥',
    DAY: '天',
    PERCENT: '%'
  },
  star_img = {
    NORMAL: 'imgs/item/star_1@3x.png',
    ACTIVE: 'imgs/item/star_2@3x.png'
  },
  tab_icon = {
    XNORMAL: 'imgs/item/xiangqing_1@3x.png',
    XACTIVE: 'imgs/item/xiangqing_2@3x.png',
    PNORMAL: 'imgs/item/pinglun_1@3x.png',
    PACTIVE: 'imgs/item/pinglun_2-@3x.png',
    SNORMAL: 'imgs/item/guize_2@3x.png',
    SACTIVE: 'imgs/item/guize_1@3x.png'
  };
var head_img = 'imgs/login/touxiang-1@2x.png',
  finish = '<img src="imgs/myLove/yiwancheng-@2x.png" class="finish absolute">';

var flag = session.getItem('flag'),
  userName = session.getItem('userName'),
  nickname = session.getItem('nickname'),
  userId = session.getItem('userId'),
  dealId = getQueryString('dealId');
var which = 'item&dealId=' + dealId + '&from=i';
if (flag != 'success') { // 在微信中打开且微信未授权登陆 
    $('.cover').show();
    location.href = '/user/WechatWebLogin?which=' + encodeURIComponent(which);
}
$(function() {
  zhuge.track('查看项目详情(分享)');
  var url = window.location.href,
    location = window.location;
  var play = $('.play'),
    videoDiv = $('.video');
  var supportBtn = $('#support');
  var pPage = 1;
  var imgList = $('#imgList');
  var more = $('.more'),
    moreBtn = more.find('a');
  var bottom = $('#bottom'),
    fenxiang = $("#fenxiang");
  var sendMsg = $('#sendMsg'),
    textarea = sendMsg.find('textarea');
  // var user = JSON.parse(window.sessionStorage.getItem('user'));
  var img = '';
  // window.sessionStorage.setItem('userId', userId);
  // 默认加载详情页
  $.ajax({
    url: '/detail/detailPage',
    type: 'GET',
    data: { dealId: dealId, userId: (!userId) ? 0 : userId },
    dataType: 'json',
    async: false,
    success: function(data) {
      if (data.state == 'success') {
        var tempData = data.object,
          requestData = data.object.requestData[0],
          himage = tempData.himage,
          simage = tempData.simage,
          poster = $('.poster'),
          picList = $('.main'),
          himgList = simgList = '';
        img = data.object.requestData[0].vedioImage;
        poster[0].src = requestData.vedioImage; // 初始化海报
        checkImgComplete(poster[0], function() { initPage(play, poster); }); // 定位海报上的元素位置
        for (i in himage) { // 初始化图片列表中的图片 
          himgList += '<li><img src="imgs/index/tupianjiazai-4@2x.png" data-original="' + himage[i] + '" class="himgList"></li>';
        }
        picList.find('ul').append(himgList);
        picList.find('.am-slider').flexslider({ // 初始图片列表组件
          itemWidth: 200,
          minItems: 3,
          itemMargin: 5,
          slideshow: false,
          controlNav: false,
          directionNav: false,
          animationLoop: false,
          start: function(slider) {
            var fullscreen = $.AMUI.fullscreen;
            var ua = navigator.userAgent.toLowerCase();
            slider.find('img').each(function() {
              $(this).on('click', function() {
                if (fullscreen.enabled && ua.indexOf('qqbrowser') == -1) { // 腾讯系浏览器不支持
                  fullscreen.isFullscreen ? $(this).removeClass('full').addClass('himgList') : $(this).removeClass('himgList').addClass('full');
                  fullscreen.toggle(this);
                }
              })
            })
          }
        });
        $(".himgList").lazyload();
        // 初始化视频源，并添加视频播放事件  
        if (requestData.vedioWebSource.indexOf('http://v.qq.com') != -1) {
          videoDiv[0].innerHTML = requestData.vedioWebSource;
          play.on('click', function() {
            videoDiv.css({
              'width': poster.width(),
              'height': poster.height(),
              'left': poster.css('marginLeft')
            }).show().find('iframe').attr({
              'width': '100%',
              'height': '100%'
            });
            poster.css('visibility', 'hidden');
            play.css('visibility', 'hidden');
          })
        } else {
          play.addClass('am-hide');
        }

        // 初始化详情页内容
        // var stars = '',
        //   i = j = 0;
        // for (; i < requestData.star; i++) {
        //   stars += '<img src="' + star_img.ACTIVE + '">';
        // }
        // for (; j < (5 - requestData.star); j++) {
        //   stars += '<img src="' + star_img.NORMAL + '">';
        // }
        $('.title')[0].innerHTML = requestData.name;
        // $('#stars')[0].innerHTML = stars;
        $('#startTime')[0].innerHTML = requestData.startTime;
        $('#address')[0].innerHTML = requestData.address;
        // $('#successCount')[0].innerHTML = unit.RMB + requestData.successSupportCount;
        // $('#restDays')[0].innerHTML = requestData.restDays + unit.DAY;
        // $('#dacheng')[0].innerHTML = Math.floor(requestData.successSupportCount / requestData.totalSupportCount * 100) + unit.PERCENT;
        // $('#totalCount')[0].innerHTML = unit.RMB + requestData.totalSupportCount;
        // $('#totalDays')[0].innerHTML = requestData.totalDays + unit.DAY;
        for (i in simage) { // 初始化详情图
          simgList += '<img src="imgs/index/tupianjiazai-4@2x.png" data-original="' + simage[i] + '" class="am-img-responsive descImg" style="width:100%;">';
        }
        imgList[0].innerHTML = simgList;
        $(".descImg").lazyload();
      } else {
        alert(data.msg);
      }
    }
  });
  // 分享
  wx.ready(function() {
    var url = 'http://www.xiguachong.cn';
    var shareTitle = $('.title').text(),
      shareImg = url + img,
      shareLink = url + '/item.html?form=i&dealId=' + dealId;
    wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      link: shareLink, // 分享链接
      imgUrl: shareImg, // 分享图标
      success: function() {
        zhuge.track('分享到朋友圈');
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareAppMessage({
      title: '我在西瓜虫发现一个非常棒的演出！', // 分享标题
      desc: shareTitle, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: shareImg, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        zhuge.track('发送给朋友');
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
  });

  /**
   * 点击标签
   */

  var ximg = $('#ximg'),
    pimg = $('#pimg'),
    simg = $('#simg');
  var xfont = $('#xfont'),
    pfont = $('#pfont'),
    sfont = $('#sfont');
  var xtab = $('.xiangqing'),
    ptab = $('.pinglun'),
    stab = $('.shiyong');
  var xcontent = $('.xiangqing-content'),
    scontent = $('#guize');

  // 评论事件，数据每次都重新加载
  ptab.on('click', function() {
    changeTab.clearTab(ximg, tab_icon.XNORMAL, xfont, xtab); // 清除其他标签
    changeTab.clearTab(simg, tab_icon.SNORMAL, sfont, stab);
    changeTab.activeTab(pimg, tab_icon.PACTIVE, pfont, ptab); // 激活当前标签 
    $(".pinglun-content").remove();
    pPage = 1; // 重置评论数据，防止重复加载
    queryCommentData();
    displayController([xcontent, imgList, scontent], more, false);
  });

  // 加载更多评论
  more.on('click', function() { queryCommentData(); });

  // 详情事件，仅页面加载时请求一次
  xtab.on('click', function() {
    changeTab.clearTab(pimg, tab_icon.PNORMAL, pfont, ptab);
    changeTab.clearTab(simg, tab_icon.SNORMAL, sfont, stab);
    changeTab.activeTab(ximg, tab_icon.XACTIVE, xfont, xtab);
    $(".pinglun-content").remove(); // 显示详情页内容
    displayController([more, scontent], [xcontent, imgList], false);
  });

  // 使用规则，仅点击时加载一次
  stab.on('click', function() {
    changeTab.clearTab(ximg, tab_icon.XNORMAL, xfont, xtab);
    changeTab.clearTab(pimg, tab_icon.PNORMAL, pfont, ptab);
    changeTab.activeTab(simg, tab_icon.SACTIVE, sfont, stab);
    $(".pinglun-content").remove(); // 显示使用规则
    displayController([xcontent, imgList, more], scontent, false);
  });

  /**
   * 发送评论
   */

  // 弹出发送评论文本域 
  bottom.find('input').focus(function() {
    displayController(bottom, sendMsg, false);
    textarea.focus();
  });

  // 取消发送评论    
  $('.cancel').on('click', function() { displayController(sendMsg, bottom, false); });

  // 发送评论  
  $('.send').on('click', function() {
    if (flag != 'success') { // 未登录用户不能评论
      showTip(tip_send.NOTLOGIN);
    } else if (trim(textarea.val()) == '') {
      showTip(tip_send.NULL);
    } else {
      $.ajax({
        url: '/Comment/saveComments',
        type: 'POST',
        data: { dealId: dealId, userId: userId, userName: nickname, content: textarea.val() },
        dataType: 'json',
        success: function(data) {
          if (data.state == 'success') {
            // 主动跳到评论标签页
            ptab.click();
            // 隐藏文本域，显示原底部块
            displayController(sendMsg, bottom, false);
            zhuge.track('评论项目', {
              nickname: nickname
            });
          } else {
            alert(data.msg);
          }
        }
      });
    }
  });

  // 立即购买
  supportBtn.on('click', function() {
    var title = $('.title').text();
    if (!userName) { // userName为空，未绑定手机号
      window.location.href = 'bind.html?dealId=' + dealId + '&which=item';
    } else {
      zhuge.track('点击购买门票', {
        '演唱会名字': title
      }, function() {
        location.href = 'support.html?dealId=' + dealId;
      });
    }
  });

  // 加载评论数据
  function queryCommentData() {
    $.ajax({
      url: '/Comment/getComments',
      type: 'GET',
      data: { page: pPage++, dealId: dealId },
      dataType: 'json',
      beforeSend: function() { moreBtn.html(moreBtn_content.LOADING); },
      success: function(data) {
        if (data.state == 'success') {
          if (!data.object || data.object.length === 0) {
            moreBtn.html(moreBtn_content.NOMORE);
          } else {
            moreBtn.html(moreBtn_content.NORMAL);
            var pContent = '',
              headImg;
            for (i in data.object) {
              var tempData = data.object[i];
              headImg = ((!tempData.headImg) || (tempData.headImg == '')) ? head_img : tempData.headImg;
              pContent += '<ul class="pinglun-content am-text-sm"><li><img src="' + headImg + '" class="am-margin-right-sm"><span>' + tempData.dealUserName + ' : ' + tempData.content + '</span></li></ul>';
            }
            more.before(pContent);
          }
        } else {
          alert(data.msg);
        }
      },
      error: function(data) {
        alert('请求评论失败！');
      }
    });
  }

  // 返回上一页
  $('.back').on('click', function() {
    var targetURL = '';
    switch (getQueryString('from')) {
      case 'l':
        targetURL = 'myLove.html';
        break;
      case 'i':
      default:
        targetURL = 'index.html';
        break;
    }
    location.href = targetURL;
  });

  // 模态窗口提示
  function showTip(str) {
    $('#tipCont').html(str);
    $('#sendTip').modal();
  }

});

$(window).load(function() { $('.loadingWrap').hide(); });

$(window).resize(function() { initPage($('.play'), $('.poster')); });

// 滚动到目标高度时，动画显示数据。   
$(window).scroll(function() {
  var percent = parseInt($('#dacheng').html()),
    num = $('.num');
  if ($(document).scrollTop() >= 130) {
    if (percent >= 100) {
      num.width('99.6%');
    } else {
      num.width(percent + '%');
    }
    return;
  }
})

/**
 * 循环侦测图片是否加载完毕
 * @param  {Element}   img     需要检测的图片
 * @param  {Function} callback 侦测成功后的回调方法
 */
function checkImgComplete(img, callback) {
  var timer = setInterval(function() {
    if (img.complete) {
      callback();
      clearInterval(timer);
    }
  }, 50);
}

/**
 * 初始化页面元素
 * @param  {Element} playBtn 播放按钮
 * @param  {Element} poster 视频海报
 * @param  {Element} loveBtn 收藏按钮 
 */
function initPage(playBtn, poster, loveBtn) {
  playBtn.css({ 'top': ((poster.height() - playBtn.height()) / 2), 'display': 'block' });
  // loveBtn.show();
}

// 标签切换
var changeTab = {
  /**
   * 清除其它标签的字体、底边和小图标样式
   * @param  {Element} imgEle  标签节点
   * @param  {String} imgPath  未激活的小图标
   * @param  {Element} font 标签名称
   * @param  {Element} tab  标签
   */
  clearTab: function(imgEle, imgPath, font, tab) {
    imgEle[0].src = imgPath;
    font.css('color', '#fff');
    tab.css('borderBottom', 'none');
  },
  /**
   * 激活当前标签样式
   * @param  {Element} imgEle  标签节点
   * @param  {String} imgPath  未激活的小图标
   * @param  {Element} font 标签名称
   * @param  {Element} tab  标签
   */
  activeTab: function(imgEle, imgPath, font, tab) {
    imgEle[0].src = imgPath;
    font.css('color', '#2BC0D4');
    tab.css('borderBottom', '.1rem solid #2BC0D4');
  }
};
