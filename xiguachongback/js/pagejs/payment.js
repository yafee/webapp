/**
 * Created by vaio on 2015/10/22.
 */
$(document).ready(function(){
    $("#Edit").click(_value);
    oTable = initTable();
});
function initTable() {
    var table=$('#paymentTable').DataTable({
        scrollX: true,
        scrollY: 500,
        ordering: false,
        pagingType: "full_numbers",
        ajax: {
            url: "js/json/payment.txt"
        },
        columnDefs: [{
            targets: 0,
            orderable: false
        }, {
            targets: 1,
            visible: false,
            searchable: false
        }],
        "columns": [{
            title: "<input type='checkbox' id='checkAll'/>",
            data: null,
            "createdCell": function (nTd, sData) {
                $(nTd).html("<input type='checkbox' name='checkList' value='" + sData + "'>");
            }
        }, {
            data: 'id',
            title: 'ID'
        }, {
            data: 'className',
            title: 'class_name'
        }, {
            data: 'isEffect',
            title: '是否生效'
        }, {
            data: 'onlinePay',
            title: '在线支付'
        }, {
            data: 'name',
            title: '名称'
        }, {
            data: 'description',
            title: '描述',
            "render": function ( data, type ) {     //字数超过20,只显示20字
                return type === 'display' && data.length > 20 ?
                '<span title="'+data+'">'+data.substr( 0, 20 )+'...</span>' :
                    data;
            }
        }, {
            data: 'totalAmount',
            title: '总数'
        }, {
            data: 'config',
            title: '结构'
        }, {
            data: 'logo',
            title: '商标'
        }, {
            data: 'sort',
            title: '排序'
        }]
    });
    $('#paymentTable tbody').on('click', 'tr', function () {
        var rowdata = table.row(this).data();
        rowcontent = JSON.stringify(rowdata);
    });
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
        $('#changepanel').html("付款管理编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display', 'none');
        $('#addpanel').css('display', 'block');


        var jsonobject = eval('(' + rowcontent + ')');

        $("#ID").val(jsonobject.id);
        $("#class_name").val(jsonobject.className);
        $("#online_pay").val(jsonobject.onlinePay);
        $("#name").val(jsonobject.name);
        $("#description").val(jsonobject.description);
        $("#total_amount").val(jsonobject.totalAmount);
        $("#config").val(jsonobject.config);
        $("#logo").val(jsonobject.logo);
        $("#sort").val(jsonobject.sort);
        if (jsonobject.isEffect == "true") {
            $("#is_effect").attr("checked", "true")
        } else {
            $("#isnot_effect").attr("checked", "true")
        }
    }
}


//添加和修改
$('#doit').click(function () {
    var jsonobject = eval('(' + rowcontent + ')');
    var jsonobj1 = {};
    var jsonObject = $('#paymentform').serializeArray();
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
