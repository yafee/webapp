function updateGallerySortable(){

    Sortable.create(document.getElementById('banner_img_list'), {
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

$(function(){
    $(document).ajaxStop($.unblockUI);

    $.ajax({
        method: 'GET',
        url: '/UpLoad/banner',
        success: function(data){
            $.each(data.returnData.banner, function(index, val){
                $("#banner_img_list").append('<div class="col-md-2">\
                <div class="thumbnail">\
                <img src="' + val + '">\
                <button type="button" class="btn btn-xs btn-danger thumbnail-delete">\
                <span class="glyphicon glyphicon-remove"></span>\
                </button>\
                </div>\
                </div>');
            })

            updateGallerySortable();
        },
        error: function(){
            alert('获取演出横幅失败!');
        }
    })

    $("#save_banner").on('click', function(){
        if($("#banner_img_list img").length !=3){
            alert("演出横幅图片数量必须是三张!")
        }else {
            var imageUrls = [];
            $.each($("#banner_img_list img"), function(index, values){
                imageUrls[index] = $(values).attr('src');
            })
            $.blockUI({ message: '修改中...' });
            $.ajax({
                method: 'POST',
                url: '/UpLoad/updateBanner',
                contentType: "application/json",
                data: JSON.stringify({
                    imageUrl: imageUrls
                }),
                success: function (data) {
                    alert('修改成功');
                    location.reload();
                },
                error: function () {
                    alert('修改失败');
                }
            })
        }
    })

    $("#banner-image").fileinput({
        language: 'zh',
        uploadUrl: "/UpLoad/postAndDetail",
        allowedFileExtensions: ["png", "jpeg", "jpg"],
        dropZoneEnabled:false
    }).on('fileuploaded', function(event, data, previewId, index) {
        var form = data.form,
            files = data.files,
            extra = data.extra,
            response = data.response,
            reader = data.reader;

        $("#banner_img_list").append('<li>\
                <div class="am-gallery-item">\
                <a href="' + response.returnData.imgUrl[0] + '" class="">\
                <img src="' + response.returnData.imgUrl[0] + '"/>\
                </a>\
                <button type="button" class="am-btn am-btn-danger am-round">删除</button>\
                </div>\
                </li>')
        updateGallerySortable();
    })
})