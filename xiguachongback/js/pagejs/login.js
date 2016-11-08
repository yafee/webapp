$(function() {

  if (localStorage.getItem('usr') != null) {
    if (localStorage.getItem('pwd') != null) {
      $('#adm_name').val(localStorage.getItem('usr'));
      $('#password').val(localStorage.getItem('pwd'));
    }
  }

  $('#remember').click(function(event) {
    if ($(this).attr('checked')) {
      $(this).removeAttr('checked');
    } else {
      $(this).attr('checked', true);
    }
  });

  $('#login').click(function(event) {
    if ($('#remember').attr('checked') == 'checked') {
      localStorage.setItem('usr', $.trim($('#adm_name').val()));
      localStorage.setItem('pwd', $.trim($('#password').val()));
    } else {
      localStorage.removeItem('usr');
      localStorage.removeItem('pwd');
    }

    if (!$.trim($('#adm_name').val()).match(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)) {
      alert('账号只能是数字、字母、下划线');
      return false;
    } else if ($.trim($('#password').val()).length < 6) {
      alert('密码至少六位');
      return false;
    } else {
      $.post('/admin/login', { userName: $.trim($('#adm_name').val()), password: $.trim($('#password').val()) },
        function(data){   
        	if (data.totalNumber == 0) {
        		alert(data.returnData);
        	} else if (data.totalNumber == 1) {
            sessionStorage.setItem('userId', data.returnData.userId);
            sessionStorage.setItem('userName', data.returnData.userName);
        		location.href = 'user.html';
        	}
        })
    }
  })

})
