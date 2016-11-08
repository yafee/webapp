// /**
//  * Created by sjh on 15/12/22.
//  */
// //liveHouse表 new
// var tag = null;
// var rowcontent = null;
// $(document).ready(function(){
//     $("#Edit").click(_value);
//     oTable=initTable();
// });

// function initTable() {
//     var table = $('#liveHouseTable').DataTable({
//         scrollX:true,
//         scrollY: 500,
//         ordering:false,
//         pagingType: "full_numbers",
//         ajax: {
//             url: "js/json/liveHouse.txt"
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
//             data: 'houseId',
//             title: 'ID'
//         }, {
//             data: 'houseName',
//             title: '场地名称'

//         }, {
//             data: 'houseCity',
//             title: '城市'
//         }, {
//             data: 'houseRegion',
//             title: '区域'
//         }, {
//             data: 'houseDescription',
//             title: '描述',
//             "render": function (data, type) {     //字数超过20,只显示20字
//                 return type === 'display' && data.length > 21 ?
//                 '<span title="' + data + '">' + data.substr(0, 20) + '...</span>' :
//                     data;
//             }
//         }, {
//             data: 'houseImageFace',
//             title: '封面',
//             render: function (data) {
//                 return '<img src="' + data + '" alt="false" height="50" width="50">'
//             }
//         }, {
//             data: 'houseImageBack',
//             title: 'houseImageback',
//             render: function (data) {
//                 return '<img src="' + data + '" alt="false" height="50" width="50">'
//             }
//         }, {
//             data: 'housePhoneNumber',
//             title: 'housePhoneNumber'
//         }, {
//             data: 'houseAddress',
//             title: '演出地址',
//             "render": function (data, type) {     //字数超过20,只显示20字
//                 return type === 'display' && data.length > 20 ?
//                 '<span title="' + data + '">' + data.substr(0, 20) + '...</span>' :
//                     data;
//             }
//         }, {
//             data: 'houseLongitude',
//             title: '经度'
//         }, {
//             data: 'houseLatitude',
//             title: '纬度'
//         }, {
//             data: 'housePeople',
//             title: '最大人数'
//         }]
//     });
//     $('table tbody ').on('click', 'tr', function () {
//         var rowdata = table.row(this).data();
//         rowcontent=JSON.stringify(rowdata);
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
//         $('#changepanel').html("liveHouse编辑");
//         $('#doit').html("确定");
//         $('#showpanel').css('display', 'none');
//         $('#addpanel').css('display', 'block');

//         var jsonobject = eval('(' + rowcontent + ')');

//         $('#house_id').val(jsonobject.houseId);
//         $('#house_name').val(jsonobject.houseName);
//         $('#house_city').val(jsonobject.houseCity);
//         $('#house_region').val(jsonobject.houseRegion);
//         $('#house_description').val(jsonobject.houseDescription);
//         $('#house_image_face').val(jsonobject.houseImageFace);
//         $('#house_image_back').val(jsonobject.houseImageBack);
//         $('#house_phone_number').val(jsonobject.housePhoneNumber);
//         $('#house_address').val(jsonobject.houseAddress);
//         $('#house_longitude').val(jsonobject.houseLongitude);
//         $('#house_latitude').val(jsonobject.houseLatitude);
//         $('#house_people').val(jsonobject.housePeople);

//     }
// }

// //添加和修改
// $('#doit').click(function () {
//     var jsonobject = eval('(' + rowcontent + ')');
//     var jsonobj1 = {};
//     var jsonObject = $('#dealform').serializeArray();
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
