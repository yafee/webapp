
$(document).ready(function(){
    $("#Edit").click(_value);
    oTable=initTable();
});
function initTable(){
    var table=$('#refundTable').DataTable({
        scrollX:true,
        scrollY: 500,
        ordering:false,
        pagingType: "full_numbers",
        ajax:{
            url:"js/json/refund.txt"
        },
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
            data:'money',
            title:'金额'
        },{
            data:'userId',
            title:'用户名'
        },{
            data:'createTime',
            title:'创建时间'
        },{
            data:'reply',
            title:'答复',
            "render": function ( data, type ) {     //字数超过20,只显示20字
                return type === 'display' && data.length > 21 ?
                '<span title="'+data+'">'+data.substr( 0, 20 )+'...</span>' :
                    data;
            }
        },{
            data:'isPay',
            title:'是否支付'
        },{
            data:'payTime',
            title:'支付时间'
        },{
            data:'memo',
            title:'备注'
        }]
    });
    $('#refundTable tbody').on('click', 'tr', function () {
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
        $('#changepanel').html("用户退款编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display', 'none');
        $('#addpanel').css('display', 'block');


        var jsonobject = eval('(' + rowcontent + ')');

        $("#ID").val(jsonobject.id);
        $("#money").val(jsonobject.money);
        $("#user_id").val(jsonobject.userId);
        $("#create_time").val(jsonobject.createTime);
        $("#reply").val(jsonobject.reply);
        if (jsonobject.isPay == "true") {
            $("#is_pay").attr("checked", "true")
        } else {
            $("#isnot_pay").attr("checked", "true")
        }
        $("#pay_time").val(jsonobject.payTime);
        $("#memo").val(jsonobject.memo);

    }
}

