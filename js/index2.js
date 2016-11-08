var moreBtn_content = {
    NORMAL: '点击查看更多 &raquo;',
    LOADING: '加载中...',
    NOMORE: '没有更多'
  },
  frist_tab_name = {
    AWARD: '金蜂鸟奖',
    RECOMMEND: '推荐众筹',
    PERFORM: '演出众筹',
    STAR: '星动众筹',
    DREAM: '梦想众筹',
    LATEST: '最新上线',
    EXPENSIVE: '金额最高',
    SUPPORT: '支持最多'
  },
  second_tab_name = {
    ALL: '全部',
    VARIETY: '演唱会',
    CONCERT: '话剧',
    OTHER: '其他'
  },
  // left_tab_name = {
  //   INDEX: '首页',
  //   LIVE: 'Live&nbsp;House',
  //   LAI: '来斯秀',
  //   PAI: '排行榜'
  // },
  right_list = {
    UINFO: '我的资料',
    UWALLET: '我的钱包',
    ULOVE: '我的关注',
    UORDER: '我的订单',
    SHARE: '分享有礼',
    LOGOUT: '退出登录'
  },
  zan_img = {
    NORMAL: 'imgs/panxi/zan@3x.png',
    ACITVE: 'imgs/index/zan-0.png'
  },
  modal_tip = {
    NOTLOGIN: '请先登录哦～'
  };

$(function() {
  var award = $('#award'),
    tuijian = $('#tuijian'),
    quanbu = $('#quanbu'),
    renqi = $('#renqi'),
    dream = $('#dream'),
    paihang = $('#paihang'),
    kind = $('.kind'),
    tabTits = $('#tab').children('a'), // 所有类型标签
    paihangList = paihang.find('ul'),
    quanbuList = quanbu.find('.paihang').find('ul'),
    addMoreBtnTitle = '',
    secondMenu,
    listPage = recPage = xinPage = dreamPage = awardPage = 1, // 数据分页
    userId = session.getItem('userId'),
    which = getQueryString('which'),
    location = window.location;
  switch (which) {
    case 'all':
      which = second_tab_name.ALL;
      break;
    case 'yanchanghui':
      which = second_tab_name.VARIETY;
      break;
    case 'huaju':
      which = second_tab_name.CONCERT;
      break;
    case 'other':
      which = second_tab_name.OTHER;
      break;
    default:
      which = '默认';
  }
  // “加载更多”按钮交互
  // var addMoreBtnChange = {
  //   checkContainer: function(title) { // title 标签名称
  //     var container;
  //     switch (title) {
  //       case frist_tab_name.LATEST:
  //       case frist_tab_name.EXPENSIVE:
  //       case frist_tab_name.SUPPORT:
  //         container = paihang;
  //         break;
  //       case frist_tab_name.PERFORM:
  //       case second_tab_name.ALL:
  //       case second_tab_name.VARIETY:
  //       case second_tab_name.CONCERT:
  //       case second_tab_name.OTHER:
  //         container = quanbu;
  //         break;
  //       case frist_tab_name.RECOMMEND:
  //         container = tuijian;
  //         break;
  //       case frist_tab_name.STAR:
  //         container = renqi;
  //         break;
  //       case frist_tab_name.DREAM:
  //         container = dream;
  //         break;
  //       case frist_tab_name.AWARD:
  //         container = award;
  //         break;
  //     }
  //     return container; // 当前标签所在容器 
  //   },
  //   findMoreBtn: function(title) {
  //     return this.checkContainer(title).find('.more').children('a');
  //   },
  //   normal: function(title) { this.findMoreBtn(title).html(moreBtn_content.NORMAL); },
  //   loading: function(title) { this.findMoreBtn(title).html(moreBtn_content.LOADING); },
  //   nomore: function(title) { this.findMoreBtn(title).html(moreBtn_content.NOMORE); }
  // };

  // getLocation(); // 定位城市
  // （9.12）
  // 演出众筹
  queryClassData(which, true);
  // （9.12）
  $('.kind').find('div').each(function() {
    $(this).on('click', function() {
      var title = $(this).find('span');
      $('.quanbu').find('.more a').html('点击查看更多 &raquo;');
      $(this).siblings().removeClass('active-kind').find('span').css('color', '#ccc');
      $(this).addClass('active-kind');
      switch ($.trim(title.html())) {
        case second_tab_name.ALL:
          title.css('color', '#1dbcd2');
          break;
        case second_tab_name.VARIETY:
          title.css('color', '#82d758');
          break;
        case second_tab_name.CONCERT:
          title.css('color', '#fe5262');
          break;
        case second_tab_name.OTHER:
          title.css('color', '#546fb4');
          break;
      }
      // 每个二级标签点击时都重置数据
      quanbuList.empty();
      listPage = 1;
      queryClassData($(this).find('span').html(), false);
    });
  });

  //(9.12)
  $('.quanbu').find('.more').on('click', function() {
    var title = $.trim($('.active-kind').find('span').html());
    queryClassData(title);
  });


  //获取不同类别数据（9.12）
  function queryClassData(cls, flag) {
    var kinds = $('.kind').find('div');
    var dataListUrl = '',
      paramters = null;
    switch (cls) {
      case second_tab_name.ALL:
        if (flag) {
          kinds.eq(0).addClass('active-kind');
          kinds.eq(0).find('span').css('color', '#1dbcd2');
        }
        dataListUrl = '/project/allPro';
        paramters = { page: listPage++ };
        break;
      case second_tab_name.CONCERT:
        if (flag) {
          kinds.eq(2).addClass('active-kind');
          kinds.eq(2).find('span').css('color', '#82d758');
        }
        dataListUrl = '/project/singlePro';
        paramters = { page: listPage++, cateId: 1 };
        break;
      case second_tab_name.VARIETY:
        if (flag) {
          kinds.eq(1).addClass('active-kind');
          kinds.eq(1).find('span').css('color', '#fe5262');
        }
        dataListUrl = '/project/singlePro';
        paramters = { page: listPage++, cateId: 2 };
        break;
      case second_tab_name.OTHER:
        if (flag) {
          kinds.eq(3).addClass('active-kind');
          kinds.eq(3).find('span').css('color', '#546fb4');
        };
        dataListUrl = '/project/singlePro';
        paramters = { page: listPage++, cateId: 3 };
        break;
      default:
        if (flag) {
          kinds.eq(0).addClass('active-kind');
          kinds.eq(0).find('span').css('color', '#1dbcd2');
        }
        dataListUrl = '/project/allPro';
        paramters = { page: listPage++ };
    }
    $.ajax({
      url: dataListUrl,
      type: 'GET',
      data: paramters,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        var content = '';
        if (data.object.length > 0) {
          for (i in data.object) {
            var tempData = data.object[i];
            content += "<li class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'style='background:#202020;' onclick='support(" + tempData.dealId +");'><div class='am-u-sm-4 am-u-md-2 am-list-thumb' style='margin-top:-.5rem;'><img src='http://www.d-du.com/images/grey.gif' data-original='" + tempData.image + "' class='am-img-responsive paihang-poster'/></div><div class='am-u-sm-8 am-u-md-10 am-list-main'><span class='paihang-title'>" + tempData.name + "</span><div class='price'><span>¥&nbsp;" + tempData.price + "</span>&nbsp;起</div><div class='time'>时间:" + tempData.startTime + "</div><div class='address'>地址:" + tempData.address + "</div></div></li>";
          }
          $('.quanbu .paihang ul').append(content);
          $(".paihang-poster").lazyload({ threshold: 200 });
        } else {
          $('.quanbu').find('.more a').html('没有更多');
        }
      },
      error: function(data) {
        console.log(data);
      }
    })
  }


  //金蜂鸟奖
  // queryAwardData();
  // queryRecommendData();     // 初始化首页标签，默认加载推荐标签数据

  // 轮播图
  $.get('project/CarouselFigure', function(data) {
    // console.log(data)
    if (data.state == 'success') {
      var content = '';
      for (i in data.object) {
        content += '<li><img src="' + data.object[i] + '"></li>';
      }
      $('.quanbu .am-slides').html(content);
      $('.quanbu .am-slider').flexslider().css('opacity', 1);
    } else {
      alert(data.msg);
    }
  });


  /**
   * 标签切换
   */

  // 首页标签切换
  tabTits.on('click', function() {
    changeTabColor(tabTits, $(this));
    switch ($.trim($(this).html())) {
      case frist_tab_name.AWARD: //金蜂鸟奖
        $('#banner').flexslider().css('opacity', 1);
        displayController([tuijian, quanbu, renqi], award, true);
        award.find('.more').show();
        break;
      case frist_tab_name.RECOMMEND: // 推荐
        displayController([quanbu, renqi, award], tuijian, true);
        // hack 部分浏览器返回推荐页时内容显示不正确的bug
        // if ($('.tuijian').eq(0).find('img').last().css('bottom') == '0px' || ua.match(/MicroMessenger/i) == "micromessenger") 
        initPage($('.tuijian'));
        queryRecommendData();
        break;
      case frist_tab_name.PERFORM: // 演出众筹
        $('.quanbu .am-slider').flexslider().css('opacity', 1); // 初始化轮播图
        quanbu.find('.more').show();
        addMoreBtnTitle = $.trim($(this).html());
        if ($.trim(quanbuList.html()) == '') {
          // 默认调用“全部”接口  
          listPage = 1;
          queryDataList($(this).html(), quanbuList);
          // 给演出众筹的二级菜单加上点击事件
          secondMenu = kind.find('div');
          secondMenu.each(function() {
            $(this).on('click', function() {
              var title = $(this).find('span');
              addMoreBtnTitle = title.html();
              secondMenu.removeClass('active-kind');
              $(this).addClass('active-kind');
              kind.find('span').css('color', '#ccc');
              switch ($.trim(title.html())) {
                case second_tab_name.ALL:
                  title.css('color', '#1dbcd2');
                  break;
                case second_tab_name.VARIETY:
                  title.css('color', '#82d758');
                  break;
                case second_tab_name.CONCERT:
                  title.css('color', '#fe5262');
                  break;
                case second_tab_name.OTHER:
                  title.css('color', '#546fb4');
                  break;
              }
              // 每个二级标签点击时都重置数据
              quanbuList.empty();
              listPage = 1;
              queryDataList($(this).find('span').html(), quanbuList);
            })
          })
        }
        kind.is(':hidden') && kind.show(); // 首次加载只隐藏kind不隐藏quanbu，解决图片轮播加载bug。
        displayController([tuijian, renqi, award], quanbu, true);
        break;
      case frist_tab_name.STAR: // 星动众筹
        renqi.find('.more').show();
        // 初始化
        if (!renqi.find('.renqi').html()) {
          xinPage = 1;
          queryStarData();
        }
        displayController([tuijian, quanbu, award], renqi, true);
        break;
      case frist_tab_name.DREAM: // 梦想众筹
        // 初始化
        queryDreamData();
        displayController([tuijian, quanbu, renqi], dream, true);
        break;
      case frist_tab_name.LATEST: // 最新上线
      case frist_tab_name.EXPENSIVE: // 金额最高
      case frist_tab_name.SUPPORT: // 支持最多 
        paihangList.hide().empty();
        paihang.find('.more').children('a').html(moreBtn_content.NORMAL);
        listPage = 1, addMoreBtnTitle = $(this).html();
        queryDataList($(this).html(), paihangList);
        paihangList.show();
        break;
    }
  })

  // 左侧标签栏事件                                    
  // $("#left-nav").delegate('li', 'click', function() {
  //   var title = $.trim($(this).find('span').html());
  //   switch ($.trim(title)) {
  //     case left_tab_name.INDEX:
  //       // 更换标签组           
  //       tabTits.last().show();
  //       tabTits.eq(0).html(frist_tab_name.RECOMMEND);
  //       tabTits.eq(1).html(frist_tab_name.PERFORM);
  //       tabTits.eq(2).html(frist_tab_name.STAR);
  //       // 设置默认标签颜色
  //       changeTabColor(tabTits, tabTits.eq(0));
  //       tabTits.css('width', '23%');
  //       // 直接显示“推荐”数据即可。（加载页面时已经初始化） 
  //       displayController([quanbu, renqi, paihang], tuijian, false);
  //       $("#leftside").offCanvas('close');
  //       break;
  //     case left_tab_name.LIVE:
  //       location.href = 'live.html';
  //       break;
  //     case left_tab_name.LAI:
  //       location.href = 'panxi.html';
  //       break;
  //     case left_tab_name.PAI:
  //       // 更换标签组
  //       tabTits.last().hide();
  //       tabTits.eq(0).html(frist_tab_name.LATEST);
  //       tabTits.eq(1).html(frist_tab_name.EXPENSIVE);
  //       tabTits.eq(2).html(frist_tab_name.SUPPORT).show();
  //       // 设置默认标签颜色
  //       changeTabColor(tabTits, tabTits.eq(0));
  //       tabTits.css('width', '32%');
  //       // 初始化排行榜
  //       if ($.trim(paihangList.html()) == '') {
  //         listPage = 1;
  //         queryDataList(frist_tab_name.LATEST, paihangList);
  //       }
  //       paihang.find('.more').show();
  //       addMoreBtnTitle = frist_tab_name.LATEST; // 默认调用“最新上线”接口
  //       displayController([tuijian, quanbu, renqi], paihang, false);
  //       $("#leftside").offCanvas('close');
  //       break;
  //     default:
  //       location.href = 'city.html';
  //       break;
  //   }
  // });

  // // 微信平台子菜单定位 
  // var from = getQueryString('from');
  // if (from) {
  //   if (from == 'show') {
  //     tabTits.eq(1).click();
  //     tabTits.eq(0).on('click', function() { 
  //       // $(".vidPoster").lazyload();
  //       // $(".imgPoster").lazyload(); 
  //     })
  //   } else if (from == 'star') {
  //     tabTits.eq(2).click();
  //   }
  // }

  /**
   * 数据加载
   */
  //获取金蜂鸟奖数据
  function queryAwardData() {
    var title = frist_tab_name.AWARD;
    $.ajax({
      url: '/vote/GBird',
      type: 'get',
      data: { cateId: 8, page: awardPage++ },
      beforeSend: function() { addMoreBtnChange.loading(title); },
      success: function(data) {
        if (data.state == 'success') {
          if (data.object.deals.length !== 0) {
            var bannerStr = '',
              dealStr = '';
            addMoreBtnChange.normal(title);
            //banner显示
            $.each(data.object.imageInfo, function(index, val) {
              bannerStr += '<li><a href="' + data.object.imageInfo[index].imageUrl + '"><img src="' + data.object.imageInfo[index].image + '"></a></li>';
            });
            $('#banner ul').html(bannerStr);
            $('#award .am-slider').flexslider().css('opacity', 1);
            //获取活动项目
            $.each(data.object.deals, function(index) {
              dealStr += '<a href="microFilmDtl.html?dealName=' + encodeURI(encodeURI(data.object.deals[index].name)) + '&dealId=' + data.object.deals[index].dealId + '"><img src="' + data.object.deals[index].vedioImage + '"><div class="cover"><span>' + data.object.deals[index].name + '</span></div></a>';
            });
            $('#banner').after(dealStr);
          } else {
            addMoreBtnChange.nomore(title);
          }
        }
      },
      error: function(data) {
        alert(data.msg);
      }
    });
  }

  // 加载推荐标签数据
  function queryRecommendData() {
    var title = frist_tab_name.RECOMMEND;
    $.ajax({
      url: '/project/recommend',
      type: 'GET',
      data: { page: recPage++ },
      dataType: 'json',
      beforeSend: function() { addMoreBtnChange.loading(title); },
      success: function(data) {
        if (data.state == 'success') {
          var content = '';
          ifHasData(data.object) ? addMoreBtnChange.normal(title) : addMoreBtnChange.nomore(title);
          for (i in data.object) {
            var tempData = data.object[i]; //  imgs/index/tupianjiazai-4@2x.png
            content += "<div class='tuijian'><img src='http://www.d-du.com/images/grey.gif' class='vidPoster' data-original='" + tempData.vedioImage + "'/><img src='imgs/index/shipin@2x.png'/><div class='video'>" + tempData.vedioWebSource + "</div><a href='item.html?from=i&dealId=" + tempData.dealId + "' class='link'><img src='http://www.d-du.com/images/grey.gif' class='imgPoster' data-original='" + tempData.dealBanner + "'/><div class='intro am-vertical-align'><img src='imgs/index/yichou@3x.png' class='am-vertical-align-middle'/><span class='am-sans-serif am-vertical-align-middle'> 已筹" + tempData.successSupportCount + "</span><img src='imgs/index/shengyu@3x.png' class='am-vertical-align-middle'/><span class='am-sans-serif am-vertical-align-middle'> 剩余" + tempData.restDays + "天</span><img src='imgs/index/dachenglv-@3x.png' class='am-vertical-align-middle'/><span class='am-sans-serif am-vertical-align-middle'> 已达" + Math.floor(tempData.successSupportCount / tempData.totalSupportCount * 100) + "%</span></div></a></div>";
          }
          tuijian.find('.more').before(content);
          $(".vidPoster").lazyload({ threshold: 200 });
          $(".imgPoster").lazyload({ threshold: 200 });
          // 页面元素初始化
          $('.tuijian').each(function() {
            var _this = $(this),
              curPoster = _this.find('.vidPoster'),
              curPlay = curPoster.next(),
              curImgPoster = _this.find('.imgPoster');
            // 播放按钮初始化
            checkImgComplete(curPoster[0], function() {
                curPoster = _this.find('.vidPoster');
                var curPlayTop = (curPoster.height() - curPlay.height()) / 2;
                curPlay.css('top', curPlayTop).show().addClass('am-animation-fade');
              })
              // 支持部分初始化
            checkImgComplete(curImgPoster[0], function() {
                curImgPoster = _this.find('.imgPoster');
                var curImgPosterBottom = curImgPoster.height() / 2;
                _this.find('img').last().css('bottom', curImgPosterBottom);
                _this.find('.intro').show().addClass('am-animation-fade');
              })
              // 视频播放事件 
            curPlay.on('click', function() {
              _this.find('.video').css({
                'width': curPoster.width(),
                'height': curPoster.height(),
                'left': curPoster.css('marginLeft')
              }).show().find('iframe').attr({
                'width': '100%',
                'height': '100%'
              });
              curPoster.css('visibility', 'hidden');
              curPlay.css('visibility', 'hidden');
            })
          })
        } else {
          alert(data.msg);
        }
      }
    })
  }

  // 加载星动众筹标签数据
  function queryStarData() {
    var title = frist_tab_name.STAR;
    $.ajax({
      url: '/project/getSome',
      type: 'GET',
      data: { page: xinPage++, cateId: 4 },
      dataType: 'json',
      beforeSend: function() { addMoreBtnChange.loading(title); },
      success: function(data) {
        if (data.state == 'success') {
          var content = '';
          ifHasData(data.object) ? addMoreBtnChange.normal(title) : addMoreBtnChange.nomore(title);
          for (i in data.object) {
            var tempData = data.object[i];
            content += "<a href='item_star.html?dealId=" + tempData.dealId + "' class='renqi'><img src='http://www.d-du.com/images/grey.gif' data-original='" + tempData.videoImage + "' class='renqiPoster'><img src='imgs/renqi/dibumengban@3x.png' class='renqi-mengban'><span>" + tempData.name + "</span><span>" + tempData.tags + "</span><button>支持</button></a>";
          }
          renqi.find('.more').before(content);
          var renqiPoster = $(".renqiPoster");
          renqiPoster.lazyload({ threshold: 200 });
          checkImgComplete(renqiPoster[0], function() {
            $('.renqi-mengban').show().addClass('am-animation-fade');
            renqi.find('span').show().addClass('am-animation-fade');
            renqi.find('button').show().addClass('am-animation-fade');
          })
        } else {
          alert(data.msg);
        }
      }
    })
  }

  // 加载梦想众筹数据
  function queryDreamData() {
    var title = frist_tab_name.DREAM,
      user = JSON.parse(session.getItem('user')),
      userId = user ? user.userId : 0;
    $.ajax({
      url: '/project/getDream',
      type: 'GET',
      data: { page: dreamPage++, cateId: 7, userId: userId },
      dataType: 'json',
      beforeSend: function() { addMoreBtnChange.loading(title); },
      success: function(data) {
        if (data.state == 'success') {
          var content = '',
            icon = data.object.isPraise ? zan_img.ACITVE : zan_img.NORMAL;
          ifHasData(data.object) ? addMoreBtnChange.normal(title) : addMoreBtnChange.nomore(title);
          for (i in data.object) {
            var tempData = data.object[i];
            content += '<div class="dream"><a href="item_dream.html?dealId=' + tempData.dealId + '" onclick="checkLogin($(this),' + userId + ');"><img src="http://www.d-du.com/images/grey.gif" data-original=' + tempData.image + ' class="dreamPoster"><div class="zan am-vertical-align"><img src="' + icon + '" class="am-vertical-align-middle"><span class="am-vertical-align-middle">' + tempData.praiseNum + '</span></div></div>';
          }
          dream.find('.more').before(content);
          var dreamPoster = $('.dreamPoster');
          dreamPoster.lazyload({ threshold: 200 });
          checkImgComplete(dreamPoster[0], function() {
            $('.zan').show().addClass('am-animation-fade');
          })
        } else {
          alert(data.msg);
        }
      }
    })
  }

  /**
   * 数据列表加载 
   * @param {String} title 标签名称 
   * @param {Element} container 数据列表的外层容器  
   */
  // function queryDataList(title, container) {
  //   var dataListUrl = '',
  //     paramters = null;
  //   switch ($.trim(title)) {
  //     case frist_tab_name.LATEST:
  //       dataListUrl = '/project/last';
  //       paramters = { page: listPage++ };
  //       break;
  //     case frist_tab_name.EXPENSIVE:
  //       dataListUrl = '/project/highest';
  //       paramters = { page: listPage++ };
  //       break;
  //     case frist_tab_name.SUPPORT:
  //       dataListUrl = '/project/rank';
  //       paramters = { page: listPage++ };
  //       break;
  //     case frist_tab_name.PERFORM:
  //     case second_tab_name.ALL:
  //       dataListUrl = '/project/allPro';
  //       paramters = { page: listPage++ };
  //       break;
  //     case second_tab_name.CONCERT:
  //       dataListUrl = '/project/singlePro';
  //       paramters = { page: listPage++, cateId: 1 };
  //       break;
  //     case second_tab_name.VARIETY:
  //       dataListUrl = '/project/singlePro';
  //       paramters = { page: listPage++, cateId: 2 };
  //       break;
  //     case second_tab_name.OTHER:
  //       dataListUrl = '/project/singlePro';
  //       paramters = { page: listPage++, cateId: 3 };
  //   }
  //   $.ajax({
  //     url: dataListUrl,
  //     type: 'GET',
  //     data: paramters,
  //     dataType: 'json',
  //     beforeSend: function() { addMoreBtnChange.loading(title); },
  //     success: function(data) {
  //       console.log(data);
  //       var content = '';
  //       ifHasData(data.object) ? addMoreBtnChange.normal(title) : addMoreBtnChange.nomore(title);
  //       for (i in data.object) {
  //         var tempData = data.object[i],
  //           stars = '',
  //           j = k = 0,
  //           len = tempData.star; // imgs/paihang/tupianjiazai-@2x.png
  //         for (; j < len; j++) { stars += "<img class='paihang-star' src='imgs/paihang/star-1@2x.png'>"; }
  //         for (; k < (5 - len); k++) { stars += "<img class='paihang-star' src='imgs/paihang/star-2@2x.png'>"; }
  //         content += "<li class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'style='background:#202020;' onclick='support(" + tempData.dealId + ");'><div class='am-u-sm-4 am-u-md-2 am-list-thumb' style='margin-top:-.5rem;'><img src='http://www.d-du.com/images/grey.gif' data-original='" + tempData.image + "' class='am-img-responsive paihang-poster'/></div><div class='am-u-sm-8 am-u-md-10 am-list-main' style='padding-left:0rem;'><p class='paihang-title'>" + tempData.name + "</p><img class='paihang-jiantou' src='imgs/paihang/xiayiji@2x.png'><div class='paihang-content'><span class='am-sans-serif'>目标" + tempData.totalSupportCount + "</span><span class='am-sans-serif'>已筹" + tempData.successSupportCount + "</span><span class='am-sans-serif'>剩余" + tempData.restDays + "天</span></div>" + stars + "<a class='paihang-support am-sans-serif' href='javascript:void(0);'>立即支持</a></div></li>";
  //       }
  //       container.append(content);
  //       $(".paihang-poster").lazyload({ threshold: 200 });
  //     }
  //   })
  // }

  /**
   * 加载更多事件
   */

  award.find('.more').on('click', function() { queryAwardData(); })
    // 排行榜标签加载更多事件
    // paihang.find('.more').on('click', function() { queryDataList(addMoreBtnTitle, paihangList); })

  // 演出众筹标签加载更多事件
  // quanbu.find('.more').on('click', function() { queryDataList(addMoreBtnTitle, quanbuList); })

  // 推荐标签加载更多事件
  tuijian.find('.more').on('click', function() { queryRecommendData(); })

  // 星动众筹标签加载更多事件
  renqi.find('.more').on('click', function() { queryStarData(); })

  // 梦想众筹加载更多事件
  dream.find('.more').on('click', function() { queryDreamData() });

  // 搜索跳转
  $('.search').on('click', function() { location.href = 'search.html'; })

  /**
   * 用户登录控制
   */

  var rightNav = $('#right-nav'),
    rightNavLinks = rightNav.find('a'),
    rightLists = newRightLists(rightNavLinks),
    newLists = newAddLists(),
    imgurl = session.getItem('imgurl'),
    nickname = session.getItem('nickname'),
    ua = navigator.userAgent.toLowerCase(),
    flag = session.getItem('flag');

  // 判断用户登录状态 
  if (session.getItem('status') != 'online') { // 未登录用户 
    if (ua.match(/MicroMessenger/i) == "micromessenger" && (session.getItem('flag') == '' || !session.getItem('flag'))) { // 在微信中打开且微信未授权登陆
      location.href = "/user/WechatWebLogin?which=" + getQueryString('class'); // 跳到授权页去登陆
    } else {
      if (flag == 'success') { // 三方登录成功
        loginSucView(imgurl, decodeURI(nickname), rightLists, newLists);
        rightNavAction();
        weixinLoginView();
        // 将用户信息存入本地
        var userStr = JSON.stringify(new User(userId, decodeURI(nickname), null, null, imgurl, null));
        session.setItem('status', 'online');
        session.setItem('user', userStr);
      } else if (flag == "fail") {
        imgurl = nickname = rightLists = null;
        alert("登录失败！flag=" + flag);
      }
    }
  } else { // 已登录用户直接显示用户信息
    weixinLoginView();
    var userObj = JSON.parse(session.getItem('user'));
    imgurl = (flag == 'success') ? session.getItem('imgurl') : userObj.imgurl;
    loginSucView(imgurl, decodeURI(userObj.nickname), rightLists, newLists);
    rightNavAction();
  }
  // if (session.getItem('status') != 'online') { // 未登录用户 
  //   if (ua.match(/MicroMessenger/i) == "micromessenger" && (session.getItem('flag') == '' || !session.getItem('flag'))) { // 在微信中打开且微信未授权登陆
  //     location.href = '/user/WechatWebLogin'; // 跳到授权页去登陆
  //   } else {
  //     if (flag == 'success') { // 三方登录成功
  //       loginSucView(imgurl, decodeURI(nickname), rightLists, newLists);
  //       rightNavAction();
  //       weixinLoginView();
  //       // 将用户信息存入本地
  //       var userStr = JSON.stringify(new User(userId, decodeURI(nickname), null, null, imgurl, null));
  //       session.setItem('status', 'online');
  //       session.setItem('user', userStr);
  //     } else if (flag == "fail") {
  //       imgurl = nickname = rightLists = null;
  //       alert("登录失败！flag=" + flag);
  //     }
  //   }
  // } else { // 已登录用户直接显示用户信息
  //   weixinLoginView();
  //   var userObj = JSON.parse(session.getItem('user'));
  //   imgurl = (flag == 'success') ? session.getItem('imgurl') : userObj.imgurl;
  //   loginSucView(imgurl, decodeURI(userObj.nickname), rightLists, newLists);
  //   rightNavAction();
  // }

  // 微信登陆视图（去除退出入口）
  function weixinLoginView() {
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      rightNavLinks.last().hide();
    }
  }

  // 登录成功后的右边栏点击事件
  function rightNavAction() {
    // 委托给父节点ul
    rightNav.delegate('li', 'click', function() {
      var title = $.trim($(this).find('span').html());
      switch (title) {
        case right_list.UINFO:
          location.href = 'myInfo.html?from=index';
          break;
        case right_list.UWALLET:
          location.href = 'myWallet.html';
          break;
        case right_list.ULOVE:
          location.href = 'myLove.html';
          break;
        case right_list.UORDER:
          location.href = 'myOrder.html';
          break;
        case right_list.SHARE:
          location.href = 'share.html';
          break;
        case right_list.LOGOUT:
          session.clear();
          location.href = '/user/Logout';
          break;
      }
    });
  }

});

// $(window).resize(function() { initPage($('.tuijian')); });

$(window).load(function() {
  var curCity = $('#location');
  if (session.hasChangeCity != 'true') {
    setTimeout(function() {
      if (session.getLocation == 'success') {
        curCity.html(session.getItem('curCity'));
      } else {
        // alert('定位失败，请手动选择～');  
      }
    }, 1000);
  } else {
    curCity.html(session.getItem('newCity'));
  }
});

// 循环监测图片是否加载完成
function checkImgComplete(img, Fuc) {
  var timer = setInterval(function() {
    if (img.complete) {
      if (img.src != 'http://www.d-du.com/images/grey.gif') {
        Fuc();
        clearInterval(timer);
      }
    }
  }, 100);
}

// 模态窗口提示
function showTip(str) {
  $('#tipCont').html(str);
  $('#sendTip').modal();
}

function checkLogin(ele, userId) {
  if (!userId) {
    showTip(modal_tip.NOTLOGIN);
    ele.attr('href', 'javascript:void(0)');
  }
}

/**
 * 初始化页面
 * @param  {Element} tuijian 所有的推荐页数据
 */
function initPage(tuijian) {
  // 初始化推荐页
  tuijian.each(function() {
    var curPoster = $(this).find('.vidPoster'),
      curPlay = curPoster.next();
    curPlay.css('top', (curPoster.height() - curPlay.height()) / 2); // 播放按钮初始化
    $(this).find('img').last().css('bottom', $(this).find('.imgPoster').height() / 2); // 支持部分初始化
  })
}

/**
 * 判断是否还有后台数据
 * @param  {Object} data 后台拿到的数据
 * @return {boolean} 是否还有数据
 */
function ifHasData(data) {
  return (!data || (data && data.length == 0)) ? false : true;
}

/**
 * 切换标签的颜色
 * @param {Elements} tabTits 所有标签
 * @param {Element} activeTab 需要激活显示的标签
 */
function changeTabColor(tabTits, activeTab) {
  tabTits.css({ 'color': '#fff', 'borderRadius': 'none', 'background': '#202020' });
  activeTab.css({ 'color': '#1dbcd2', 'borderRadius': '2rem', 'background': '#000' });
}

// 点击数据列表跳转事件 
function support(dealId) {
  var location = window.location;
  zhuge.track('查看项目详情',{
    '项目id':dealId
  },function(){
    location.href = 'item.html?from=i&dealId=' + dealId;
  });
}

/**
 * 登录成功视图，登陆成功后改变右侧列表项并显示用户信息。  
 *（注：此处未重构右侧DOM结构，只是将原有的四个节点更换成新节点，剩下的新节点直接追加在后面）  
 * @param {String} imgurl 用户头像地址
 * @param {String} nickname 用户昵称       
 * @param {Elements} newRightLists 代替原列表节点的新节点集  
 * @param {Elements} newLists 新增的列表节点集       
 */
function loginSucView(imgurl, nickname, newRightLists, newAddLists) {
  var userHeader = $(".user-header"),
    userTitle = $(".user-title");
  // 头像、昵称                
  userHeader.attr('src', imgurl);
  userTitle.html(nickname);
  // 替换旧列表项 
  for (list in newRightLists) {
    var temp = newRightLists[list].ele;
    temp.children('img').attr('src', newRightLists[list].iconSrc);
    temp.children('span').html(newRightLists[list].listName);
    temp.attr('href', 'javascript:void(0)');
  }
  // 追加新列表项
  for (list in newAddLists) {
    var temp = newAddLists[list];
    $('.right-nav li').last().before(
      '<li><a href="javascript:void(0);">' +
      '<img src="' + temp.iconSrc + '">' +
      '<span>' + temp.listName + '</span>' +
      '</a></li>'
    );
  }
}

/** 
 * 替代原右侧列表节点的新节点集 
 * @param {Elements} rightNavLinks 原右侧列表节点  
 * @return {Elements} 代替原列表节点的新节点集                  
 */
function newRightLists(rightNavLinks) {
  var rightLists = new Array(),
    myInfo = {
      ele: rightNavLinks.eq(0),
      iconSrc: 'imgs/index/gerenziliao-@2x.png',
      listName: right_list.UINFO
    },
    myWallet = {
      ele: rightNavLinks.eq(1),
      iconSrc: 'imgs/index/wodeqianbao-@2x.png',
      listName: right_list.UWALLET
    },
    myLove = {
      ele: rightNavLinks.eq(2),
      iconSrc: 'imgs/index/wodeshoucang-@2x.png',
      listName: right_list.ULOVE
    },
    logout = {
      ele: rightNavLinks.eq(3),
      iconSrc: 'imgs/index/tuichudenglu-@2x.png',
      listName: ' ' + right_list.LOGOUT
    }
  rightLists.push(myInfo, myWallet, myLove, logout);
  return rightLists;
}

/**
 * 新增的节点集      
 * @return 新增的节点集  
 */
function newAddLists() {
  var newLists = new Array(),
    myOrder = {
      iconSrc: 'imgs/index/wodedingdan@2x.png',
      listName: ' ' + right_list.UORDER
    },
    share = {
      iconSrc: 'imgs/index/fenxiangyouli-@2x.png',
      listName: ' ' + right_list.SHARE
    }
  newLists.push(myOrder);
  return newLists;
}
