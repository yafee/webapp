/**
 * Created by sjh on 15/12/2.
 */
$(document).ready(function () {
    $("#adminEdit").click(_value);

    });
$(function () {
    $('button').click(function () {
        $('button').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
    });
    var pageSize = $("#select_length").val();
    $(".page-end").html(pageSize);

    $.ajax({
        url: "http://www.xiguachong.cn/admin/query?Id=0&roleId=0&admName=&page=1&limit=" + pageSize,
        //  url: "http://www.xiguachong.cn/admin/query?Id=0&roleId=0&admName=&page=1&limit=8" ,
        dataType: "json",
        success: function (data) {
            var item;
            $.each(data, function (i, result) {
                item = "<tr><td><input type='checkbox' name='checkList' class='checkList'></td><td>" + result['id'] + "</td><td>" + result['admName'] + "</td><td>" + result['admPassword'] + "</td><td>" + result['isEffect'] + "</td><td>" + result['isDelete'] + "</td><td>" + result['roleId'] + "</td><td>" + result['loginTime'] + "</td><td>" + result['loginIp'] + "</td></tr>";
                $('#adminTable').append(item);
            })
        }
    })


});



//checkbox全选
$("#checkAll").on("click", function () {
    if ($(this).prop("checked") === true) {
        $("input[name='checkList']").prop("checked", $(this).prop("checked"));
        $('#adminTable tbody tr').addClass('selected');
        $("#adminDelete").attr('disabled', false);
    } else {
        $("input[name='checkList']").prop("checked", false);
        $('#adminTable tbody tr').removeClass('selected');
        $("#adminDelete").attr('disabled', true);
    }
});
//remove删除
$("#Delete").click(function() {
    $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
        var N = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
        $("#adminTable").find("tr:eq(" + N + ")").remove();

    })
});
$("input[name='checkList']:checked").each(function () {
        $("#adminDelete").attr('disabled', false);
        $("#adminEdit").attr('disabled', false);
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


//点击添加按钮，表格消失，添加界面显示
$("#adminAdd").click(function () {
    $('#showpanel').css('display', 'none');
    $('#addpanel').css('display', 'block');
});

//点取消按钮，直接回到表格界面
$('#cancel').click(function () {
    window.location.reload();
});

//编辑赋值
function _value(){
    checkboxFun();
    if(n==0){
        alert("请选择一条记录操作         ");
    }
    else if(n>1){
        alert("您只能选择一行编辑"+"   您选了："+n+"行");
        $("[name=checkList]:checkbox").prop("checked",false);
        $("#checkAll").prop("checked",false);
    }else{
        $('#changepanel').html("管理员编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display','none');
        $('#addpanel').css('display','block');

        var tr= checks[x].parentNode.parentNode;
        var selected=tr.cells;
        $("#ID").val(selected[1].innerHTML);
        $("#adm_name").val(selected[2].innerHTML);
        $("#adm_password").val(selected[3].innerHTML);
        $("#is_effect").val(selected[4].innerHTML);
        $("#is_delete").val(selected[5].innerHTML);
        $("#role_id").val(selected[6].innerHTML);
        $("#login_time").val(selected[7].innerHTML);
        $("#login_ip").val(selected[8].innerHTML);
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

//下拉选择查找参数给后台传值
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
            alert(limit);
        }
    );
});


//下页
function next() {
    hideTable();


    currentRow = pageSize * page;
    maxRow = currentRow + pageSize;
    if (maxRow > numberRowsInTable) maxRow = numberRowsInTable;
    for (var i = currentRow; i < maxRow; i++) {
        theTable.rows[i].style.display = '';
    }
    page++;


    if (maxRow == numberRowsInTable) {
        nextText();
        lastText();
    }
    showPage();
    preLink();
    firstLink();

}
//上页
function pre() {
    hideTable();

    page--;

    currentRow = pageSize * page;
    maxRow = currentRow - pageSize;
    if (currentRow > numberRowsInTable) currentRow = numberRowsInTable;
    for (var i = maxRow; i < currentRow; i++) {
        theTable.rows[i].style.display = '';
    }

    if (maxRow == 0) {
        preText();
        firstText();
    }
    showPage();
    nextLink();
    lastLink();
}

//第一页
function first() {
    hideTable();
    page = 1;
    for (var i = 0; i < pageSize; i++) {
        theTable.rows[i].style.display = '';
    }
    showPage();


    preText();
    nextLink();
    lastLink();
}


//最后一页
function last() {
    hideTable();
    page = pageCount();
    currentRow = pageSize * (page - 1);
    for (var i = currentRow; i < numberRowsInTable; i++) {
        theTable.rows[i].style.display = '';
    }
    showPage();


    preLink();
    nextText();
    firstLink();
}


function hideTable() {
    for (var i = 0; i < numberRowsInTable; i++) {
        theTable.rows[i].style.display = 'none';
    }
}


function showPage() {
    pageNum.innerHTML = page;
}


//总共页数
function pageCount() {
    var count = 0;
    if (numberRowsInTable % pageSize != 0) count = 1;
    return parseInt(numberRowsInTable / pageSize) + count;
}