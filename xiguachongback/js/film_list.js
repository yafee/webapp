function getFilmList(page, cb){
    $.ajax({
        method: 'GET',
        url: '/VoteBk/showBird',
        data: {
            page: page
        },
        success: function(data){
            $("#film_list").empty();
            $.each(data.returnData, function(index, value){
                $("#film_list").append('<tr>\
                    <td><img src="' + value.vedioImage +'" alt="" width="100" height="100"></td>\
                    <td>' + value.name + '</td>\
                    <td>' + value.director + '</td>\
                    <td>' + value.staring + '</td>\
                    <td>' + value.filmIntroduction + '</td>\
                    <td>' + $('<div />').text(value.vedioWebSource).html() + '</td>\
                    <td><button role="modify_film">编辑</button><button role="delete_film">删除</button></td>\
                    </tr>');
            })

            var page = getUrlParameter('page') ? getUrlParameter('page'):1;
            $("div#pagination").page({
                pages: Math.ceil(data.totalNumber/10),
                first: "首页",
                last: "尾页",
                prev: '<', //若不显示，设置false即可，默认为上一页
                next: '>', //若不显示，设置false即可，默认为下一页
                groups: 10,
                curr:page,
                jump:"/xiguachongback/film_list.html?page=%page%"
            });

            cb(data.returnData);
        },
        error: function(err){
            alert('获取失败');
        }
    })
}

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

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(function(){
    var film_lists;
    var selected_video_image;
    var selected_deal_id;

    $(document).ajaxStop($.unblockUI);

    var page = getUrlParameter('page') ? getUrlParameter('page'):1;
    getFilmList(page, function(data){
        film_lists = data;
    })

    $("#film_banner").on('change', function(){
        if($(this)[0].files.length == 0){
            selected_video_image = '';
            $("#film_banner_btn").attr('disabled','disabled');
        }else{
            $("#film_banner_btn").removeAttr('disabled');
        }
    })

    $("#film_banner_btn").on('click', function(){
        uploadSingleFile('#film_banner', function(imgUrl){
            selected_video_image = imgUrl;
            $("#film_banner_btn").attr('disabled','disabled');
        })
    })

    $('#film_list').delegate('button[role=delete_film]', 'click', function(){
        var index = $(this).parent().parent().index();
        var result = confirm('确认删除该记录?');
        if(result){
            $.blockUI({ message: '删除中...' });
            $.ajax({
                method: 'POST',
                url: '/VoteBk/deleteBird',
                data: {
                    dealId: film_lists[index].dealId
                },
                success: function(){
                    alert('删除成功');
                    window.location.href = '/xiguachongback/film_list.html';
                },
                error: function(){
                    alert('删除失败')
                }
            })
        }
    })

    $('#film_list').delegate('button[role=modify_film]', 'click', function() {
        var index = $(this).parent().parent().index();

        $("#film_name").val(film_lists[index].name);
        $("#film_director").val(film_lists[index].director);
        $("#film_performer").val(film_lists[index].staring);
        $("#film_introduction").val(film_lists[index].filmIntroduction);
        $("#film_video_url").val(film_lists[index].vedioWebSource);
        selected_video_image = film_lists[index].vedioImage;
        selected_deal_id = film_lists[index].dealId;
        $('#modify-film-modal').modal({
            height:700
        })
    })

    $("form#modify_film_form").validator({
        submit: function() {
            var formValidity = this.isFormValid();

            if(formValidity){
                if(!selected_video_image){
                    alert("视频封面尚未上传!");
                }else{
                    $.blockUI({ message: '更新中...' });
                    $.ajax({
                        method: 'POST',
                        url: '/VoteBk/updateBird',
                        data: {
                            dealId: selected_deal_id,
                            vedioImage: selected_video_image,
                            name: $("#film_name").val(),
                            director: $("#film_director").val(),
                            staring: $("#film_performer").val(),
                            filmIntroduction: $("#film_introduction").val(),
                            vedioWebSource: $("#film_video_url").val()
                        },
                        success: function(){
                            alert('更新成功');
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