// /**
//  * Created by vaio on 2015/10/22.
//  */
// $(document).ready(function () {
//     $("#Edit").click(_value);
//     oTable = initTable();
// });
// function initTable() {
//     var table = $('#consigneeTable').DataTable({
//         scrollX: true,
//         scrollCollapse: true,
//         //"processing": true,
//         //"serverSide": true,
//         ajax: {
//             //url: baseAddress + '/tbuser/'
//             url: "js/json/consignee.txt"
//         },
//         columnDefs: [{
//             targets: 1,
//             visible: false,
//             searchable: false
//         }],
//         columns: [{
//             title: "<input type='checkbox' id='checkAll'/>",
//             data: null,
//             "createdCell": function (nTd, sData) {
//                 $(nTd).html("<input type='checkbox'  name='checkList' value='" + sData + "'>");
//             }
//         }, {
//             data: 'id',
//             title: 'ID'
//         }, {
//             data: 'userId',
//             title: '用户名'
//         }, {
//             data: 'mobile',
//             title: '手机号'
//         }, {
//             data: 'province',
//             title: '省'
//         }, {
//             data: 'city',
//             title: '市'
//         }, {
//             data: 'address',
//             title: '详细地址'
//         }, {
//             data: 'consignee',
//             title: '收件人'
//         }, {
//             data: 'isDefault',
//             title: '是否默认'
//         }, {
//             data: 'isEffect',
//             title: '是否生效'
//         }]
//         //"pagingType": "full_numbers"

//     });
//     $('table tbody').on('click', 'tr', function () {
//         var rowdata = table.row(this).data();
//         rowcontent = JSON.stringify(rowdata);
//     });
// }


// //下拉选择给后台传值
// //$("#chazhao").click(function(){
// //    var text=$('#testSelect') .val();//选中的值
// //    if(text=="ID"){
// //        var datalist=["ID" ,0,null];
// //    }else if(text=="手机号"){
// //        var datalist=["手机号" ,0,null];
// //    }else{
// //        var datalist=["用户名" ,0,0];
// //    }
// //    alert(datalist);
// //    $.ajax({
// //        type:"post",
// //        url:"",
// //        data:datalist,
// //        dataType:json
// //    });
// //});


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
//         $('#changepanel').html("用户地址编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $("#ID").val(jsonobject.id);
//         $("#user_name").val(jsonobject.userName);
//         $("#mobile").val(jsonobject.mobile);
//         $("#province").val(jsonobject.province);
//         $("#city").val(jsonobject.city);
//         $("#address").val(jsonobject.address);
//         $("#consignee").val(jsonobject.consignee);
//         if (jsonobject.isDefault == "true") {
//             $("#is_default").attr("checked", "true")
//         } else {
//             $("#isnot_default").attr("checked", "true")
//         };
//         if (jsonobject.isEffect == "true") {
//             $("#is_effect").attr("checked", "true")
//         } else {
//             $("#isnot_effect").attr("checked", "true")
//         }
//     }
// }

// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#consigneeform').serializeArray();
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
//             url: baseAddress + '/tbuser/',
//             success: function (data) {
//                 $('#showpanel').css('display', 'block');
//                 $('#addpanel').css('display', 'none');
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
//             url: baseAddress + '/tbuser/' + jsonobject.id + "/",
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





// var userData;

// $(document).ready(function () {
//     $("#Edit").click(_value);
//     $.get('/UserBk/query', { userName: null, mobile: null, limit: 10000000, page: 1 }, function(res) {
//         userData = res.returnData;
//         oTable = initTable();
//         console.log(res)
//     })
// });


// function initTable() {
//     var table = $('#userTable').DataTable({
//         scrollX: true,
//         // scrollY: 500,
//         scrollCollapse: true,
//         processing: true,
//         // serverSide: true,
//         // sAjaxSource: '/UserBk/query?userName=12&mobile=32&limit=15&page=1',
//         // iDisplayLength: 20,
//         // fixedHeader:true,   
//         ordering: true,
//         autoWidth:false,
//         // ajax: "js/json/user.txt",
//         data: userData,
//         columnDefs: [{
//             targets: 1,
//             visible: false,
//             searchable: false
//         }],
//         "columns": [{
//             title: "<input type='checkbox' id='checkAll'/>",
//             data: null,
//             defaultContent: "<input type='checkbox' name='checkList'>",
//             "createdCell": function (nTd, sData) {
//                 $(nTd).html("<input type='checkbox' name='checkList' value=' + sData + '>");

//             }
//         }, {
//             data: 'userId',
//             title: '用户ID'
//         }, {
//             data: 'userName',
//             title: '用户昵称'
//         }, {
//             data: 'mobile',
//             title: '用户手机号'
//         }, {
//             data: 'createTime',
//             title: '注册时间'
//         }, {
//             data: 'updateTime',
//             title: '更新时间'
//         }, {
//             data: 'code',
//             title: '验证码'
//         }, {
//             data: 'isEffect',
//             title: '是否为有效用户'
//         }]
//     });
//     $('#userTable tbody').on('click', 'tr', function () {

//         var rowdata = table.row(this).data();
//         rowcontent = JSON.stringify(rowdata);
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
//         $('#changepanel').html("用户编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');


//         var jsonobject = eval('(' + rowcontent + ')');

//         $("#ID").val(jsonobject.id);
//         $("#user_name").val(jsonobject.userName);
//         $("#user_password").val(jsonobject.userPwd);
//         $("#code").val(jsonobject.code);
//         if (jsonobject.sex == "女") {
//             $("#female").attr("checked", "true")
//         } else {
//             $("#male").attr("checked", "true")
//         }
//     }
// }


// //添加和修改
// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#userform').serializeArray();
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
//             url: "" + jsonobject.id + "/",
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
  var totalPage; // 总页数
  var page = 1; // 当前页
  var pageSize = 15; // 每页显示数据量
  var showPage = 7; // 显示的页码数量
  var pageOffset = (showPage - 1) / 2; // 偏移量

  // /UserConsignee/query?userName=&mobile=&limit=5&page=1

  // 加载页面时初始化页码
  $.get('/UserConsignee/query', { 
    userName: null,
    mobile: null,
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
    $('.dataTable'), ['地址ID', '省份', '城市', '详细地址', '联系电话', '联系人'],
    '/UserConsignee/query',
    'GET', {
      userName: null,
      mobile: null,
      limit: 15,
      page: 1
    },
    'returnData', ['id', 'province', 'city', 'address', 'mobile', 'consignee'],
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
    if (selection == '用户名') {
      queryUserInfo(keyWords, null, 1);
    } else if (selection == '手机号') {
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
        } else if (activePage == totalPage) { // 尾页     
          pageBtnOn.start();
          pageBtnOff.end();
        } else { // 首页
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

  function queryUserInfo(userName, mobile, pageIndex) {
    // $.ajax({
    //   url: '/UserBk/query',
    //   type: 'GET',
    //   data: {
    //     userName: userName,
    //     mobile: mobile,
    //     limit: pageSize,
    //     page: pageIndex
    //   },
    //   dataType: 'json',
    //   success: function(data) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['地址ID', '省份', '城市', '详细地址', '联系电话', '联系人'],
      '/UserConsignee/query',
      'GET', {
        userName: userName,
        mobile: mobile,
        limit: pageSize,
        page: pageIndex
      },
      'returnData', ['id', 'province', 'city', 'address', 'mobile', 'consignee'],
      '/delete',
      '/update',
      '/add'
    );
    setTimeout(function() {
      deleteAction();
    }, 100);
    //   }
    // })   
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
