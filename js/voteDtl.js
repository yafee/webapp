$(function() {
  queryVoteData();

  function queryVoteData() {
    var listLeft = $('.listLeft'),
      listRight = $('.listRight');
    $.ajax({
      url: '/vote/allVoteDetail',
      type: 'get',
      data: { page: 1 },
      timeout: 20000,
      dataType: 'json',
      success: function(data) {
        if (data.state === 'success') {
          console.time('begin');
          var tempData = data.object,
            box;
          $.each(tempData, function(index) {
            box = $('<div></div>').addClass('box').html('<img src="' + tempData[index].vedioImage + '"><div class="movieName">' + tempData[index].name + '/' + tempData[index].director + '</div><div class="am-text-right voteNum">当前票数:&nbsp;<span>' + tempData[index].totalNumber + '</span></div>');
            if (index % 2 === 0) {
              listLeft.append(box);
            } else {
              listRight.append(box);
            }
          });
        }
      },
      error: function(data, textStatus) {
        if (textStatus == 'timeout') {
          alert('网络超时');
        }
      }
    });
  }
});
