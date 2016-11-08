// /**
//  * Created by sjh on 15/12/22.
//  */
// //订单价格表 new
// var tag=null;
// var rowcontent=null;
// $(document).ready(function () {
//     $("#Edit").click(_value);
//     oTable = initTable();

// });
// function initTable() {
//     var table = $('#priceTable').DataTable({
//         ajax: {
//             url: "js/json/price.txt"
//         },
//         columnDefs: [{
//             targets: 0,
//             orderable: false
//         }, {
//             targets: 1,
//             visible: false,
//             searchable: false
//         }],
//         "columns": [{
//             title: "<input type='checkbox' id='checkAll'/>",
//             data: null,
//             "createdCell": function (nTd, sData) {
//                 $(nTd).html("<input type='checkbox' name='checkList' value='" + sData + "'>");
//             }
//         }, {
//             data: 'priceId',
//             title: 'ID'
//         }, {
//             data: 'dealId',
//             title: '项目ID'

//         }, {
//             data: 'dealPrice',
//             title: '票价'
//         }, {
//             data: 'limitNumber',
//             title: '每人限购张数'
//         }, {
//             data: 'dealGift',
//             title: 'dealGift',
//             "render": function (data, type) {     //字数超过20,只显示20字
//                 return type === 'display' && data.length > 21 ?
//                 '<span title="' + data + '">' + data.substr(0, 20) + '...</span>' :
//                     data;
//             }
//         }, {
//             data: 'dealGiftImage',
//             title: 'dealGiftImage',
//             render: function (data) { //显示小图片
//                 return '<img src="' + data + '" alt="false" height="50" width="50">'
//             }
//         }, {
//             data: 'supportNumber',
//             title: '支持数量'
//         }, {
//             data: 'totalNumber',
//             title: '演出票总张数'
//         }],

//         "pagingType": 'full_numbers'
//     });

//     $('#priceTable tbody').on('click', 'tr', function () {
//         var rowdata = table.row(this).data();
//         rowcontent=JSON.stringify(rowdata);
//     });
// };

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
//         $('#changepanel').html("项目票价编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $('#id').val(jsonobject.id);
//         $('#deal_id').val(jsonobject.dealId);
//         $('#deal_price').val(jsonobject.dealPrice);
//         $('#limit_number').val(jsonobject.limitNumber);
//         $('#deal_gift').val(jsonobject.dealGift);
//         $('#deal_gift_image').val(jsonobject.dealGiftImage);
//         $('#support_number').val(jsonobject.supportNumber);
//         $('#total_number').val(jsonobject.totalNumber);

//     }
// }

// //添加和修改
// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#priceform').serializeArray();
//     $.each(jsonObject, function () {
//         if (jsonobj1[this.name]) {
//             if (!jsonobj1.push) {
//                 jsonobj1[this.name] = [jsonobj1[this.name]];
//             }
//             jsonobj1[this.name].push(this.value || '');
//         } else {
//             jsonobj1[this.name] = this.value || '';
//         }
//     });
//     if (tag == "add") {
//         $.ajax({
//             async: false,
//             type: "post",
//             dataType: 'json',
//             data: jsonobj1,
//             url: "",
//             success: function (data) {
//                 //oTable.reload();
//                 window.location.reload();
//             },
//             error: function (json) {
//                 alert("插入失败");
//                 $('#showpanel').css('display', 'none');
//                 $('#addpanel').css('display', 'block');
//             }
//         });
//     } else {
//         alert(jsonobject.id);
//         $.ajax({
//             async: false,
//             type: "patch",
//             dataType: 'json',
//             data: jsonobj1,
//             url:"" + jsonobject.id + "/",
//             success: function (data) {
//                 window.location.reload();
//             },
//             error: function (json) {
//                 alert("修改失败");
//                 $('#showpanel').css('display', 'none');
//                 $('#addpanel').css('display', 'block');
//             }
//         });
//     }
// });

// //删除
// $('#Delete').click(function () {
//     checkboxFun();
//     if (n == 0) {
//         alert("请选择一条记录操作         ");
//     }
//     else if (n >= 1) {
//         if (confirm("您选了：" + n + " 行进行操作")) {
//             if (confirm("是否删除选中的信息？")) {
//                 $.ajax({
//                     type: "delete",
//                     url: baseAddress + '/tbuser/' + id + "/",
//                     success: function (json) {
//                         window.location.reload();
//                     },
//                     error: function () {
//                         alert("删除失败");
//                     }
//                 });
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

  // /praise/query   userName dealName

  // 加载页面时初始化页码
  $.get('/Praise/query', {
    userName: null,
    dealName: null,
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
    $('.dataTable'), ['项目名称', '用户昵称'],
    '/Praise/query',
    'GET', {
      userName: null,
      dealName: null,
      limit: 15,
      page: 1
    },
    'returnData', ['dealName', 'userName'],
    '/delete',
    '/update',
    '/add'
  );
  setTimeout(function() {
    deleteAction();
  }, 400);

  $('#start').on('click', function() {
    if (!$('#start').hasClass('am-disabled')) {
      pageBtnOn.end();
      pageBtnOff.start();
      page = 1;
      queryUserInfo(null, null, page);
      renderPage(page);
      $('#page').html(page);
    }
  })

  $('#end').on('click', function() {
    if (!$('#end').hasClass('am-disabled')) {
      pageBtnOn.start();
      pageBtnOff.end();
      page = totalPage;
      queryUserInfo(null, null, page);
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
        queryUserInfo(null, null, page);
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
    if (selection == '项目名称') {
      queryUserInfo(keyWords, null, 1);
    } else if (selection == '用户昵称') {
      queryUserInfo(null, keyWords, 1);
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
        queryUserInfo(null, null, page);  
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

  function queryUserInfo(dealName, userName, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['项目名称', '用户昵称'],
      '/Praise/query', 
      'GET', {
        dealName: dealName,
        userName: userName,
        limit: pageSize,
        page: pageIndex    
      },
      'returnData', ['dealName', 'userName'],
      '/delete',
      '/update',  
      '/add'
    );
    setTimeout(function() {
      deleteAction();
    }, 400);
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








