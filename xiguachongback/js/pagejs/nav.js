// /**
//  * Created by sjh on 15/12/24.
//  */

// //导航 new
// var tag=null;
// var rowcontent=null;
// $(document).ready(function(){
//     $("#Edit").click(_value);
//     oTable = initTable();
// });

// function initTable(){
//     var table=$('#navTable').DataTable({
//         ajax:{
//             url:"js/json/nav.txt"
//         },
//         columnDefs: [ {
//             targets: 0,
//             orderable: false
//         },{
//             targets: 1,
//             visible: false,
//             searchable:false
//         }],
//         "columns":[{
//             title:"<input type='checkbox' id='checkAll'/>",
//             data: null,
//             "createdCell": function(nTd,sData){
//                 $(nTd).html("<input type='checkbox' name='checkList' value='"+sData+"'>")  ;
//             }
//         },{
//             data:'ID',
//             title:'ID'
//         },{
//             data:'name',
//             title:'名称'
//         },{
//             data:'url',
//             title:'URL地址'
//         },{
//             data:'blank',
//             title:'blank'
//         },{
//             data:'sort',
//             title:'排序'
//         },{
//             data:'isEffect',
//             title:'是否有效'
//         },{
//             data:'uModule',
//             title:'uModule'
//         }, {
//             data: 'uAction',
//             title: 'uAction'
//         }, {
//             data: 'uId',
//             title: 'uId'
//         }, {
//             data: 'uParam',
//             title: 'uParam'
//         }],

//         "pagingType":'full_numbers'
//     });
//     $('#navTable tbody').on('click', 'tr', function () {
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
//         $('#changepanel').html("导航编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $('#ID').val(jsonobject.id);
//         $('#name').val(jsonobject.name);
//         $('#url').val(jsonobject.url);
//         $('#blank').val(jsonobject.blank);
//         $('#sort').val(jsonobject.sort);
//         if (jsonobject.isEffect == "是") {
//             $("#is_effect").attr("checked", "true")
//         } else {
//             $("#isnot_effect").attr("checked", "true")
//         }
//         $('#u_module').val(jsonobject.uModule);
//         $('#u_action').val(jsonobject.uAction);
//         $('#u_id').val(jsonobject.uId);
//         $('#u_param').val(jsonobject.uParam);

//     }
// }




$(function() {
  var totalPage;     // 总页数
  var page = 1;     // 当前页
  var pageSize = 15;     // 每页显示数据量
  var showPage = 7;     // 显示的页码数量
  var pageOffset = (showPage - 1) / 2;     // 偏移量

  // /LiveHouse/query?houseName=&houseCity=&limit=15&page=1
  // /LiveHouse/updateHouse post houseId 

  // 加载页面时初始化页码
  $.get('/LiveHouse/query', {
    houseName: null,
    houseCity: null,
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
    $('.dataTable'), ['houseID', 'house地址', 'house城市', '详细地址', '经度', '纬度', 'house封面小图', 'house名称', '容纳人数', '联系电话'],
    '/LiveHouse/query',
    'GET', {
      houseName: null,
      houseCity: null,
      limit: 15,
      page: 1
    },
    'returnData', ['houseId', 'houseAddress', 'houseCity', 'houseRegion', 'houseLongitude', 'houseLatitude', 'houseImageFace', 'houseName', 'housePeople', 'housePhoneNumber'],
    '/LiveHouse/deleteHouse',
    'houseId',
    '/LiveHouse/updateHouse',
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
    if (selection == '演出名称') {
      queryUserInfo(keyWords, null, 1);
    } else if (selection == '演出城市') {
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

  function queryUserInfo(houseName, houseCity, pageIndex) {
    $('.dataTable').empty();
    new DataTable(
      $('.dataTable'), ['houeID', 'house地址', 'house城市', '详细地址', '经度', '纬度', 'house封面小图', 'house名称', '容纳人数', '联系电话'],
      '/LiveHouse/query', 
      'GET', {
        houseName: houseName,
        houseCity: houseCity,
        limit: pageSize,
        page: pageIndex    
      },
      'returnData', ['houseId', 'houseAddress', 'houseCity', 'houseRegion', 'houseLongitude', 'houseLatitude', 'houseImageFace', 'houseName', 'housePeople', 'housePhoneNumber'],
      '/LiveHouse/deleteHouse',
      'houseId',
      '/LiveHouse/updateHouse',  
      '/add'
    );
    setTimeout(function() {
      deleteAction();
    }, 100);
  }

  $('#doit').click(function(event) {
    if ($.trim($('#houseAddress').val()) == '') {
      alert('演出地址不能为空！');
    } else if ($.trim($('#houseLongitude').val()) == '') {
      alert('经度不能为空！');
    } else if ($.trim($('#houseName').val()) == '') {
      alert('演出名称不能为空！');
    } else if ($.trim($('#housePhoneNumber').val()) == '') {
      alert('演出电话不能为空！');
    } else if ($.trim($('#houseRegion').val()) == '') {
      alert('演出区域不能为空！');
    } else if ($.trim($('#houseCity').val()) == '') {
      alert('演出城市不能为空！');
    } else if ($.trim($('#houseLatitude').val()) == '') {
      alert('纬度不能为空！');
    } else if ($.trim($('#houseImageFace').val()) == '') {
      alert('演出海报不能为空！');
    } else if ($.trim($('#housePeople').val()) == '') {
      alert('容纳人数不能为空！');
    } else {
      $.post('/LiveHouse/addHouse', {
        houseAddress: $.trim($('#houseAddress').val()),
        houseLongitude: $.trim($('#houseLongitude').val()),
        houseName: $.trim($('#houseName').val()),
        housePhoneNumber: $.trim($('#housePhoneNumber').val()),
        houseRegion: $.trim($('#houseRegion').val()),
        houseCity: $.trim($('#houseCity').val()),
        houseLatitude: $.trim($('#houseLatitude').val()),
        houseImageFace: $.trim($('#houseImageFace').val()),
        housePeople: $.trim($('#housePeople').val())
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




