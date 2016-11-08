if (isWx) {
  var flag = window.sessionStorage.getItem('flag'),
    which = getQueryString('which');
  if (flag != 'success') { // 在微信中打开且微信未授权登陆
    $('.cover').show(); 
    location.href = '/user/WechatWebLogin?which=' + which;
  }
}

$(function() {
  var page = 1,
    isMore = true; //是否请求banner
  queryBirdData(isMore);
  $('.more').on('click', function() {
    queryBirdData(isMore);
  });

  function queryBirdData(flag) {
    $.ajax({
      url: '/vote/GBird',
      type: 'get',
      data: {
        cateId: 8,
        page: page++
      },
      success: function(data) {
        if (data.state == 'success') {
          var bannerStr = '',
            dealStr = '';
          var dealLength = data.object.deals.length;
          if (flag) {
            isMore = false;
            $.each(data.object.imageInfo, function(index) {
              var imgUrl = data.object.imageInfo[index].imageUrl ? data.object.imageInfo[index].imageUrl : 'javascript:;';
              bannerStr += '<li><a href="' + imgUrl + '"><img src="' + data.object.imageInfo[index].image + '"></a></li>';
            });
            $('#banner ul').html(bannerStr);
            $('.am-slider').flexslider({ directionNav: false, slideshowSpeed: 2000, animationSpeed: 500 }).css('opacity', 1);
          }
          if (dealLength !== 0) {
            $.each(data.object.deals, function(index) {
              dealStr += '<a href="microFilmDtl.html?dealName=' + encodeURI(encodeURI(data.object.deals[index].name)) + '&dealId=' + data.object.deals[index].dealId + '"><img src="' + data.object.deals[index].vedioImage + '"><div class="mask"><span>' + data.object.deals[index].name + '</span></div></a>';
            });
            $('.main').append(dealStr);
          } else {
            $('.more').html('没有更多');
          }
        } else {
          alert('网络错误');
        }
      },
      error: function() {
        alert('网络错误');
      }
    });
  }
});
