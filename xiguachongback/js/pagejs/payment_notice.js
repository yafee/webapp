/**
 * Created by vaio on 2015/10/22.
 */
$(document).ready(function () {
    $("#Edit").click(_value);
    oTable = initTable();
});
function initTable(){
    var table=$('#payment_noticeTable').DataTable({
        scrollX: true,
        scrollY: 500,
        ordering: false,
        pagingType: "full_numbers",
        ajax:{
            url:"js/json/payment_notice.txt"
        },
        columnDefs: [ {
            targets: 0,
            orderable: false
        },{
            targets: 1,
            visible: false,
            searchable:false
        }],
        "columns":[{
            title:"<input type='checkbox' id='checkAll'/>",
            data: null,
            "createdCell": function(nTd,sData){
                $(nTd).html("<input type='checkbox' name='checkList' value='"+sData+"'>")  ;
            }
        },{
            data:'id',
            title:'ID'
        },{
            data:'noticeSn',
            title:'notice_sn'

        },{
            data:'createTime',
            title:'创建时间'
        },{
            data:'payTime',
            title:'支付时间'
        },{
            data:'orderId',
            title:'订单ID'
        },{
            data:'isPaid',
            title:'是否支付'
        },{
            data:'userId',
            title:'用户ID'
        },{
            data:'paymentId',
            title:'支付ID'
        },{
            data:'bankId',
            title:'银行ID'
        },{
            data:'memo',
            title:'备注',
            "render": function ( data, type ) {     //字数超过20,只显示20字
                return type === 'display' && data.length > 20?
                '<span title="'+data+'">'+data.substr( 0, 20 )+'...</span>' :
                    data;
            }
        },{
            data:'money',
            title:'积分'
        },{
            data:'outerNoticeSn',
            title:'outer_notice_sn'
        },{
            data:'dealId',
            title:'项目ID'
        },{
            data:'dealItemId',
            title:'项目图片ID'
        },{
            data:'dealName',
            title:'项目名称'
        }]

    });
    $('#payment_noticeTable tbody').on('click', 'tr', function () {
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
        $('#changepanel').html("付款注意编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display', 'none');
        $('#addpanel').css('display', 'block');


        var jsonobject = eval('(' + rowcontent + ')');

        $("#ID").val(jsonobject.id);
        $("#notice_sn").val(jsonobject.noticeSn);
        $("#create_time").val(jsonobject.createTime);
        $("#pay_time").val(jsonobject.payTime);
        $("#order_id").val(jsonobject.orderId);
        $("#user_id").val(jsonobject.userId);
        if(jsonobject.isPaid="true"){
            $("#is_paid").attr("checked", "true")
        } else {
            $("#isnot_paid").attr("checked", "true")

        }

        $("#payment_id").val(jsonobject.paymentId);
        $("#bank_id").val(jsonobject.bankId);
        $("#memo").val(jsonobject.memo);
        $("#money").val(jsonobject.money);
        $("#outer_notice_sn").val(jsonobject.outerNoticeSn);
        $("#deal_id").val(jsonobject.dealId);
        $("#deal_item_id").val(jsonobject.dealItemId);
        $("#deal_name").val(jsonobject.dealName);
    }
}


//添加和修改
$('#doit').click(function () {
    var jsonobject = eval('(' + rowcontent + ')');
    var jsonobj1 = {};
    var jsonObject = $('#payment_noticeform').serializeArray();
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

