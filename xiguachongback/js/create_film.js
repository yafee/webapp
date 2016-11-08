function uploadSingleFile(inputSelector, successCallback){
    var files =  $(inputSelector)[0].files;
    if(files.length == 0){
        alert("请选择上传图片!");
    }else if(files[0].size > 400*1024) {
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

$(function(){
    $(document).ajaxStop($.unblockUI);
    var film_image_url;

    $("#film_banner").on('change', function(){
        if($(this)[0].files.length == 0){
            banner_vertical_url = '';
            $("#film_banner_btn").attr('disabled','disabled');
        }else{
            $("#film_banner_btn").removeAttr('disabled');
        }
    })

    $("#film_banner_btn").on('click', function(){
        uploadSingleFile('#film_banner', function(imgUrl){
            film_image_url = imgUrl;
            $("#film_banner_btn").attr('disabled','disabled');
        })
    })

    $("form#create_film_form").validator({
        submit: function() {
            var formValidity = this.isFormValid();

            if(formValidity){
                if(!film_image_url){
                    alert("视频封面尚未上传!");
                }else{
                    $.blockUI({ message: '创建中...' });
                    $.ajax({
                        method: 'POST',
                        url: '/VoteBk/addBird',
                        data: {
                            vedioImage: film_image_url,
                            name: $("#film_name").val(),
                            director: $("#film_director").val(),
                            staring: $("#film_performer").val(),
                            filmIntroduction: $("#film_introduction").val(),
                            vedioWebSource: $("#film_video_url").val()
                        },
                        success: function(){
                            alert('添加成功');
                            location.reload();
                        },
                        error:function(){
                            alert('添加失败!');
                        }
                    })
                }
            }

            return false;
        }
    })
})