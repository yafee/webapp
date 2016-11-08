// /**
//  * Created by vaio on 2015/10/22.
//  */
// var tag=null;
// var rowcontent=null;
// $(document).ready(function () {
//     $("#orderEdit").click(_value);
//     oTable = initTable();
// });
// function initTable() {
//     var table = $('#orderTable').DataTable({
//         scrollX: true,
//         scrollCollapse: true,
//         ajax: {
//             url: ""
//         },
//         "columns": [{
//             title: "<input type='checkbox' id='checkAll'/>",
//             data: null,
//             "createdCell": function (nTd, sData) {
//                 $(nTd).html("<input type='checkbox' name='checkList' value='" + sData + "'>");
//             }
//         }, {
//             data: 'id',
//             title: 'ID'
//         }, {
//             data: 'dealId',
//             title: '项目ID'
//         }, {
//             data: 'userId',
//             title: '用户ID'
//         }, {
//             data: 'userName',
//             title: '用户名'
//         }, {
//             data: 'payTime',
//             title: '支付时间'
//         }, {
//             data: 'priceId',
//             title: '票价ID'
//         }, {
//             data: 'deliveryFee',
//             title: '快递费'
//         }, {
//             data: 'dealName',
//             title: '订单名称'
//         }, {
//             data: 'orderStatus',
//             title: '订单状态'
//         }, {
//             data: 'createTime',
//             title: '创建时间'
//         }, {
//             data: 'consignee',
//             title: '收件人'
//         }, {
//             data: 'mobile',
//             title: '手机'
//         }, {
//             data: 'province',
//             title: '省'
//         }, {
//             data: 'city',
//             title: '城市'
//         }, {
//             data: 'address',
//             title: '地址'
//         }, {
//             data: 'isSuccess',
//             title: '是否成功'
//         }, {
//             data: 'dealOntime',
//             title: 'dealOntime'
//         }, {
//             data: 'dealAddress',
//             title: '项目地址'
//         }, {
//             data: 'totalPayment',
//             title: '总支付金额'
//         }, {
//             data: 'shippingMethod',
//             title: 'shippingMethod'
//         }, {
//             data: 'orderNumber',
//             title: '订单号'

//         }],
//         "pagingType": 'full_numbers'

//     });
//     $('table tbody').on('click', 'tr', function () {
//         var rowdata = table.row(this).data();
//         rowcontent=JSON.stringify(rowdata);
//     });
// }

// $('#orderAdd').click(function () {
//     tag="add";
//     $('#showpanel').css('display', 'none');
//     $('#addpanel').css('display', 'block');
// });


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
//         $('#changepanel').html("liveHouse编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $('#id').val(jsonobject.id);
//         $('#deal_id').val(jsonobject.dealId);


//     }
// }

// //添加和修改
// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#orderform').serializeArray();
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

  // Date Picker
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : ((date.getMonth() + 1) + '');
  var day = (date.getDate() < 10) ? ('0' + date.getDate()) : (date.getDate() + '');
  var startDate = new Date(year, month, day);
  var endDate = new Date(year, month, day);
  var $alert = $('#my-alert');

  // $('#my-startDate').text(year+'-'+month+'-'+day);
  $('#my-startDate').text('2010-01-01');
  $('#my-endDate').text(year+'-'+month+'-'+day);

  $('#my-start').datepicker().on('changeDate.datepicker.amui', function(event) {
    if (event.date.valueOf() > endDate.valueOf()) {
      $alert.find('p').text('开始日期应小于结束日期！').end().show();
    } else {
      $alert.hide();
      startDate = new Date(event.date);
      $('#my-startDate').text($('#my-start').data('date'));
    }
    $(this).datepicker('close');
  });

  $('#my-end').datepicker().on('changeDate.datepicker.amui', function(event) {
    if (event.date.valueOf() < startDate.valueOf()) {
      $alert.find('p').text('结束日期应大于开始日期！').end().show();
    } else {
      $alert.hide();
      endDate = new Date(event.date);
      $('#my-endDate').text($('#my-end').data('date'));
    }
    $(this).datepicker('close');
  });

  var totalPage; // 总页数
  var page = 1; // 当前页
  var pageSize = 15; // 每页显示数据量
  var showPage = 7; // 显示的页码数量
  var pageOffset = (showPage - 1) / 2; // 偏移量

  // /DealOrder/query     orderNo    mobile

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // 加载页面时初始化页码
  $.get('/DealOrder/query', {
      beginTime: $('#my-startDate').text(),
      endTime: $('#my-endDate').text(),
      orderNo: null,
      mobile: null,
      dealName: null,
      userName: null,
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
      $('#totalDiscount').html(data.returnData.orderSum.totalDiscount);
      $('#totalPostage').html(data.returnData.orderSum.totalPostage);
      $('#totalMoney').html(data.returnData.orderSum.totalMoney);
      totalPage > 1 ? pageBtnOff.start() : pageBtnOff.all(); // 初始化时，首尾页按钮默认状态
      pageAction(); // 绑定点击页码处理事件
    })
    // init datatable
  new DataTable(
    $('.dataTable'), ['订单ID', '地址', '省份', '城市', '收件人', '收件人电话', '项目创建时间', '演出地址', '演出名称', '演出时间', '抵扣金钱', '订单号', '订单状态', '付款时间', '邮费', '运送方式', '总价', '用户昵称'],
    '/DealOrder/query',
    'GET', {
      beginTime: $('#my-startDate').text(),
      endTime: $('#my-endDate').text(),
      orderNo: null,
      mobile: null,
      dealName: null,
      userName: null,
      limit: 15,
      page: 1
    },
    'returnData', ['id', 'address', 'province', 'city', 'consignee', 'mobile', 'createTime', 'dealAddress', 'dealName', 'dealOntime', 'deliveryFee', 'orderNumber', 'orderStatus', 'payTime', 'postage', 'shippingMethod', 'totalPayment', 'userName'],
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
      queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, null, null, page);
      renderPage(page);
      $('#page').html(page);
    }
  })

  $('#end').on('click', function() {
    if (!$('#end').hasClass('am-disabled')) {
      pageBtnOn.start();
      pageBtnOff.end();
      page = totalPage;
      queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, null, null, page);
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
        queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, null, null, page);
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
    if (selection == '订单号') {
      queryUserInfo('', '', keyWords, null, null, null, 1);
    } else if (selection == '手机号') {
      queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, keyWords, null, null, 1);
    } else if (selection == '用户昵称') {
      queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, keyWords, null, 1);
    } else if (selection == '项目名称') {
      queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, null, keyWords, 1);
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
        } else if (activePage == totalPage) { // 尾页     
          pageBtnOn.start();
          pageBtnOff.end();
        } else { // 首页
          pageBtnOn.end();
          pageBtnOff.start();
        }
        page = activePage;
        queryUserInfo($('#my-startDate').text(), $('#my-endDate').text(), null, null, null, null, page);
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

  function queryUserInfo(beginTime, endTime, orderNo, mobile, userName, dealName, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['订单ID', '地址', '省份', '城市', '收件人', '收件人电话', '项目创建时间', '演出地址', '演出名称', '演出时间', '抵扣金钱', '订单号', '订单状态', '付款时间', '邮费', '运送方式', '总价', '用户昵称'],
      '/DealOrder/query',
      'GET', {
        beginTime: $('#my-startDate').text(),
        endTime: $('#my-endDate').text(),
        orderNo: orderNo,
        mobile: mobile,
        dealName: dealName,
        userName: userName,
        limit: pageSize,
        page: pageIndex
      },
      'returnData', ['id', 'address', 'province', 'city', 'consignee', 'mobile', 'createTime', 'dealAddress', 'dealName', 'dealOntime', 'deliveryFee', 'orderNumber', 'orderStatus', 'payTime', 'postage', 'shippingMethod', 'totalPayment', 'userName'],
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
