$(function() {
  var dealId = getQueryString('dealId'),
    dealName = decodeURI(decodeURI(getQueryString('dealName'))),
    pPage = 1,
    url = 'http://www.xiguachong.cn',
    voteState = '',
    shareImg = '',
    shareDesc = '',
    shareTitle = '';
  if (isWx) {
    var userId = session.getItem('userId'),
      userName = session.getItem('userName'),
      which = 'micro&dealId=' + dealId,
      flag = session.getItem('flag');
    if (flag != 'success') {
      location.href = '/user/WechatWebLogin?which=' + encodeURIComponent(which);
    }
  }
  //获取项目信息
  getDealData();
  if (voteState === 0 && isWx) {
    $('.vote').addClass('enabledVote');
  } else {
    $('.vote').addClass('disabledVote');
  }
  //获取评论
  getcommentData();
  //显示视频
  $('.video').on('click', function() {
    $('.videoMain').show();
    $('.playBtn,.poster').hide();
    var videoHeight = $('.poster').height(),
      videoWidth = $('.poster').width();
    $('.videoMain>iframe').css({
      width: videoWidth,
      height: videoHeight
    });
  });
  //页面滚动视频固定
  $(window).on('scroll', function() {
    var backHg = $('.poster').height();
    $('.videoBack').css({ "width": "100%", "height": backHg + "px" }).show();
    $('.video').addClass('fixed');
  });
  // 投票框
  $('.vote').on('click', function() {
    if (isWx) {
      if (voteState == 1) {
        $(this).removeAttr('data-am-modal');
        alert('您已投票！');
      } else if (voteState == 2) {
        $(this).removeAttr('data-am-modal');
        alert('您的票已用完！');
      } else {
        var isConfirm = confirm("每一位用户只有一次的投票机会，你确定要投票给《" + dealName + "》？");
        if(isConfirm){
          $.ajax({
            type: 'post',
            url: '/vote/save',
            data: { userId: userId ? userId : 0, dealId: dealId },
            success: function(data) {
              alert('投票成功');
              window.location.reload();
            },
            error:function(){
              alert('网络故障，投票失败');
            }
          });
        } else {
          // alert('您取消了投票！');
        }
      }
    } else {
      $('#tips').modal('open');
    }
  });


  //打开关闭评论
  $('#comment,#close').on('click', function() {
    var ele,
      _this = $(this).attr('id');
    if (_this == 'comment') {
      ele = $('.movieIntro');
    } else {
      ele = $('.commentPlace');
    }
    switchEle(ele);
  });

  //监控评论框
  $('#inputWords').on('input propertychange', function() {
    var words = $('#inputWords').val();
    if ($.trim(words) !== '') {
      $('#send').css('background', '#1dbcd2').removeAttr('disabled');
    } else {
      $('#send').css('background', '#ccc').attr('disabled', 'true');
    }
  });

  //发送
  $('#send').on('click', function() {
    if (isWx) {
      var comments = $('#inputWords').val();
      $.ajax({
        url: '/Comment/saveComments',
        type: 'POST',
        data: { dealId: dealId, userId: userId, userName: userName, content: comments },
        dataType: 'json',
        async: false,
        success: function() {
          alert('评论成功！');
          window.location.reload();
        },
        error: function() {
          alert('网络故障，评论失败');
        }
      });
    } else {
      $('#tips').modal('open');
    }
  });

  $('.more').on('click', function() {
    getcommentData();
  });
  // 分享
  if (isWx) {
    wx.ready(function() {
      var shareLink = url + '/microFilmDtl.html?dealId=' + dealId;
      wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          shareSuccess();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
          shareSuccess();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  }


  function switchEle(ele) {
    ele.slideUp(500).siblings().slideDown(500);
  }

  //获取项目数据
  function getDealData() {
    $.ajax({
      url: '/vote/detail',
      type: 'get',
      data: { dealId: dealId, userId: userId ? userId : 0 },
      async: false,
      success: function(data) {
        if (data.state == 'success') {
          var movieDtlStr = '',
            tempData = data.object.vedioAndImage,
            staringArr = tempData.staring ? tempData.staring.split('、') : [],
            starNum = staringArr.length,
            staringStr = '',
            staringStr1 = '',
            staringStr2 = '',
            trNum = Math.ceil(staringArr.length / 3),
            trStr = '';
          shareImg = url + tempData.vedioImage;
          shareTitle = tempData.dealName;
          shareDesc = "导演:" + tempData.director + "演员:" + tempData.staring;
          if (tempData.director.indexOf('、') != -1) {
            directorStr = tempData.director.replace('、', '&nbsp;');
          } else {
            directorStr = tempData.director;
          }
          $('.playBtn').before('<img src="' + tempData.vedioImage + '" class="poster">');
          $('.videoMain').html(tempData.vedioWebSource);
          $('.voteNum').html(data.object.voteNumber);
          $('.movieName').html(tempData.dealName);
          $('.director').html(directorStr);
          if (trNum > 0) {
            for (var i = 0; i < trNum; i++) {
              trStr += '<tr></tr>';
            }
            $('.actorList').html(trStr);
            $.each(staringArr, function(index, val) {
              if (index < 3) {
                staringStr1 += '<td>' + val + '&nbsp;</td>';
              } else {
                staringStr2 += '<td>' + val + '&nbsp;</td>';
              }
            });
            if (trNum < 2) {
              $('.actorList tr').eq(0).html(staringStr1);
            } else {
              $('.actorList tr').eq(0).html(staringStr1);
              $('.actorList tr').eq(1).html(staringStr2);
              var actorListHg = $('.actorList').height() / 4;
              $('.staring').css('transform', 'translateY(-' + actorListHg + 'px)');
            }
          }

          $('.description').html(tempData.filmIntroduction);
          $('.shareNums').html(data.object.repostNumber);
          $('.commentNums').html(data.object.commentNumber);
          //投票状态
          voteState = data.object.isVoted;
        }
      },
      error: function(data) {
        alert(data.msg);
      }
    });
  }

  //获取评论
  function getcommentData() {
    $.ajax({
      url: '/Comment/getComments',
      type: 'GET',
      data: { page: pPage++, dealId: dealId },
      dataType: 'json',
      success: function(data) {
        var commentStr = '';
        if (data.object.length > 0) {
          $.each(data.object, function(index) {
            commentStr += '<div class="commentItem"><div class="userImg am-text-right am-padding-right-sm"><img src="' + data.object[index].headImg + '" alt="用户头像" width="50" height="50" class="am-round"></div><div class="commentContent"><span class="name am-block">' + data.object[index].dealUserName + '</span><span class="time am-block">' + data.object[index].createTime + '</span><span class="comments">' + data.object[index].content + '</span></div></div>';
          });
          $('.more').before(commentStr);
        } else {
          $('.more').html('没有更多');
        }
      }
    });
  }

  //分享成功
  function shareSuccess() {
    $.ajax({
      url: '/vote/repost',
      type: 'POST',
      data: { userId: userId, dealId: dealId },
      success: function(data) {
        window.location.reload();
      }
    });
  }
});
