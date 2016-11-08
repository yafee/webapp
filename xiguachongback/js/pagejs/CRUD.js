var rowcontent = null;
var tag = null;
//点击添加按钮，表格消失，添加界面显示
$('#healtheradd').click(function(){
    tag ="add";
    $('#table').css('display','none');
    $('#healtheraddpanel').css('display','block');
});
$("form").submit(function(e){
    e.preventDefault();
});
//点击编辑按钮，把获取到的json 填充到添加界面中
$('#healtheredit').click(function(){
    tag = "edit";
    var jsonobject = eval('('+ rowcontent +')');
    $('#UserID').val(jsonobject.userid);
    $('#UserName').val(jsonobject.username);
    if(jsonobject.usersex.toString() == "女"){
        $("#nv").attr("checked","true")
    }else {
        $("#nan").attr("checked", "true")
    };
    $('#Password').val(jsonobject.password);
    $('#UserAge').val(jsonobject.userage);
    $('#UserWorkType').val(jsonobject.userwroktype);
    $('#PhoneNumber').val(jsonobject.userphonenumber);
    $('#UserBMIindex').val(jsonobject.userbmiindex);
    $('#email').val(jsonobject.email);


    $('#toolbar').css('display','none');
    $('#table').css('display','none');
    $('#healtheraddpanel').css('display','block');
    $('#changepanel').html("普通用户编辑");
    $('#doit').html("确定");
});
$('#healther').on('check.bs.table', function(e,row){
    rowcontent = JSON.stringify(row);  //把json对象解析成string对象
});
//点加取消按钮，直接回到表格界面
$('#cancel').click(function(){
    turnPage('back/dashboard/main/healther.html');
});
$('#doit').click(function(){
    var jsonobject = eval('('+ rowcontent +')');
    var jsonobj1 = {};
    var jsonObject = $('#healtherform').serializeArray();
    $.each(jsonObject, function(){
        if(jsonobj1[this.name]){
            if(!jsonobj1.push){
                jsonobj1[this.name] = [jsonobj1[this.name]];
            }
            jsonobj1[this.name].push(this.value || '');
        }else{
            jsonobj1[this.name] = this.value || '';
        }
    });
    if(tag == "add"){
        $.ajax({
            async:false,
            type: "post",
            dataType:'json',
            data:jsonobj1,
            url:baseAddress+'/tbuser/',
            success:function(data){
                turnPage('back/dashboard/main/healther.html');
            },
            error:function(json){
                alert ("插入失败");
                $('.table-control').css('display','none');
                $('#healtheraddpanel').css('display','block');
            }
        });
    }else{
        alert(jsonobject.userid);
        $.ajax({
            async:false,
            type: "patch",
            dataType:'json',
            data:jsonobj1,
            url: baseAddress+'/tbuser/'+jsonobject.userid+"/",
            success:function(data){
                turnPage('back/dashboard/main/healther.html');
            },
            error:function(json){
                alert ("修改失败");
                $('.table-control').css('display','none');
                $('#healtheraddpanel').css('display','block');
            }
        });
    }
});
//删除
$('#healtherdelete').click(function(){
    var jsonobject = eval('('+ rowcontent +')');
    if(confirm("是否删除此条信息？")) {
        $.ajax({
            type: 'delete',
            url: baseAddress+'/tbuser/'+jsonobject.userid+"/",
            success: function (json) {
                turnPage('back/dashboard/main/healther.html');
            },
            error: function(){
                alert("wrong");
            }
        })
    }
});

//获取行政id数据
jQuery(function($){
    $.ajax({
        type: "get",
        datatype:"json",
        url:baseAddress+'/tbadminisarea/',
        success:function(msg){
            var str="";
            for(i in msg){
                str += "<option value ="+ msg[i].adminisareaid+" >" + msg[i].adminisarearemarks + "</option>";
            }
            $("#temp_AdminisAreaID").append(str);
        }
    })
});
//获取睡眠特征id数据
jQuery(function($){
    $.ajax({
        type: "get",
        datatype:"json",
        url:baseAddress+'/tbusersleepfeature/',
        success:function(msg){
            var str="";
            for(i in msg){
                str += "<option value ="+ msg[i].sleepfeatureid+" >" + msg[i].bedtimehabits + "</option>";
            }
            $("#temp_SleepFeatureID").append(str);
        }
    })
});
//获取运动特征id数据
jQuery(function($){
    $.ajax({
        type: "get",
        datatype:"json",
        url:baseAddress+'/tbuserexercisefeature/',
        success:function(msg){
            var str="";
            for(i in msg){
                str += "<option value ="+ msg[i].exercisefeatureid+" >" + msg[i].bedtimehabits + "</option>";
            }
            $("#temp_ExerciseFeatureID").append(str);
        }
    })
});
//获取饮食特征id数据
jQuery(function($){
    $.ajax({
        type: "get",
        datatype:"json",
        url:baseAddress+'/tbfoodfeature/',
        success:function(msg){
            var str="";
            for(i in msg){
                str += "<option value ="+ msg[i].eatingfeatureid+" >" + msg[i].eatinghabitanalysis + "</option>";
            }
            $("#temp_EatingFeatureID").append(str);
        }
    })
});


$(function(){
    //过滤器
    $('#filter-bar').bootstrapTableFilter({
        filters:[
            {
                field: 'username',    // field identifier
                label: '用户名',    // filter label
                type: 'search'   // filter type
            },
            {
                field: 'usersex',
                label: '用户性别',
                type: 'select',
                values: [
                    {id: '男', label: '男'},
                    {id: '女', label: '女'},
                ]
            },
            {
                field: 'userage',
                label: '用户年龄',
                type: 'range'
            },
            {
                field: 'userrank',
                label: '用户等级',
                type: 'search'
            }
        ],
        onSubmit: function() {
            var data = $('#filter-bar').bootstrapTableFilter('getData');

            alert(data);
        }
    });
    window.parent.frames.bottom.location.reload();

    $('#validateform').bootstrapValidator({
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            username: {
                validators: {
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]+$/,
                        message: '用户名只能包含中文'
                    },
                    stringLength: {
                        max: 30,
                        message: '请将用户名限制在30个字符以内'
                    }
                }
            },
            userphonenumber: {
                validators: {
                    regexp: {
                        regexp: /^1[3|4|5|8][0-9]\d{4,8}$/,
                        message: '不是完整的11位手机号或者正确的手机号前七位'
                    }
                }
            },
            userbmiindex: {
                validators: {
                    regexp: {
                        regexp: /^\d{1,6}(\.\d{1,2})$/,
                        message: '限制最多六位整数以及两位小数'
                    }
                }
            },
            userage: {
                validators: {
                    regexp: {
                        regexp: /^[1-9]\d?$|^1[01]\d$|^120$/,
                        message: '年龄1-120岁之间'
                    }
                }
            },
            userpassword: {
                validators: {
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/i,
                        message: '密码只能包含字母 数字 下划线'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '请将密码限制在6-30个字符以内'
                    }
                }
            }
        }
    });
});
