var tag = null;
var rowcontent = null;
$(document).ready(function () {
    $("#Edit").click(_value);
    oTable = initTable();
});


function initTable() {
    var table = $('#adminTable').DataTable({
        // scrollX:true,
        scrollY: 500,
        ordering: false,
        processing: true,
        // serverSide: true,
        //info:false,

        searching: true,
        "pagingType": "full_numbers",
        "displayLength": 10,
        ajax: {
            url: "/admin/query?Id=0&roleId=0&admName=&page=1&limit=10",
            dataSrc: ""
        },
        columnDefs: [{
            "targets": 0,
            "orderable": false
        }, {
            "targets": 1,
            "visible": true
        }],
        columns: [{
            //title:"<input type='checkbox' id='checkAll'>",
            width: "5%",
            data: null,
            "createdCell": function (nTd, mData) {
                $(nTd).html("<input type='checkbox' name='checkList' value='" + mData + "'>");
            }
        }, {
            //title: "管理员ID",
            data: "id"
        }, {
            //title: "管理员用户名",
            data: "admName"
            //sClass:left
        }, {
            //title: "密码",
            data: "admPassword"
        }, {
            //title: "是否有效",
            data: "isEffect"
        }, {
            //title: "是否删除",
            data: "isDelete"
        }, {
            //title: "权限ID",
            data: "roleId"
        }, {
            //title: "上次登录时间",
            data: "loginTime"
        }, {
            //title: "上次登录IP",
            data: "loginIp"
        }]
    });
    $('#adminTable tbody').on('click', 'tr', function () {
        var rowdata = table.row(this).data();
        rowcontent = JSON.stringify(rowdata);

    });
}


//下拉选择给后台传值
$("#chazhao").click(function () {
    var text = $('#testSelect').val();//选中的值
    var id;
    var roleid;
    var admname;
    var page;
    var limit;
    if (text == "ID") {
        id = 1;
        roleid = 0;
        page = 1;
        limit = 5;
        admname = null;

    } else if (text == "权限ID") {
        id = 0;
        roleid = $('#searchbox').val();
        page = 1;
        limit = 5;
        admname = null;

    } else {
        id = 0;
        roleid = 0;
        page = 1;
        limit = 5;
        admname = $('#searchbox').val();

    }
    alert(text);
    $.get(
        '/admin/query', {Id: id, roleId: roleid, page: page, limit: limit, admName: admname}, function (data) {
            alert(data.Id);
        }
    );
});


//编辑赋值
function _value() {
    checkboxFun();
    if (n == 0) {
        alert("请选择一条记录操作         ");
    }
    else if (n > 1) {
        alert("您只能选择一行编辑" + "   您选了：" + n + "行");
        $("[name=checkList]:checkbox").prop("checked", false);
        $("#checkAll").prop("checked", false);
    } else {
        $('#changepanel').html("管理员编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display', 'none');
        $('#addpanel').css('display', 'block');


        var jsonobject = eval('(' + rowcontent + ')');

        $('#ID').val(jsonobject.id);
        $('#adm_name').val(jsonobject.admName);
        $('#adm_password').val(jsonobject.admPassword);
        if (jsonobject.isEffect == "true") {
            $("#is_effect").attr("checked", "true")
        } else {
            $("#isnot_effect").attr("checked", "true")
        }
        if (jsonobject.isDelete == "true") {
            $("#is_delete").attr("checked", "true")
        } else {
            $("#isnot_delete").attr("checked", "true")
        }
        $('#role_id').val(jsonobject.roleId);
        $('#login_time').val(jsonobject.loginTime);
        $('#login_ip').val(jsonobject.loginIp);
    }
}

$('#doit').click(function () {
    var jsonobject = eval('(' + rowcontent + ')');
    var jsonobj1 = {};
    var jsonObject = $('#adminform').serializeArray();
    $.each(jsonObject, function () {
        if (jsonobj1[this.name]) {
            if (!jsonobj1.push) {
                jsonobj1[this.name] = [jsonobj1[this.name]];
            }
            jsonobj1[this.name].push(this.value || '');
        } else {
            jsonobj1[this.name] = this.value || '';
        }
    });
    if (tag == "add") {
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            data: jsonobj1,
            url: "",
            success: function (data) {
                //oTable.reload();
                window.location.reload();
            },
            error: function (json) {
                alert("插入失败");
                $('#showpanel').css('display', 'none');
                $('#addpanel').css('display', 'block');
            }
        });
    } else {
        alert(jsonobject.id);
        $.ajax({
            async: false,
            type: "patch",
            dataType: 'json',
            data: jsonobj1,
            url: "" + jsonobject.id + "/",
            success: function (data) {
                window.location.reload();
            },
            error: function (json) {
                alert("修改失败");
                $('#showpanel').css('display', 'none');
                $('#addpanel').css('display', 'block');
            }
        });
    }
});

//删除
$('#Delete').click(function () {
    checkboxFun();
    if (n == 0) {
        alert("请选择一条记录操作         ");
    }
    else if (n >= 1) {
        if (confirm("您选了：" + n + " 行进行操作")) {
            if (confirm("是否删除选中的信息？")) {
                $.ajax({
                    type: "delete",
                    url: baseAddress + '/tbuser/' + id + "/",
                    success: function (json) {
                        window.location.reload();
                    },
                    error: function () {
                        alert("删除失败");
                    }
                });
                window.location.reload();
            }
        } else {
            initTable();
        }

    }
});

