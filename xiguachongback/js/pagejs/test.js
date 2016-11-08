var oTable;
$(document).ready(function () {
    $("#adminEdit").click(_value);
    oTable = initTable();
});


function initTable() {
    $('#adminTable').DataTable({
        aLengthMenu: [10, 20, 50, "All"],
        bPaginate: true,
        "bFilter": true,
        "bSort": true,
        "iDisplayLength": 10,
        "processing": true,
        //"serverSide": true,
        ajax: {
            url: "js/json/douban.txt",
            // type:"jsonp"
            dataSrc: ""
        },
        columnDefs: [{
            "targets": 0,
            "orderable": false
        }, {
            "targets": 1,
            "visible": true
        }, {
            "targets": 2,
            "mRender": function (data, type, full) {
                return "<a href=\"#myModal-edit\" data-toggle=\"modal\" onclick=\"preUpdate(\" + data + \")\"></a>"
            }
        }],
        columns: [{
            //sTitle:"<input type='checkbox' id='checkAll'>",
            data: null,
            "createdCell": function (nTd, mData) {
                $(nTd).html("<input type='checkbox' name='checkList' value='" + mData + "'>");
            }
        }, {
            //sTitle: "管理员ID",
            data: "title"
        }, {
            //sTitle: "管理员用户名",
            data: "rating"
        }, {
            //sTitle: "密码",

            data: "href"
        }, {
            //sTitle: "是否有效",
            data: "isEffect"
        }, {
            //sTitle: "是否删除",
            data: "isDelete"
        }, {
            //sTitle: "权限ID",
            data: "roleId"
        }, {
            //sTitle: "上次登录时间",
            data: "loginTime"
        }, {
            //sTitle: "上次登录IP",
            data: "loginIp"
        }],
        "pagingType": "full_numbers"
    });

}


//点击添加按钮，表格消失，添加界面显示
$("#adminAdd").click(function () {
    $('#showpanel').css('display', 'none');
    $('#addpanel').css('display', 'block');
});

//点取消按钮，直接回到表格界面
$('#cancel').click(function () {
    window.location.reload();
});
//下拉选择给后台传值
$("#chazhao").click(function () {
    var text = $('#testSelect').val();//选中的值
    var id;
    var roleid;
    var admName;
    if (text == "ID") {
        id = text;
    } else if (text == "权限ID") {
        roleid = text;
    } else {
        admName = text;
    }
    alert(text);
    $.post(
        '/admin/query', {Id: id, roleId: roleid, admName: admName}, function (data) {
            alert(data)
        }
    );
});

//checkbox全选
$("#checkAll").on("click", function () {
    if ($(this).prop("checked") === true) {
        $("input[name='checkList']").prop("checked", $(this).prop("checked"));
        $('#consigneeTable tbody tr').addClass('selected');
    } else {
        $("input[name='checkList']").prop("checked", false);
        $('#consigneeTable tbody tr').removeClass('selected');
    }
});
//检验选择了几个checkbox
function checkboxFun() {
    checks = $("input[name='checkList']");
    n = 0;
    for (i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            n++;
            x = i;
        }
    }
}

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

        var tr = checks[x].parentNode.parentNode;
        var selected = tr.cells;
        $("#ID").val(selected[0].innerHTML);
        $("#adm_name").val(selected[1].innerHTML);
        $("#adm_password").val(selected[2].innerHTML);
        $("#is_effect").val(selected[3].innerHTML);
        $("#is_delete").val(selected[4].innerHTML);
        $("#role_id").val(selected[5].innerHTML);
        $("#login_time").val(selected[6].innerHTML);
        $("#login_ip").val(selected[7].innerHTML);
    }
}

//删除
$('#adminDelete').click(function () {
    checkboxFun();
    if (n == 0) {
        alert("请选择一条记录操作         ");
    }
    else if (n >= 1) {
        if (confirm("您选了：" + n + " 行进行操作")) {
            if (confirm("是否删除选中的信息？")) {
                //$.ajax({
                //    type: "delete",
                //    url: baseAddress + '/tbuser/' + id + "/",
                //    success: function (json) {
                //        window.location.reload();
                //    },
                //    error: function () {
                //        alert("删除失败");
                //    }
                //});
                window.location.reload();
            }
        } else {
            initTable();
        }

    }
});

