function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function readURL(input, previewSelector) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(previewSelector).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function updateGallerySortable(){

    Sortable.create(document.getElementById('edit-thumbnail-list'), {
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
    var deal_info;

    $(document).ajaxStart($.blockUI({
        message: '加载中...'
    })).ajaxStop($.unblockUI);

    $.ajax({
        method: 'GET',
        url: '/Deal/detail',
        data: {
            dealId: getParameterByName('dealId')
        },
        success: function(data){
            var returnData = data.returnData;
            deal_info = returnData;
            $("span#dealName").text(returnData.name);
            $("div#cate_name").text(returnData.cateName);
            $("div#detailDealName").text(returnData.name)
            $("div#startTime").text(returnData.startTime);
            $("div#city").text(returnData.city);
            $("div#address").text(returnData.address);
            $("div#videoWebSource").text(returnData.videoWebSource);
            $("a#banner_vertical").attr('href', returnData.image);
            $("a#banner_vertical img").attr('src', returnData.image);
            $('a#banner_vertical').magnificPopup({type:'image'});
            $("a#dealBanner").attr('href', returnData.dealBanner);
            $("a#dealBanner img").attr('src', returnData.dealBanner);
            $('a#dealBanner').magnificPopup({type:'image'});
            $("a#vedioImage").attr('href', returnData.vedioImage);
            $("a#vedioImage img").attr('src', returnData.vedioImage);
            $('a#vedioImage').magnificPopup({type:'image'});
            $.each(returnData.postImage, function(index, value){
                $("ul#postImage").append('<li style="width: auto!important;"><div class="am-gallery-item"><img src=' + value.dealImage + ' style="width:auto;height:150px!important"/></div></li>');
            })
            $.each(returnData.detailImage, function(index, value){
                $("ul#detailImage").append('<li style="width: auto!important;"><div class="am-gallery-item"><img src=' + value.dealImage + ' style="width:auto;height:150px!important"/></div></li>');
            })
            $("#isEffect").text(returnData.isEffect?"是":"否")
        },
        error: function(xhr){
            alert('获取演出详情失败')
        }
    })



    $("#post-or-detail-file").fileinput({
        language: 'zh',
        uploadUrl: "/UpLoad/postAndDetail",
        allowedFileExtensions: ["png", "jpeg", "jpg"],
        dropZoneEnabled:false
    });

    $("#post-or-detail-file").on('fileuploaded', function(event, data, previewId, index) {
        var form = data.form,
            files = data.files,
            extra = data.extra,
            response = data.response,
            reader = data.reader;
            $("#edit-thumbnail-list").append('<div class="col-md-2">\
                <div class="thumbnail">\
                <img src="' + response.returnData.imgUrl[0] + '">\
                <button type="button" class="btn btn-xs btn-danger thumbnail-delete">\
                <span class="glyphicon glyphicon-remove"></span>\
                </button>\
                </div>\
                </div>')
    })

    jQuery.datetimepicker.setLocale('zh');

    $("#edit_start_time").datetimepicker({
        format:'Y-m-d H:i',
        step:1
    });

    $("#modify_deal_info_modal_btn").on('click', function(){
        if(typeof deal_info === 'undefined'){
            alert("演出信息未加载!");
        }else
        {
            $("#modify_deal_info_modal").modal();
            $("#select_cate_name option").filter(function() {
                //may want to use $.trim in here
                return $(this).text() == deal_info.cateName;
            }).prop('selected', true);

            $("#edit_deal_name").val(deal_info.name);
            $("#edit_start_time").val(deal_info.startTime.substring(0,16));
            $("#edit_city").val(deal_info.city);
            $("#edit_address").val(deal_info.address);
            $("#edit_video_web_source").val(deal_info.videoWebSource);

            var $radios = $('input:radio[name=edit_isEffect]');
            if($radios.is(':checked') === false) {
                $radios.filter('[value='+deal_info.isEffect+']').prop('checked', true);
            }
        }
    })

    $("button#deal_info_submit").on('click', function(){
        $("form#modify_deal_info_form").submit();
    })

    $("form#modify_deal_info_form").validator({
        submit: function() {
            var formValidity = this.isFormValid();

            if(formValidity){

                $.ajax({
                    url: '/Deal/updateDealInfo',
                    method: 'POST',
                    data: {
                        dealId: getParameterByName("dealId"),
                        cateName: $("#select_cate_name option:selected").text(),
                        name: $("#edit_deal_name").val(),
                        startTime: $("#edit_start_time").val(),
                        city: $("#edit_city").val(),
                        address: $("#edit_address").val(),
                        vedioWebSource: $("#edit_video_web_source").val(),
                        isEffect: $('input:radio[name=edit_isEffect]:checked').val()
                    },
                    success: function(data){
                        $.unblockUI();
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

    $("input#edit-banner-vertical,input#edit-deal-banner,input#edit-video-image").on('change', function(){
        var selectedFile = event.target.files[0];
        var _this = this;

        $("#upload_progress").css('width',0);
        $("#edit-single-image-modal").modal({});
        readURL(this, '#edit-banner-vertical-preview');

        $("#save-deal-image").on('click', function(){
            var formData = new FormData();
            formData.append('file', $(_this)[0].files[0]);
            formData.append('dealId', getParameterByName('dealId'));
            var requestUrl;

            if(_this == $("input#edit-banner-vertical")[0]){
                //演出封面
                requestUrl = '/UpLoad/Image';
            }else if(_this == $("input#edit-deal-banner")[0]){
                //演出封面（横图）
                requestUrl = '/UpLoad/dealBanner'
            }else if(_this == $("input#edit-video-image")[0]){
                //视频封面
                requestUrl = '/UpLoad/videoImage';
            }

            $.ajax({
                url: requestUrl,
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){
                        myXhr.upload.addEventListener('progress',function(e){
                            if(e.lengthComputable){
                                var max = e.total;
                                var current = e.loaded;

                                var Percentage = (current * 100)/max;
                                $("#upload_progress").width(Percentage+'%');
                            }
                        }, false);
                    }
                    return myXhr;
                },
                success: function (data) {
                    location.reload();
                },
                error: function(xhr){
                    alert('修改失败!');
                }
            });
        })
    })

    //演出海报
    $("#post-image-edit-btn").on('click', function(){
        $("#edit-post-image-modal").modal({});
        $("#edit-post-or-detail-image-modal-title").text("修改演出海报");

        $("#post-or-detail-file").fileinput('reset');
        $("#edit-thumbnail-list").empty();
        $.each(deal_info.postImage, function(index, value){
            $("#edit-thumbnail-list").append('<div class="col-md-2">\
                <div class="thumbnail">\
                <img src="'+ value.dealImage +'">\
                <button type="button" class="btn btn-xs btn-danger thumbnail-delete">\
                <span class="glyphicon glyphicon-remove"></span>\
                </button>\
                </div>\
                </div>')
        })

        updateGallerySortable();

        //保存
        $("button#save-post-or-detail-btn").on('click', function(){
            var modifyImgUrls = [];
            $.each($("#edit-thumbnail-list img"), function(index, value){
                modifyImgUrls[index] = $(value).attr('src');
            })

            $.ajax({
                url: '/UpLoad/postImageUrl',
                method: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    imageUrl: modifyImgUrls,
                    dealId: getParameterByName('dealId')
                }),
                success: function(data){
                    location.reload();
                },
                error: function(xhr){
                    alert('修改失败!');
                }
            })
        })
    })

    //演出详情
    $("#detail-image-edit-btn").on('click', function(){
        $("#edit-post-image-modal").modal({});
        $("#edit-post-or-detail-image-modal-title").text("修改演出详情");

        $("#post-or-detail-file").fileinput('reset');
        $("#edit-thumbnail-list").empty();
        $.each(deal_info.detailImage, function(index, value){
            $("#edit-thumbnail-list").append('<div class="col-md-2">\
                <div class="thumbnail">\
                <img src="'+ value.dealImage +'">\
                <button type="button" class="btn btn-xs btn-danger thumbnail-delete">\
                <span class="glyphicon glyphicon-remove"></span>\
                </button>\
                </div>\
                </div>')
        })

        updateGallerySortable();

        //保存
        $("button#save-post-or-detail-btn").on('click', function(){
            var modifyImgUrls = [];
            $.each($("#edit-thumbnail-list img"), function(index, value){
                modifyImgUrls[index] = $(value).attr('src');
            })

            $.ajax({
                url: '/UpLoad/DetailImageUrl',
                method: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    imageUrl: modifyImgUrls,
                    dealId: getParameterByName('dealId')
                }),
                success: function(data){
                    location.reload();
                },
                error: function(xhr){
                    alert('修改失败!');
                }
            })
        })
    })
})