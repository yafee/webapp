$(function(){

	var seaPage = 1;     // 数据分页
	var paihangList = $('#paihang').find('ul');
	var more = $('.more');
	var moreBtn = more.find('a');

	// 抽取常量 
	var moreBtn_tip = {
		NORMAL: '点击查看更多 &raquo;',
		LOADING: '加载中...',
		NOMORE: '没有更多'
	}

	$('#searchTxt').focus();

	$('#searchBtn').on('click', function() { 
		seaPage = 1;
		paihangList.empty();   
		loadData(); 
	})

	more.on('click', function() { loadData(); })

	function loadData() {
		jQuery.ajax({
      url: '/project/search',
      type: 'GET',
      data: {keywords: $('#searchTxt').val(), page: seaPage++},
      beforeSend: function() { moreBtn.html(moreBtn_tip.LOADING); },
      success: function(data) {
        if (data.state == 'success') {
          console.log(data);
          if (!data.object || data.object.length == 0) {
          	moreBtn.html(moreBtn_tip.NOMORE);
          } else {
          	moreBtn.html(moreBtn_tip.NORMAL);
          	var content = '';
		        for (i in data.object) { 
		          var tempData = data.object[i],
		              stars = '',
		              j = k = 0,
		              len = tempData.star;           
		          for ( ; j < len; j++) {  
		            stars += "<img class='paihang-star' src='imgs/paihang/star-1@2x.png'>"; 
		          }
		          for ( ; k < (5 - len); k++) { 
		            stars += "<img class='paihang-star' src='imgs/paihang/star-2@2x.png'>"; 
		          } 
		          content += "<li class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'style='background:#202020;' onclick='support("+ tempData.dealId +");'><div class='am-u-sm-4 am-u-md-2 am-list-thumb' style='margin-top:-.5rem;'><img src='imgs/paihang/tupianjiazai-@2x.png' data-original='"+ tempData.image +"' class='am-img-responsive paihang-poster'/></div><div class='am-u-sm-8 am-u-md-10 am-list-main' style='padding-left:0rem;'><p class='paihang-title'>"+ tempData.name +"</p><img class='paihang-jiantou' src='imgs/paihang/xiayiji@2x.png'><div class='paihang-content'><span class='am-sans-serif'>目标"+ tempData.totalSupportCount +"</span><span class='am-sans-serif'>已筹"+ tempData.successSupportCount +"</span><span class='am-sans-serif'>剩余"+ tempData.restDays +"天</span></div>" + stars +"<a class='paihang-support am-sans-serif' href='javascript:void(0);'>立即支持</a></div></li>";
		        } 
		        paihangList.append(content);
		        // 懒加载
		        $(".paihang-poster").lazyload({ threshold: -50 });
          }
        } else {  
          alert(data.msg);
        }
      }
    })
	}

})

// 点击数据列表跳转事件 
function support(dealId) {
  var location = window.location;
  location.href = 'item.html?dealId=' + dealId;
}

// 页面加载完后关闭加载动画
$(window).load(function() { $('.loadingWrap').hide(); })
