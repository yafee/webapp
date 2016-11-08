var moreBtn_content = {
    NORMAL: '点击查看更多 &raquo;',
    LOADING: '加载中...',
    NOMORE: '没有更多'
  },
  second_tab_name = {
    ALL: '全部',
    VARIETY: '演唱会',
    CONCERT: '话剧',
    OTHER: '其他'
  };
var flag = session.getItem('flag'),
  which = getQueryString('class');
if (flag != 'success') { // 在微信中打开且微信未授权登陆 
  location.href = '/user/WechatWebLogin?which=' + which;
}
$(function() {
  var quanbu = $('#quanbu'),
    kind = $('.kind'),
    quanbuList = quanbu.find('.paihang').find('ul'),
    listPage = 1, // 数据分页
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
  // getLocation(); // 定位城市
  // （9.12）
  // 演出
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
        var content = '';
        if (data.object.length > 0) {
          for (i in data.object) {
            var tempData = data.object[i];
            content += "<li class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'style='background:#202020;' onclick='support(" + tempData.dealId + ");'><div class='am-u-sm-4 am-u-md-2 am-list-thumb' style='margin-top:-.5rem;'><img src='http://www.d-du.com/images/grey.gif' data-original='" + tempData.image + "' class='am-img-responsive paihang-poster'/></div><div class='am-u-sm-8 am-u-md-10 am-list-main'><span class='paihang-title'>" + tempData.name + "</span><div class='price'><span>¥&nbsp;" + tempData.price + "</span>&nbsp;起</div><div class='time'>时间:" + tempData.startTime + "</div><div class='address'>地址:" + tempData.address + "</div></div></li>";
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
    });
  }

  // 轮播图
  $.get('project/CarouselFigure', function(data) {
    if (data.state == 'success') {
      var content = '';
      for (var i in data.object) {
        content += '<li><img src="' + data.object[i] + '"></li>';
      }
      $('.quanbu .am-slides').html(content);
      $('.quanbu .am-slider').flexslider().css('opacity', 1);
    } else {
      alert(data.msg);
    }
  });
});

// 点击数据列表跳转事件 
function support(dealId) {
  var location = window.location;
  zhuge.track('查看项目详情', {
    '项目id': dealId
  }, function() {
    location.href = 'item.html?from=i&dealId=' + dealId;
  });
}
