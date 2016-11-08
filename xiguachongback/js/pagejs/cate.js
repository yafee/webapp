// var tag=null;
// var rowcontent=null;

// $(document).ready(function () {
//     $("#Edit").click(_value);
//     oTable = initTable();
// });
// function initTable() {
//     $('#cateTable').DataTable({
//         ordering: false,
//         scrollY:450,
//         //serverSide: true,

//         ajax: {
//             url: "js/json/cate.txt",
//             dataSrc: ""
//         },
//         columnDefs: [{
//             targets: 0,
//             width:"10%",
//             orderable: null
//         }, {
//             targets: 1,
//             visible: false
//         }, {
//             targets: 2,
//             width:"60%"
//         }, {
//             targets: 3,
//             width:"40%"
//         }],
//         columns: [{
//             data: null,
//             "createdCell": function (nTd, data) {
//                 $(nTd).html("<input type='checkbox' name='checkList' value='" + data + "'>");
//             }
//         },
//             {data: "id"},
//             {data: "name"},
//             {data: "sort"}
//         ],
//         //dom: 'Bfrt<"bottom"fip>',
//         dom: '<"top"Bf>rt<"bottom"<"am-u-sm-3" l><"am-u-sm-3" i><"am-u-sm-6" p>><"clear">',
//         buttons: [{
//             extend: 'copy',
//             text: "复制"
//         }, {
//             extend: 'print',
//             text: "打印"
//         }, {
//             extend: 'pdf',
//             text: "PDF"
//         }, {
//             extend: 'excel',
//             text: "EXCEL"
//         }]
//     });

// }

// //编辑赋值
// function _value() {
//     checkboxFun();
//     if (n == 0) {
//         alert("请选择一条记录操作         ");
//     }
//     else if (n > 1) {
//         alert("您只能选择一行编辑" + "   您选了：" + n + "行");
//         $("[name=checkList]:checkbox").prop("checked", false);
//         $("#checkAll").prop("checked", false);
//     } else {
//         $('#changepanel').html("项目类别编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var tr = checks[x].parentNode.parentNode;
//         var selected = tr.cells;
//         $("#ID").val(selected[0].innerHTML);
//         $("#name").val(selected[1].innerHTML);
//         $("#sort").val(selected[2].innerHTML);
//     }
// }

// //删除
// $('#Delete').click(function () {
//     checkboxFun();
//     if (n == 0) {
//         alert("请选择一条记录操作         ");
//     }
//     else if (n >= 1) {
//         if (confirm("您选了：" + n + " 行进行操作")) {
//             if (confirm("是否删除选中的信息？")) {
//                 //$.ajax({
//                 //    type: "delete",
//                 //    url: baseAddress + '/tbuser/' + id + "/",
//                 //    success: function (json) {
//                 //        window.location.reload();
//                 //    },
//                 //    error: function () {
//                 //        alert("删除失败");
//                 //    }
//                 //});
//                 window.location.reload();
//             }
//         } else {
//             initTable();
//         }

//     }
// });






$(function() {
  var totalPage;     // 总页数
  var page = 1;     // 当前页
  var pageSize = 15;     // 每页显示数据量
  var showPage = 7;     // 显示的页码数量
  var pageOffset = (showPage - 1) / 2;     // 偏移量

  // /DealCate/query?name=&limit=5&page=1

  // 加载页面时初始化页码
  $.get('/DealCate/query', {
    name: null,
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
    $('.dataTable'), ['项目类型', '类型名称', '排序'],
    '/DealCate/query',
    'GET', {
      name: null,
      limit: 15,
      page: 1
    },
    'returnData', ['cateId', 'name', 'sort'],
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

  function queryUserInfo(name, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['项目类型', '类型名称', '排序'],
      '/DealCate/query', 
      'GET', {
        name: name,
        limit: pageSize,
        page: pageIndex    
      },
      'returnData', ['cateId', 'name', 'sort'],
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





