$(function(){
  $('.parnav div').click(function(){
    var z=$(this).index();
    $(this).addClass('nav-active').find('a').css('color','#1DBCD2');
    $(this).siblings().removeClass('nav-active').find('a').css('color','#fff');
    $('.partab').css('display','none').eq(z).css('display','block');
  });
  $('#tab3 ul li').click(function(){
    var z=$(this).index();
    $(this).find('p').addClass('nav1-active').siblings().removeClass('nav1-active');
    $('#tab3>div').css('display','none').eq(z).css('display','block');
    $('#tab3>img').attr('src','assets/i/'+(z+1)+'@2x.png');
  });
})
