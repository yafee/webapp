function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
    $(document).ajaxStop($.unblockUI);

    var ticket_img_url = '';
    var is_create_ticket = true;
    var selected_ticket_id;

    $("#create-ticket-btn").on('click', function(){
        $("#price").val('');
        $("#description").val('');
        ticket_img_url = undefined;
        $("#alreadySale").val('');
        $("#totalCount").val('');
        $("#postage").val('');
        $("#stock").val('');

        $("#create-or-modify-ticket-title").text("新增票务");
        $("#create-or-modify-ticket-modal").modal();

        is_create_ticket = true;
    })

    $("#create_ticket_btn").on('click', function(){

        $("form#create_or_modify_ticket_form").submit();
    })

    $("form#create_or_modify_ticket_form").validator({
        submit: function() {
            var formValidity = this.isFormValid();

            if(formValidity){
                //创建票务
                if(is_create_ticket) {
                    $.blockUI({
                        message: '创建票务中...'
                    })
                    $.ajax({
                        url: '/Price/addPriceInfo',
                        method: 'POST',
                        data: {
                            dealId: getParameterByName('dealId'),
                            dealPrice: $("#price").val(),
                            dealGift: $("#description").val(),
                            dealGiftImage: ticket_img_url,
                            supportNumber: $("#alreadySale").val(),
                            totalNumber: $("#totalCount").val(),
                            postage: $("#postage").val(),
                            ticketNumber: $("#stock").val()
                        },
                        success: function () {
                            alert('添加成功');
                            location.reload();
                        },
                        error: function () {
                            alert('添加失败')
                        }
                    })
                }else {
                    //更新票务
                    $.blockUI({
                        message: '更新票务中...'
                    })
                    $.ajax({
                        method: 'POST',
                        url: '/Price/updatePriceInfo',
                        data: {
                            priceId: selected_ticket_id,
                            dealPrice: $("#price").val(),
                            dealGift: $("#description").val(),
                            dealGiftImage: ticket_img_url,
                            supportNumber: $("#alreadySale").val(),
                            totalNumber: $("#totalCount").val(),
                            postage: $("#postage").val(),
                            ticketNumber: $("#stock").val()
                        },
                        success: function(){
                            alert('修改成功');
                            location.reload();
                        },
                        error: function(){
                            alert('修改失败')
                        }
                    })
                }
            }

            return false;
        }
    })

    // $.blockUI({
    //     message: '获取票务中...'
    // })
    $.ajax({
        method: 'GET',
        url: '/Price/getPriceInfo',
        data: {
            dealId: getParameterByName('dealId')
        },
        success: function(data){
            if(data.returnData.length == 0){
                alert('暂无票务!');
            }
            $.each(data.returnData, function(index, value){
                $("tbody").append('<tr>\
                    <td>' + value.priceId + '</td>\
                    <td><img src="' + value.dealGiftImage + '" width="200"/></td>\
                    <td>' + value.dealPrice + '</td>\
                    <td>' + value.dealGift + '</td>\
                    <td>' + value.postage + '</td>\
                    <td>' + value.totalNumber + '</td>\
                    <td>' + value.supportNumber + '</td>\
                    <td>' + value.ticketNumber + '</td>\
                    <td><button type="button" role="modifyTicket" class="am-btn am-btn-primary">编辑</button><button type="button" role="deleteTicket" class="am-btn am-btn-danger" style="margin-left: 10px">删除</button></td>\
                    </tr>')
            })
        },
        error: function(xhr){
            alert('获取票务详情失败!');
        }
    })

    $("#image").on('change', function(){
        if($(this)[0].files.length == 0){
            ticket_img_url = '';
            $("#image-upload-btn").attr('disabled','disabled');
        }else{
            $("#image-upload-btn").removeAttr('disabled');
        }
    })

    $("#image-upload-btn").on('click', function(){
        var files =  $('#image')[0].files;
        if(files.length == 0){
            alert("请选择演出封面!");
        }else{
            var formData = new FormData();
            formData.append('file', $('#image')[0].files[0]);
            $.blockUI({
                message: '上传中...'
            })
            $.ajax({
                url : '/UpLoad/postAndDetail',
                type : 'POST',
                data : formData,
                processData: false,
                contentType: false,
                success : function(data) {
                    alert('上传成功');
                    $("#image-upload-btn").attr('disabled','disabled');
                    ticket_img_url = data.returnData.imgUrl[0];
                },
                error: function(xhr){
                    alert('上传失败!');
                }
            });
        }
    })

    $("tbody").delegate('button[role=deleteTicket]', 'click', function(){
        var priceId = $(this).closest('tr').children("td:first").text();
        var deletePrompt = confirm('确定删除该条记录?');
        if(deletePrompt){
            $.blockUI({
                message: '删除中...'
            })
            $.ajax({
                method: 'POST',
                url: '/Price/deletePriceInfo',
                data: {
                    priceId: priceId
                },
                success: function(){
                    alert('删除成功');
                    location.reload();
                },
                error: function(){
                    alert('删除失败')
                }
            })
        }
    })

    $("tbody").delegate('button[role=modifyTicket]', 'click', function(){
        var priceId = $(this).closest('tr').children("td:first").text(),
            dealPrice = $(this).closest('tr').children("td:nth-child(3)").text(),
            dealGift = $(this).closest('tr').children("td:nth-child(4)").text(),
            dealGiftImage = $(this).closest('tr').children("td:nth-child(2)").find('img').attr('src'),
            supportNumber = $(this).closest('tr').children("td:nth-child(7)").text(),
            totalNumber = $(this).closest('tr').children("td:nth-child(6)").text(),
            postage = $(this).closest('tr').children("td:nth-child(5)").text(),
            ticketNumber = $(this).closest('tr').children("td:nth-child(8)").text();

        $("#price").val(dealPrice);
        $("#description").val(dealGift);
        ticket_img_url = dealGiftImage;
        $("#alreadySale").val(supportNumber);
        $("#totalCount").val(totalNumber);
        $("#postage").val(postage);
        $("#stock").val(ticketNumber);

        selected_ticket_id = priceId;
        $("#create-or-modify-ticket-title").text("修改票务");
        $("#create-or-modify-ticket-modal").modal();

        is_create_ticket = false;
    })
})