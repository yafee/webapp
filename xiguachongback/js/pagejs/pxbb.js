// /**
//  * Created by sjh on 15/12/24.
//  */

// //潘西播报 new
// var tag = null;
// var rowcontent = null;
// $(document).ready(function () {
//     $("#Edit").click(_value);
//     oTable = initTable();
// });
// function initTable() {
//     var table = $('#pxbbTable').DataTable({
//         ajax: {
//             url: "js/json/pxbb.txt"
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
//             data: 'pxbbId',
//             title: 'ID'
//         }, {
//             data: 'commentCount',
//             title: '评论数量'
//         }, {
//             data: 'detailImage',
//             title: '详细图片',
//             render: function (data) {
//                 return '<img src="' + data + '" alt="false" height="50" width="50">'
//             }
//         }, {
//             data: 'headImage',
//             title: '头像',
//             render: function (data) {
//                 return '<img src="' + data + '" alt="false" height="50" width="50">'
//             }
//         }, {
//             data: 'name',
//             title: '姓名(艺名?)'
//         }, {
//             data: 'supportCount',
//             title: '支持数量'
//         }, {
//             data: 'vedioFace',
//             title: '视频封面'
//         }, {
//             data: 'vedioSource',
//             title: '视频资源'
//         }, {
//             data: 'vedioWebSource',
//             title: '视频网络资源'
//         }],

//         "pagingType": 'full_numbers'
//     });

//     $('#pxbbTable tbody').on('click', 'tr', function () {
//         var rowdata = table.row(this).data();
//         rowcontent = JSON.stringify(rowdata);

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
//         $('#changepanel').html("潘西播报编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $('#pxbb_id').val(jsonobject.pxbbId);
//         $('#comment_count').val(jsonobject.commentCount);
//         $('#detail_image').val(jsonobject.detailImage);
//         $('#head_image').val(jsonobject.headImage);
//         $('#name').val(jsonobject.name);
//         $('#support_count').val(jsonobject.supportCount);
//         $('#vedio_face').val(jsonobject.vedioFace);
//         $('#vedio_source').val(jsonobject.vedioSource);
//         $('#vedio_web_source').val(jsonobject.vedioWebSource);

//     }
// }

// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#pxbbform').serializeArray();
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

  // /Price/query?dealName=&limit=15&page=1

  // 加载页面时初始化页码
  $.get('/Price/query', {
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
    $('#totalNumber2').html(data.totalNumber);
    totalPage > 1 ? pageBtnOff.start() : pageBtnOff.all();     // 初始化时，首尾页按钮默认状态
    pageAction();     // 绑定点击页码处理事件
  })
  // init datatable
  new DataTable(
    $('.dataTable'), ['回报ID', '项目名称', '价格', '回报详情', '回报图片', '限购数量', '邮费' , '已支持数', '对票', '剩余票数', '总支持数'],
    '/Price/query',
    'GET', {
      dealName: null,
      limit: 15,
      page: 1
    },
    'returnData', ['priceId', 'dealName', 'dealPrice', 'dealGift', 'dealGiftImage', 'limitNumber', 'postage', 'supportNumber', 'ticketGroup', 'ticketNumber', 'totalNumber'],
    '/Price/deletePrice',
    'priceId',
    '/Price/updatePrice',
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
    if (selection == '项目名称') {
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

  function queryUserInfo(dealName, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['回报ID', '项目名称', '价格', '回报详情', '回报图片', '限购数量', '邮费' , '已支持数', '对票', '剩余票数', '总支持数'],
      '/Price/query', 
      'GET', {
        dealName: dealName,
        limit: pageSize,
        page: pageIndex    
      },
      'returnData', ['priceId', 'dealName', 'dealPrice', 'dealGift', 'dealGiftImage', 'limitNumber', 'postage', 'supportNumber', 'ticketGroup', 'ticketNumber', 'totalNumber'],
      '/Price/deletePrice',
      'priceId',
      '/Price/updatePrice',  
      '/add'
    );
    setTimeout(function() {
      deleteAction();
    }, 100);
  }

  $('#doit').click(function(event) {
    if ($.trim($('#dealName').val()) == '') {
      alert('项目名称不能为空！');
    } else if ($.trim($('#deal_gift').val()) == '') {
      alert('项目回馈不能为空！');
    } else if ($.trim($('#limitNumber').val()) == '') {
      alert('限购数量不能为空！');
    } else if ($.trim($('#supportNumber').val()) == '') {
      alert('支持数不能为空！');
    } else if ($.trim($('#ticketGroup').val()) == '') {
      alert('组票不能为空！');
    } else if ($.trim($('#dealPrice').val()) == '') {
      alert('价格不能为空！');
    } else if ($.trim($('#deal_gift_image').val()) == '') {
      alert('回馈图片不能为空！');
    } else if ($.trim($('#postage').val()) == '') {
      alert('邮费不能为空！');
    } else if ($.trim($('#totalNumber').val()) == '') {
      alert('总支持数不能为空！');
    } else if ($.trim($('#ticketNumber').val()) == '') {
      alert('票数不能为空！');
    } else {
      $.post('/Price/addPrice', {
        dealName: $.trim($('#dealName').val()),
        dealGift: $.trim($('#deal_gift').val()),
        limitNumber: $.trim($('#limitNumber').val()),
        supportNumber: $.trim($('#supportNumber').val()),
        ticketGroup: $.trim($('#ticketGroup').val()),
        dealPrice: $.trim($('#dealPrice').val()),
        dealGiftImage: $.trim($('#deal_gift_image').val()),
        postage: $.trim($('#postage').val()),
        totalNumber: $.trim($('#totalNumber').val()),
        ticketNumber: $.trim($('#ticketNumber').val()),
      }, function(data) {
        alert(data.returnData);
      })
    }
  });
})

// 删除操作栏
function deleteAction() {
  // var checkTableInit = setInterval(function() {
  //   if ($('.dataTable tr').length != 0) {   
  //     $.each($('.dataTable tr'), function(index, object) {
  //       $(this).children('td').last().remove();
  //     })
  //     clearInterval(checkTableInit);
  //   }
  // }, 50);     
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





