// /**
//  * Created by vaio on 2015/10/22.
//  */
// $(document).ready(function(){
//     $('#suppport_logTable').DataTable({
//         ajax:"",
//         columnDefs: [ {
//             targets: 0,
//             orderable: null
//         },{
//             targets: 1,
//             visible: false
//         }],

//         "columns":[{
//             title:"<input type='checkbox' id='checkAll'/>",
//             data: null,
//             "createdCell": function(nTd,sData,oData,iRow,iCol){
//                 $(nTd).html("<input type='checkbox' name='checkList' value='"+sData+"'>")  ;
//             }
//         },{
//             data:'ID',
//             title:'ID'
//         },{
//             data:'dealId',
//             title:'项目ID'
//         },{
//             data:'userId',
//             title:'用户ID'
//         },{
//             data:'createTime',
//             title:'创建时间'
//         },{
//             data:'price',
//             title:'价格'
//         },{
//             data:'dealItemId',
//             title:'项目图片ID'
//         }]
//     });
// });




$(function() {
  var totalPage;     // 总页数
  var page = 1;     // 当前页
  var pageSize = 15;     // 每页显示数据量
  var showPage = 7;     // 显示的页码数量
  var pageOffset = (showPage - 1) / 2;     // 偏移量

  // 加载页面时初始化页码
  $.get('/UserPointsDetail/query', {
    userName: null,
    limit: pageSize,
    page: page 
  }, function(data) {
    console.log(data)
    totalPage = data.totalNumber % pageSize != 0 ? 
    Math.floor(data.totalNumber / pageSize) + 1 : 
    data.totalNumber / pageSize;
    var pages = '', i = 1, len = totalPage > showPage ? showPage : totalPage;
    for ( ; i <= len; i++) {
      pages += '<li class="page"><a href="javascript:void(0);">' + i + '</a></li>';
    }
    $('#start').after(pages);
    $('.page').first().addClass('am-active');
    $('#total').html(totalPage);    
    $('#page').html(page);
    $('#totalNumber').html(data.totalNumber);
    totalPage > 1 ? pageBtnOff.start() : pageBtnOff.all();     // 初始化时，首尾页按钮默认状态
    pageAction();     // 绑定点击页码处理事件
  })
  // init datatable
  new DataTable(
    $('.dataTable'), ['用户昵称', '时间', '积分数', '积分来源'],
    '/UserPointsDetail/query',
    'GET', {
      userName: null,
      limit: 15,
      page: 1
    },
    'returnData', ['userName', 'createTime', 'points', 'pointsSource'],
    '/delete',
    '/update',
    '/add'
  );
  setTimeout(function() {
    deleteAction();
  }, 100);

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
    if (selection == '用户昵称') {
      queryUserInfo(keyWords, 1);
    }
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
        } else if (activePage == totalPage) {     // 尾页     
          pageBtnOn.start();  
          pageBtnOff.end();
        } else {     // 首页
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
    var pages = '', start, end;
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
      len =  end;
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

  function queryUserInfo(userName, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['用户昵称', '时间', '积分数', '积分来源'],
      '/UserPointsDetail/query', 
      'GET', {
        userName: userName,
        limit: pageSize,
        page: pageIndex    
      },
      'returnData', ['userName', 'createTime', 'points', 'pointsSource'],
      '/delete',
      '/update',  
      '/add'
    );
    setTimeout(function() {
      deleteAction();
    }, 100);
  }
})

// 删除操作栏
function deleteAction() {
  var checkTableInit = setInterval(function() {
    if ($('.dataTable tr').length != 0) {
      $.each($('.dataTable tr'), function(index, object) {
        $(this).children('td').last().remove();
      }) 
      clearInterval(checkTableInit);
    }
  }, 50);     
  $('#search').remove();
  $('#searchBtn').remove();
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




