/**
 * Created by user on 2015/11/18.
 */
$("#adminTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: 'true'
    }, {
        field: 'id',
        title: '管理员ID'
    }, {
        field: 'admName',
        title: '管理员用户名'
    }, {
        field: 'admPassword',
        title: '密码'
    }, {
        field: 'isEffect',
        title: '是否有效'
    }, {
        field: 'isDelete',
        title: '是否删除'
    }, {
        field: 'roleId',
        title: '权限ID'
    }, {
        field: 'loginTime',
        title: '上次登录时间'
    }, {
        field: 'loginIp',
        title: '上次登录IP'
    }],
    striped:true,
    pagination:true,
    pageList:[10,20,50,100,500],
    pageSize:10,
    pageNumber:1,
    url:"http://www.xiguachong.cn/admin/queryAll",
    type:'jsonp'
});
    //点击添加按钮，表格消失，添加界面显示
    $("#adminAdd").click(function(){
        $('#showpanel').css('display','none');
        $('#addpanel').css('display','block');
    });

//点取消按钮，直接回到表格界面
$('#cancel').click(function () {
    window.location.reload();
});
//下拉选择给后台传值
$("#chazhao").click(function(){
    var text=$('#testSelect') .val();//选中的值
    var id;
    var roleid;
    var  admName;
    if(text=="ID"){
        id=text;
    }else if(text=="权限ID"){
        roleid=text;
    }else{
        admName=text;
    }
    alert(text);
    $.post(
        '/admin/query', {Id:id, roleId:roleid, admName:admName},function(data){
            alert(data)
        }
    );
});

var rowcontent = null;
$('#adminEdit').click(function(){
    var jsonobject = eval('('+ rowcontent +')');
    //$('#adm_name').val(jsonobject.admName);
    //$('#adm_password').val(jsonobject.admPassword);
    //$('#is_effect').val(jsonobject.isEffect);
    //$('#is_delete').val(jsonobject.isDelete);
    //$('#role_id').val(jsonobject.roleId);
    //$('#login_time').val(jsonobject.loginTime);
    //$('#login_ip').val(jsonobject.loginIp);

    $('#changepanel').html("管理员编辑");
    $('#doit').html("确定");
    $('#showpanel').css('display','none');
    $('#addpanel').css('display','block');
});
$('#adminEdit').on('check.bs.table', function(e,row){
    rowcontent = JSON.stringify(row);  //把json对象解析成string对象
});



//删除
$('#adminDelete').click(function(){
    var jsonobject = eval('('+ rowcontent +')');
    //确认是否删除
    if(confirm("是否删除此条信息？")) {
        $.ajax({
            type: 'delete',
            url: baseAddress+'/tbaverageamountstd/'+jsonobject.amountstdid+"/",
            success: function (json) {
                window.location.reload();
            }
        })
    }
});