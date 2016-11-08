window.onload=function(){
var geolocation = new BMap.Geolocation();    
var gc = new BMap.Geocoder();     
geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量  
  
        if(this.getStatus() == BMAP_STATUS_SUCCESS)  
        {  //通过Geolocation类的getStatus()可以判断是否成功定位。  
            var pt = r.point;    
            gc.getLocation(pt, function(rs){    
                var addComp = rs.addressComponents;    
                // alert(addComp.city);
                $('#location').html(addComp.city);    
            });  
        }  
        else   
        {  
            //关于状态码    
            //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。    
            //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。    
            //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。    
            //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。    
            //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。    
            //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。    
            //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)    
            //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)    
            //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)    
            switch( this.getStatus() )  
            {  
                case 2:  
                    alert( '位置结果未知 获取位置失败.' );  
                break;  
                case 3:  
                    alert( '导航结果未知 获取位置失败..' );  
                break;  
                case 4:  
                    alert( '非法密钥 获取位置失败.' );  
                break;  
                case 5:  
                    alert( '对不起,非法请求位置  获取位置失败.' );  
                break;  
                case 6:  
                    alert( '对不起,当前 没有权限 获取位置失败.' );  
                break;  
                case 7:  
                    alert( '对不起,服务不可用 获取位置失败.' );  
                break;  
                case 8:  
                    alert( '对不起,请求超时 获取位置失败.' );  
                break;  
                  
            }  
        }          
  
    },  
    {enableHighAccuracy: true}  
)  
 }