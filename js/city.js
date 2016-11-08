$(function(){
	var imgPathNotChecked = "imgs/city/待选@2x.png";
	var imgPathChecked = "imgs/city/已选@2x.png";
	// var city = decodeURI(getQueryString('city'));
	$('#location').html(session.getItem('curCity'));
	// 获取城市列表
	$.get('/getCity/getSomeCity',function(data){
		for( i in data.object ){
			for( j=0; j<26; j++ ){
				if( $( '#content .list span').eq(j).html() == data.object[i].py.charAt(0).toUpperCase() ){
					$('#content .list ul').eq(j).append("<li>"+data.object[i].name+
					"<img src='imgs/city/待选@2x.png'></li>");
				}
			}
		}
		$('#content .list ul').each(function(){
			if($(this).children('li').length == 0){
				$(this).css('display','none');
				var k = $(this).index();
				$('#content .index li').eq(k).css('display','none');
			}
		});
	});
	$('.index li').click(function(){
		$('.index li').css('background','#292929');
		$(this).css('background','#000');
	})
	changeCity(imgPathNotChecked, imgPathChecked);

})

/**
 * 城市选择
 * @param  {string} imgPathNotChecked 未选中图片路径
 * @param  {[type]} imgPathChecked    选中图片的路径
 */
function changeCity(imgPathNotChecked, imgPathChecked){
	// 城市选择事件
	$("#content").delegate('li','click',function(){
		var radio = $(this).children("img");
		if(radio.length > 0){
			if(radio.attr("src") == imgPathNotChecked){
				// 清除已选的城市
				$("#content ul li").each(function(index){
					if($(this).children("img").attr("src") == imgPathChecked){
						$(this).children("img").attr("src", imgPathNotChecked);
					}
				})
				radio.attr("src", imgPathChecked);
			}else if(radio.attr("src") == imgPathChecked){
				radio.attr("src", imgPathNotChecked);
			}
			session.hasChangeCity = 'true';
			session.setItem('newCity', $(this).text());
			var timer = setTimeout(function(){
				window.location.href = 'index.html';
			}, 100);
		}
	})
}

$(window).load(function(){ $('.loadingWrap').hide(); });
