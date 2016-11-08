var ls = window.localStorage;
var session = window.sessionStorage;
var ua = navigator.userAgent,
  isWx = ua.indexOf('MicroMessenger') > -1;
// 替换所有页面的click事件为fastclick
var fastclick_js = document.createElement('script');
fastclick_js.setAttribute('src', 'js/fastclick.js');
document.body.appendChild(fastclick_js);
window.onload = function() { FastClick.attach(document.body); };

(function() {
  //   var location = window.location;

  // 清除遗留的本地数据缓存
  if (ls.getItem('userId') != '') { ls.clear(); }

  //   // 手机号未注册
  //   if (session.getItem('phoneRegisted') != 'true') { 
  //     // 去绑定手机号 
  //     if (location.href.indexOf('bind.html') == -1) {
  //       if ((session.getItem('QQWXuserName') == '' || session.getItem('QQWXuserName') == null) 
  //         && session.getItem('flag') == 'success') {
  //         location.href = 'bind.html';
  //       }
  //     }
  //   } else {
  //     if (session.getItem('hasLogin') != 'true'){ 
  //       location.href = 'login.html';
  //     }
  //   }
})()

// var phoneBindCheck = function() {
//   var location = window.location;

//   // 清除遗留的本地数据缓存
//   if (ls.getItem('userId') != '') { ls.clear(); }

//   // 手机号未注册
//   if (session.getItem('phoneRegisted') != 'true') { 
//     // 去绑定手机号 
//     if (location.href.indexOf('bind.html') == -1) {
//       if ((session.getItem('QQWXuserName') == '' || session.getItem('QQWXuserName') == null) 
//         && session.getItem('flag') == 'success') {
//         location.href = 'bind.html';
//       }
//     }
//   } else {
//     if (session.getItem('hasLogin') != 'true'){ 
//       location.href = 'login.html';
//     }
//   }
// }

/**
 * 获取当前所在城市   
 */
var getLocation = function() {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 1000
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  } else {
    alert("您的浏览器不支持定位");
  }
};

function onSuccess(position) {
  var longitude = position.coords.longitude; // 经度      
  var latitude = position.coords.latitude; // 纬度 
  // 生成坐标点   
  var point = new BMap.Point(longitude, latitude);
  new BMap.Geocoder().getLocation(point, function(rs) {
    var addComp = rs.addressComponents;
    session.getLocation = 'success';
    session.setItem('curCity', addComp.city);
    // alert('定位成功:'+addComp.city);
  });
}

function onError(error) {
  switch (error.code) {
    case 1:
    case 2:
    case 3:
    case 4:
      session.getLocation = 'fali';
      session.setItem('curCity', '定位失败');
      // alert('定位失败');
      break;
  }
}

/**
 * 隐藏与显示
 * @param {Elements/Array} hideEles 要隐藏的元素
 * @param {Elements/Array} showEles 要显示的元素
 * @param {boolean} [animation] 是否开启动画
 */
function displayController(hideEles, showEles, animation) {
  animation = (animation == null || !animation) ? false : true;
  if (hideEles.length > 1) {
    for (i in hideEles) {
      animation ? hideEles[i].hide() : hideEles[i].hide();
    }
  } else {
    animation ? hideEles.hide() : hideEles.hide();
  }
  if (showEles.length > 1) {
    for (i in showEles) {
      animation ? showEles[i].show().addClass('am-animation-fade') : showEles[i].show();
    }
  } else {
    animation ? showEles.show().addClass('am-animation-fade') : showEles.show();
  }
}

/**
 * 提示信息显示与隐藏
 * @param {Element} tip 提示信息节点
 * @param {Function} Fuc 提示信息执行函数，直接传函数名即可，无需带参数。
 * @param {String} msg 提示信息   
 */
function tipShowHide(tip, Fuc, msg) {
  // tip.css('display', 'block');  
  // tip.addClass('am-animation-slide-top');               
  Fuc(tip, msg);
  // 提示信息显示时间倒计时          
  // setTimeout(function(){ 
  //   tip.css('display', 'none');                
  // }, 2000);      
}

/**  
 * 前台合法性错误提示     
 * @param {Element} tipEle 显示警告信息的节点                     
 * @param {String} warInfo 警告信息                   
 */
function warning(tipEle, warInfo) {
  tipEle.addClass('am-alert am-alert-warning am-animation-shake').css('margin', 0).alert().html(warInfo);
}

/**       
 * 后台逻辑性错误提示       
 * @param {Element} tipEle 显示错误信息的节点           
 * @param {String} errInfo 错误信息      
 */
function error(tipEle, errInfo) {
  tipEle.addClass('am-alert am-alert-danger am-animation-shake').css('margin', 0).alert().html(errInfo);
}

/**     
 * @param {Number} userId 用户ID 
 * @param {String} nickname 用户昵称       
 * @param {Number} sex 性别       
 * @param {String} phoneNum 手机号                 
 * @param {String} imgPath 头像路径   
 * @param {String} email 用户邮箱  
 */
var User = function(userId, nickname, sex, phoneNum, imgurl, email) {
  this.userId = userId;
  this.nickname = nickname;
  this.sex = sex;
  this.phoneNum = phoneNum;
  this.imgurl = imgurl;
  this.email = email;
};

/*******************************************   
 *
 * 基于原生JS的工具类       
 *  
 ******************************************/

/**
 * 获取请求url的参数
 * @param {String} name URL后缀的参数名
 */
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
  // if(r!=null)return r[2]; return null; 
}

/**           
 * 过滤两端空格
 * @param {String} str 要过滤的原字符串    
 * @return {String} 过滤后的字符串   
 */
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 触摸事件优先
 * 不可取的方案，会有点透bug
 * @return {boolean} 
 */
function clickEvent(event) {
  return ('ontouchend' in document.documentElement) ? 'touchend' : 'click';
}
