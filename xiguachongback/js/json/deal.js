/**
 * Created by vaio on 2015/10/22.
 */

$(document).ready(function () {
    $("#Edit").click(_value);
    oTable = initTable();

});
function initTable() {
    var table = $('#dealTable').DataTable({
        scrollX: true,
        scrollY: 500,
        //scrollCollapse:true,
        ordering: false,
        pagingType: 'full_numbers',
        ajax: "js/json/deal.txt",
        columnDefs: [{
            targets: 1
            //visible:false,
        }],
        "columns": [{
            title: "<input type='checkbox' id='checkAll'/>",
            data: null,
            "createdCell": function (nTd, sData) {
                $(nTd).html("<input type='checkbox' name='checkList' value='" + sData + "'>");
            }
        }, {
            data: 'dealId',
            title: '项目ID'
        }, {
            data: 'name',
            title: '项目名称'
        }, {
            data: 'nameMatch',
            title: 'name_match'
        }, {
            data: 'nameMatchRow',
            title: 'name_match_row'
        }, {
            data: 'image',
            render: function (data) {
                return '<img src="' + data + '" alt="false" height="50" width="50">'
            },
            title: '图片'
        }, {
            data: 'vedioImage',
            render: function (data) {
                return '<img src="' + data + '" alt="false" height="50" width="50">'
            },
            title: '视频封面'
        }, {
            data: 'vedio',
            title: '视频'
        }, {
            data: 'beginTime',
            title: '开始时间'
        }, {
            data: 'endTime',
            title: '结束时间'
        }, {
            data: 'isEffect',
            title: '是否生效'
        }, {
            data: 'commentCount',
            title: '评论数'
        }, {
            data: 'supportCount',
            title: '支持数'
        }, {
            data: 'focusCount',
            title: '关注数'
        }, {
            data: 'viewCount',
            title: '查看数'
        }, {
            data: 'logCount',
            title: 'log_count'
        }, {
            data: 'supportAmount',
            title: 'support_amount'
        }, {
            data: 'payAmount',
            title: 'pay_amount'
        }, {
            data: 'deliveryFeeAmount',
            title: 'delivery_fee_amount'
        }, {
            data: 'createTime',
            title: '创建时间'
        }, {
            data: 'seoTitle',
            title: 'SEO标题'
        }, {
            data: 'seoKeyword',
            title: 'SEO关键词'
        }, {
            data: 'seoDescription',
            title: 'SEO描述'
        }, {
            data: 'tags',
            title: '标签'
        }, {
            data: 'tagsMatch',
            title: 'tags_match'
        }, {
            data: 'tagsMatchRow',
            title: 'tags_match_row'
        }, {
            data: 'successTime',
            title: '成功时间'
        }, {
            data: 'isSuccess',
            title: '是否成功'
        }, {
            data: 'cateId',
            title: '分类'
        }, {
            data: 'address',
            title: '地址'
        }, {
            data: 'city',
            title: '市'
        }, {
            data: 'userId',
            title: '用户ID'
        }, {
            data: 'sort',
            title: '排序'
        }, {
            data: 'userName',
            title: '用户名'
        }, {
            data: 'isRecommend',
            title: '是否推荐'
        }, {
            data: 'isClassic',
            title: '是否经典'
        }, {
            data: 'isDelete',
            title: '是否删除'
        }, {
            data: 'star',
            title: '星级'
        }, {
            data: 'dealBanner',
            title: 'dealBanner'
        }, {
            data: 'descriptionImage',
            title: '描述性图片'
        }]
    });

    $('#dealTable tbody').on('click', 'tr', function () {
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
        $('#changepanel').html("项目编辑");
        $('#doit').html("确定");
        $('#showpanel').css('display', 'none');
        $('#addpanel').css('display', 'block');


        var jsonobject = eval('(' + rowcontent + ')');

        $("#deal_id").val(jsonobject.dealId);
        $("#name").val(jsonobject.name);
        $("#name_match").val(jsonobject.nameMatch);
        $("#name_match_row").val(jsonobject.nameMatchRow);
        $("#image").val(jsonobject.image);
        $("#vedio_image").val(jsonobject.vedioImage);
        $("#vedio").val(jsonobject.vedio);
        $("#begin_time").val(jsonobject.beginTime);
        $("#end_time").val(jsonobject.endTime);
        if (jsonobject.isEffect == "true") {
            $("#is_effect").attr("checked", "true")
        } else {
            $("#isnot_effect").attr("checked", "true")
        }
        $("#comment_count").val(jsonobject.commentCount);
        $("#support_count").val(jsonobject.supportCount);
        $("#focus_count").val(jsonobject.focusCount);
        $("#view_count").val(jsonobject.viewCount);
        $("#log_count").val(jsonobject.logCount);
        $("#support_amount").val(jsonobject.supportAmount);
        $("#pay_amount").val(jsonobject.payAmount);
        $("#delivery_fee_amount").val(jsonobject.deliveryFeeAmount);
        $("#create_time").val(jsonobject.createTime);
        $("#seo_title").val(jsonobject.seoTitle);
        $("#seo_keyword").val(jsonobject.seoKeyword);
        $("#seo_description").val(jsonobject.seoDescription);
        $("#tags").val(jsonobject.tags);
        $("#tags_match").val(jsonobject.tagsMatch);
        $("#tags_match_row").val(jsonobject.tagsMatchRow);
        $("#success_time").val(jsonobject.successTime);
        $("#is_success").val(jsonobject.isSuccess);
        if (jsonobject.isSuccess == "true") {
            $("#is_success").attr("checked", "true")
        } else {
            $("#isnot_success").attr("checked", "true")
        }
        $("#cate_id").val(jsonobject.cateId);
        $("#address").val(jsonobject.address);
        $("#city").val(jsonobject.city);
        $("#user_id").val(jsonobject.userId);
        $("#sort").val(jsonobject.sort);
        $("#user_name").val(jsonobject.userName);
        if (jsonobject.isRecommend == "true") {
            $("#is_recommend").attr("checked", "true")
        } else {
            $("#isnot_recommend").attr("checked", "true")
        }
        if (jsonobject.isClassic == "true") {
            $("#is_classic").attr("checked", "true")
        } else {
            $("#isnot_classic").attr("checked", "true")
        }
        if (jsonobject.isDelete == "true") {
            $("#is_delete").attr("checked", "true")
        } else {
            $("#isnot_delete").attr("checked", "true")
        }
        $("#total_support_count").val(jsonobject.totalSupportCount);
        $("#success_support_count").val(jsonobject.successSupportCount);
        $("#star").val(jsonobject.star);
        $("#start_time").val(jsonobject.startTime);
        $("#deal_banner").val(jsonobject.dealBanner);
        $("#vedio_web_source").val(jsonobject.vedioWebSource);
        $("#description_image").val(jsonobject.descriptionImage);

    }
}

//添加和修改
$('#doit').click(function () {
    var jsonobject = eval('(' + rowcontent + ')');
    var jsonobj1 = {};
    var jsonObject = $('#dealform').serializeArray();
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