function uploadSingleFile(inputSelector, successCallback){
    var files =  $(inputSelector)[0].files;
    if(files.length == 0){
        alert("请选择上传图片!");
    }else if($("#banner-vertical")[0].files[0].size > 400*1024) {
        alert("图片不能大于400KB");
    }else{
        $.blockUI({ message: '上传中...' });
        var formData = new FormData();
        formData.append('file', $(inputSelector)[0].files[0]);
        $.ajax({
            url : '/UpLoad/postAndDetail',
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
                alert('上传成功');
                successCallback(data.returnData.imgUrl[0]);
            },
            error: function(xhr){
                alert('上传失败!');
            }
        });
    }
}

function updateGallerySortable(elementId){

    Sortable.create(document.getElementById(elementId), {
        animation: 150,
        draggable: '.col-md-2',
        handle: '.col-md-2',
        filter: 'button.thumbnail-delete',
        onFilter: function (evt) {
            var ctrl = evt.target;
            if (Sortable.utils.is(ctrl, 'button.thumbnail-delete')) {
                evt.from.removeChild(evt.item);
            }
        }
    });
}

$(document).ready(function() {
    $(document).ajaxStop($.unblockUI);
    var banner_vertical_url = '';
    var deal_banner_url = '';
    var video_web_source_url = '';

    jQuery.datetimepicker.setLocale('zh');

    $("#deal_time").datetimepicker({
        format:'Y-m-d H:i',
        step:1
    });

    $("#banner-vertical").on('change', function(){
        if($(this)[0].files.length == 0){
            banner_vertical_url = '';
            $("#banner-vertical-upload-btn").attr('disabled','disabled');
        }else{
            $("#banner-vertical-upload-btn").removeAttr('disabled');
        }
    })

    $("#deal-banner").on('change', function(){
        if($(this)[0].files.length == 0){
            deal_banner_url = '';
            $("#deal-banner-upload-btn").attr('disabled','disabled');
        }else{
            $("#deal-banner-upload-btn").removeAttr('disabled');
        }
    })

    $("#video-web-source").on('change', function(){
        if($(this)[0].files.length == 0){
            video_web_source_url = '';
            $("#video-web-source-upload-btn").attr('disabled','disabled');
        }else{
            $("#video-web-source-upload-btn").removeAttr('disabled');
        }
    })

    $("#banner-vertical-upload-btn").on('click', function(){
        uploadSingleFile('#banner-vertical', function(imgUrl){
            banner_vertical_url = imgUrl;
            $("#banner-vertical-upload-btn").attr('disabled','disabled');
        })
    })

    $("#deal-banner-upload-btn").on('click', function(){
        uploadSingleFile('#deal-banner', function(imgUrl){
            deal_banner_url = imgUrl;
            $("#deal-banner-upload-btn").attr('disabled','disabled');
        })
    })

    $("#video-web-source-upload-btn").on('click', function(){
        uploadSingleFile('#dvideo-web-source', function(imgUrl){
            deal_banner_url = imgUrl;
            $("#video-web-source-upload-btn").attr('disabled','disabled');
        })
    })

    $("#post-image,#detail-image").fileinput({
        language: 'zh',
        uploadUrl: "/UpLoad/postAndDetail",
        allowedFileExtensions: ["png", "jpeg", "jpg"],
        dropZoneEnabled:false,
        maxFileSize: 400
    }).on('fileuploaded', function(event, data, previewId, index) {
        var idSelector = '';
        if($(this)[0] == $("#post-image")[0]) {
            idSelector = 'post-image-list';
        }else if($(this)[0] == $("#detail-image")[0]){
            idSelector = 'detail-image-list';
        }

        var form = data.form,
            files = data.files,
            extra = data.extra,
            response = data.response,
            reader = data.reader;
        $('#'+idSelector).append('<div class="col-md-2">\
                <div class="thumbnail">\
                <img src="' + response.returnData.imgUrl[0] + '">\
                <button type="button" class="btn btn-xs btn-danger thumbnail-delete">\
                <span class="glyphicon glyphicon-remove"></span>\
                </button>\
                </div>\
                </div>');
        updateGallerySortable(idSelector);
    })

    $("form#create_deal_form").validator({
        submit: function() {
            var formValidity = this.isFormValid();

            if(formValidity){
                var post_images = [];
                var detail_images = [];

                $.each($('#post-image-list img'), function(index, value){
                    post_images[index] = $(value).attr('src');
                })

                $.each($('#detail-image-list img'), function(index, value){
                    detail_images[index] = $(value).attr('src');
                })

                $.ajax({
                    url: '/Deal/addDealInfo',
                    method: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({
                        cateId: $("select[name=cateId]").val(),
                        name: $("#deal_name").val(),
                        startTime: $("#deal_time").val(),
                        city: $("#deal_city").val(),
                        address: $("#deal_address").val(),
                        vedioWebSource: $("#vide_web_source").val(),
                        image: banner_vertical_url,
                        dealBanner: deal_banner_url,
                        vedioImage: video_web_source_url,
                        postImage: post_images,
                        detailImage: detail_images,
                    }),
                    success: function(data){
                        $.unblockUI();
                        alert('添加成功!');
                        location.reload();
                    },
                    error: function(xhr){
                        alert('修改失败!');
                    }
                })
            }

            return false;
        }
    })

    $("#create_deal_submit_btn").on('click', function(){
        $("form#create_deal_form").submit();
    })
})