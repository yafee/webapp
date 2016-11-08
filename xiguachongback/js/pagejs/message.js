// /**
//  * Created by vaio on 2015/10/22.
//  */
// /**
//  * Created by vaio on 2015/10/22.
//  */
// var dataSet=[
//     /* Reduced data set */
//     [ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X" ,"DF","GH","JK"],
//     [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C"  ,"DF","GH","JK"],
//     [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C"  ,"DF","GH","JK"],
//     [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C"  ,"DF","GH","JK"],
//     [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C"  ,"DF","GH","JK"],
//     [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C"  ,"DF","GH","JK"],
//     [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A"  ,"DF","GH","JK"],
//     [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A"  ,"DF","GH","JK"],
//     [ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A"  ,"DF","GH","JK"],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ],
//     [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,"DF","GH","JK" ]
// ];
// $(document).ready(function(){
//     $('#messageTable').DataTable({

//         "data":dataSet ,
//         "columns":[{
//             //data:'id',
//             title:'ID'
//         },{
//             //data:'createTime',
//             title:'创建时间'
//         },{
//             //data:'message',
//             title:'消息内容'
//         },{
//             //data:'userId',
//             title:'用户ID'
//         },{
//             //data:'destUserId',
//             title:'指定人ID'
//         },{
//             //data:'sendUserId',
//             title:'发送者ID'
//         },{
//             //data:'receiveUserId',
//             title:'接收者ID'
//         },{
//             //data:'userName',
//             title:'用户名'
//         },{
//             //data:'destUserName',
//             title:'指定人名'
//         },{
//             //data:'sendUserName',
//             title:'发送人名'
//         },{
//             //data:'receiveUserName',
//             title:'接收人名'
//         },{
//             //data:'messageType',
//             title:'消息状态'
//         },{
//             //data:'isRead',
//             title:'是否已读'
//         }],
//         "pagingType":'full_numbers',

//         "stateSave":true//状态保存，使用了翻页或者改变了每页显示数据数量，会保存在cookie中，下回访问时会显示上一次关闭页面时的内容。
//     });
// });





$(function() {
  var totalPage; // 总页数
  var page = 1; // 当前页
  var pageSize = 15; // 每页显示数据量
  var showPage = 7; // 显示的页码数量
  var pageOffset = (showPage - 1) / 2; // 偏移量

  // /AppMsg/query/ limit page   id title message createTime

  // 加载页面时初始化页码
  $.get('/AppMsg/query/', {
    limit: pageSize,
    page: page
  }, function(data) {
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
  // init datatable
  new DataTable(
    $('.dataTable'), ['消息ID', '消息标题', '消息内容', '创建时间','关联项目Id', '是否发送'],
    '/AppMsg/query',
    'GET', {
      limit: 15,
      page: 1
    },
    'returnData', ['id', 'title', 'message', 'createTime', 'dealId','isSend'],
    '/AppMsg/deleteMessage',
    'id',
    '/AppMsg/UpdateMessage',
    '/add'
  );
  setTimeout(function() { deleteAction(); }, 100);

  $('#start').on('click', function() {
    if (!$('#start').hasClass('am-disabled')) {
      pageBtnOn.end();
      pageBtnOff.start();
      page = 1;
      queryUserInfo(page);
      renderPage(page);
      $('#page').html(page);
    }
  })

  $('#end').on('click', function() {
    if (!$('#end').hasClass('am-disabled')) {
      pageBtnOn.start();
      pageBtnOff.end();
      page = totalPage;
      queryUserInfo(page);
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
        queryUserInfo(page);
        renderPage(page);
        $('#page').html(page);
      } else {
        alert('页码超出范围了！');
      }
    }
  });

  // $('#find').on('click', function() {
  //   var selection = $.trim($('#selection').val());
  //   var keyWords = $.trim($('#keyWords').val());
  //   if (selection == '用户名') {
  //     queryUserInfo(keyWords, null, 1);
  //   } else if (selection == '手机号') {
  //     queryUserInfo(null, keyWords, 1);
  //   }
  //   // 用户数据只有一条，所以写死只有一页
  //   var pages = '';
  //   $('.page').remove();
  //   for (var i = 1; i < 2; i++) {
  //     pages += '<li class="page"><a href="javascript:void(0);">' + i + '</a></li>';
  //   }
  //   $('#start').after(pages);
  //   pageBtnOff.all();
  // })

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
        queryUserInfo(page);
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

  function queryUserInfo(pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['消息ID', '消息标题', '消息内容', '创建时间', '关联项目Id','是否发送'],
      '/AppMsg/query',
      'GET', {
        limit: pageSize,
        page: pageIndex
      },
      'returnData', ['id', 'title', 'message', 'createTime','dealId', 'isSend'],
      '/AppMsg/deleteMessage',
      'id',
      '/AppMsg/UpdateMessage',
      '/add'
    );
    setTimeout(function() { deleteAction(); }, 100);
  }

  $('#doit').click(function(event) {
    if ($.trim($('#title').val()) == '') {
      alert('消息标题不能为空！');
      return false;
    } else if ($.trim($('#message').val()) == '') {
      alert('消息内容不能为空！');
      return false;
    } else if($.trim($('#dealId').val()) == ''){
       alert('关联项目Id不能为空')
    } else {
      $.post('/AppMsg/AddMessage', {title: $.trim($('#title').val()), message: $.trim($('#message').val()),dealId: $.trim($('#dealId').val())}, function(data) {
        alert(data.returnData);
        location.href = '/xiguachongback/message.html';
      })
    }
  });

})

// 删除操作栏
function deleteAction() {
  var checkTableInit = setInterval(function() {
    if ($('.dataTable tr').length != 0) {
      $.each($('.dataTable tr'), function(index, object) {
        $(this).children('td').last().find('button').last().after('<button onclick="sendMsg($(this));">推送</button>');
      })
      clearInterval(checkTableInit);
    }
  }, 50);
  $('#search').remove();
  $('#searchBtn').remove();
}

function sendMsg(ele) {
  $.ajax({
    url: '/Push/pushMessage',
    type: 'POST',
    data: { id: parseInt(ele.parent().parent().children('td').first().text()) },
    success: function(data) {
      alert(data.returnData);
    }
  })
}

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

