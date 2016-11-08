var pageBtnOff = {
  start: function() {
    $('#start').addClass('am-disabled');
  },
  end: function() {
    $('#end').addClass('am-disabled');
  },
  all: function() {
    $('#start').addClass('am-disabled');
    $('#end').addClass('am-disabled');
  }
}

var pageBtnOn = {
  start: function() {
    $('#start').removeClass('am-disabled');
  },
  end: function() {
    $('#end').removeClass('am-disabled');
  },
  all: function() {
    $('#start').removeClass('am-disabled');
    $('#end').removeClass('am-disabled');
  }
}

$(function() {
  var totalPage; // 总页数
  var page = 1; // 当前页
  var pageSize = 15; // 每页显示数据量
  var showPage = 7; // 显示的页码数量
  var pageOffset = (showPage - 1) / 2; // 偏移量

  // 加载页面时初始化页码
  $.get('/Deal/query', {
      dealName: null,
      limit: pageSize,
      page: page
    }, function(data) {
      console.log(data)
      totalPage = data.totalNumber % pageSize != 0 ?
        Math.floor(data.totalNumber / pageSize) + 1 :
        data.totalNumber / pageSize;
      var pages = '',
        i = 1,
        len = totalPage > showPage ? showPage : totalPage;
      for (; i <= len; i++) {
        pages += '<li class="page"><a href="javascript:void(0);">' + i + '</a></li>';
      }
      $('#start').after(pages);
      $('.page').first().addClass('am-active');
      $('#total').html(totalPage);
      $('#page').html(page);
      $('#totalNumber').html(data.totalNumber);
      totalPage > 1 ? pageBtnOff.start() : pageBtnOff.all(); // 初始化时，首尾页按钮默认状态
      pageAction(); // 绑定点击页码处理事件
    })
    queryUserInfo(null, 1);

  $('#start').on('click', function() {
    if (!$('#start').hasClass('am-disabled')) {
      pageBtnOn.end();
      pageBtnOff.start();
      page = 1;
      queryUserInfo(null, page);
      renderPage(page);
      $('#page').html(page);
    }
  })

  $('#end').on('click', function() {
    if (!$('#end').hasClass('am-disabled')) {
      pageBtnOn.start();
      pageBtnOff.end();
      page = totalPage;
      queryUserInfo(null, page);
      renderPage(page);
      $('#page').html(page);
    }
  })

  $('#jumpBtn').on('click', function(event) {
    var targetPage = $('#targetPage').val();
    if (targetPage.match(/\d/)) {
      targetPage = parseInt(targetPage);
      if (targetPage <= totalPage && targetPage >= 1) {
        if (targetPage == totalPage) {
          pageBtnOn.start();
          pageBtnOff.end();
        } else if (targetPage == 1) {
          pageBtnOn.end();
          pageBtnOff.start();
        } else {
          pageBtnOn.start();
          pageBtnOn.end();
        }
        page = targetPage;
        queryUserInfo(null, page);
        renderPage(page);
        $('#page').html(page);
      } else {
        alert('页码超出范围了！');
      }
    }
  });

  $('#find').on('click', function() {
    var selection = $.trim($('#selection').val());
    var keyWords = $.trim($('#keyWords').val());
    queryUserInfo(keyWords, 1);
    // 用户数据只有一条，所以写死只有一页
    var pages = '';
    $('.page').remove();
    for (var i = 1; i < 2; i++) {
      pages += '<li class="page"><a href="javascript:void(0);">' + i + '</a></li>';
    }
    $('#start').after(pages);
    pageBtnOff.all();
  })

  // 点击页码处理事件
  function pageAction() {
    $.each($('.page'), function(index, object) {
      $(this).on('click', function() {
        var activePage = parseInt($(this).text());
        if (activePage > 1 && activePage < totalPage) {
          pageBtnOn.start();
          pageBtnOn.end();
        } else if (activePage == totalPage) { // 尾页     
          pageBtnOn.start();
          pageBtnOff.end();
        } else { // 首页
          pageBtnOn.end();
          pageBtnOff.start();
        }
        page = activePage;
        queryUserInfo(null, page);
        renderPage(page);
        $('#page').html(page);
      })
    })
  }

  function renderPage(page) {
    var pages = '',
      start, end;
    if (page > pageOffset + 1) {
      if (page + pageOffset < totalPage) {
        start = page - pageOffset;
        end = page + pageOffset;
      } else {
        start = totalPage - showPage + 1;
        end = totalPage;
      }
    } else {
      start = 1;
      if (totalPage > showPage) {
        end = showPage;
      } else {
        end = totalPage;
      }
    }
    // 初始化页码
    $('.page').remove();
    var i = start,
      len = end;
    for (; i <= len; i++) {
      pages += '<li class="page"><a href="javascript:void(0);">' + i + '</a></li>';
    }
    $('#start').after(pages);
    if (page > pageOffset + 1) {
      if (page > totalPage - pageOffset) {
        $('.page').eq(pageOffset + page - (totalPage - pageOffset)).addClass('am-active');
      } else {
        $('.page').eq(pageOffset).addClass('am-active')
      }
    } else {
      $('.page').eq(page - 1).addClass('am-active');
    }
    pageAction();
  }

  function queryUserInfo(dealName, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['项目ID', '演出名称', '类别', '演出时间', '城市', '演出场馆'],
      '/Deal/query',
      'GET', {
        dealName: dealName,
        limit: pageSize,
        page: pageIndex
      },
      'returnData', ['dealId', 'dealName', 'cateId', 'startTime', 'city', 'address'],
      '/Deal/deleteDeal',
      'dealId',
      '/Deal/update',
      '/add',
        function(){
      deleteAction();
    });
  }

  $('#doit').click(function(event) {
    if ($.trim($('#cateId').val()) == '') {
      alert('项目类型不能为空！');
      return false;
    } else if ($.trim($('#beginTime').val()) == '') {
      alert('项目开始时间不能为空！');
      return false;
    } else if ($.trim($('#endTime').val()) == '') {
      alert('项目结束时间不能为空！');
      return false;
    } else if ($.trim($('#dealName').val()) == '') {
      alert('演出名称不能为空！');
      return false;
    } else if ($.trim($('#startTime').val()) == '') {
      alert('演出开始时间不能为空！');
      return false;
    } else if ($.trim($('#star').val()) == '') {
      alert('项目星级不能为空！');
      return false;
    } else if ($.trim($('#address').val()) == '') {
      alert('项目地址不能为空！');
      return false;
    } else if ($.trim($('#city').val()) == '') {
      alert('项目所在城市不能为空！');
      return false;
    } else if ($.trim($('#successSupportCount').val()) == '') {
      alert('已支持数不能为空！');
      return false;
    } else if ($.trim($('#totalSupportCount').val()) == '') {
      alert('目标支持数不能为空！');
      return false;
    } else if ($.trim($('#dealBanner').val()) == '') {
      alert('项目横图不能为空！');
      return false;
    } else if ($.trim($('#descriptionImage').val()) == '') {
      alert('项目竖图不能为空！');
      return false;
    } else if ($.trim($('#image').val()) == '') {
      alert('视频封面图不能为空！');
      return false;
    } else if ($.trim($('#vsrc').val()) == '') {
      alert('视频地址不能为空！');
      return false;
    } else if ($.trim($('#vedioImage').val()) == '') {
      alert('项目图片不能为空！');
      return false;
    } else if ($.trim($('#vedioWebSource').val()) == '') {
      alert('视频源地址不能为空！');
      return false;
    } else {
      $.post('/Deal/addDeal', {
        cateId: $.trim($('#cateId').val()),
        beginTime: $.trim($('#beginTime').val()),
        endTime: $.trim($('#endTime').val()),
        dealName: $.trim($('#dealName').val()),
        startTime: $.trim($('#startTime').val()),
        star: $.trim($('#star').val()),
        address: $.trim($('#address').val()),
        city: $.trim($('#city').val()),
        isRecommend: $('#isRecommend').val() == 'yes' ? true : false,
        successSupportCount: $.trim($('#successSupportCount').val()),
        totalSupportCount: $.trim($('#totalSupportCount').val()),
        tags: $.trim($('#tags').val()),
        dealBanner: $.trim($('#dealBanner').val()),
        descriptionImage: $.trim($('#descriptionImage').val()),
        image: $.trim($('#image').val()),
        vsrc: $.trim($('#vsrc').val()),
        vedioImage: $.trim($('#vedioImage').val()),
        vedioWebSource: $.trim($('#vedioWebSource').val())
      }, function(data) {
        alert(data.returnData);
        location.href = '/xiguachongback/deal.html';
      })
    }
  });
})

// 删除操作栏
function deleteAction() {
  var checkTableInit = (function() {
    if ($('.dataTable tr').length != 0) {
      $.each($('.dataTable tr'), function(index, object) {
        $(this).children('td').last().remove();
      })
      clearInterval(checkTableInit);
    }
  })();
  $('#search').remove();
  $('#searchBtn').remove();

  //新增详情
  var table = $('div.dataTable table');
  $('div.dataTable table thead tr').append("<td>详情</td>");
  $('div.dataTable table tbody tr').each(function(index, trElement){
    $(trElement).append('<td><button role="dealDetail">查看</button><button role="ticket">票务</button></td>')
  })

  $('div.dataTable table tbody tr button[role="dealDetail"]').on('click', function(){
    var tdElement = $(this).parent().parent().children(':first');
    window.location.href = 'deal_detail.html?dealId='+tdElement.text();
  })

  $('div.dataTable table tbody tr button[role="ticket"]').on('click', function(){
    var tdElement = $(this).parent().parent().children(':first');
    window.location.href = 'deal_ticket.html?dealId='+tdElement.text();
  })
}