/**
 * Created by sjh on 16/1/6.
 */
//添加页面
var tag = null;
var rowcontent = null;

if (sessionStorage.getItem('userId') == null) {
  if (sessionStorage.getItem('userName') == null) {
    location.href = 'login.html';
  }
} else {
  if (sessionStorage.getItem('userName') != null) {
    $('#u_name').html(sessionStorage.getItem('userName'));
  }
}

$('#logoutBtn').click(function(event) {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('userName'); 
  location.href = 'login.html';
});

$('#Add').click(function() {
  tag = "add";
  $('#showpanel').css('display', 'none');
  $('#addpanel').css('display', 'block');
});

$('#cancel').click(function() {
  $('#showpanel').css('display', 'block');
  $('#addpanel').css('display', 'none');
});

//checkbox全选
$("#checkAll").on("click", function() {
  if ($(this).prop("checked") === true) {
    $("input[name='checkList']").prop("checked", $(this).prop("checked"));
    $('#dealTable tbody tr').addClass('selected');
  } else {
    $("input[name='checkList']").prop("checked", false);
    $('#dealTable tbody tr').removeClass('selected');
  }
});
//检验选择了几个checkbox
function checkboxFun() {
  checks = $("input[name='checkList']");
  n = 0;
  for (i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      n++;
      x = i;
    }
  }
}
