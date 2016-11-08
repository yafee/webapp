$.extend( $.fn.dataTable.defaults, {
    searching: true,                   //是否允许Datatables开启本地搜索
    ordering:  false,                  //是否允许Datatables开启排序
    scrollX:true,                      //设置水平滚动
    scrollY: 400,                      //设置垂直滚动
    scrollCollapse: true,
    pagingType: "full_numbers",        //分页设置
    processing: true,                  //是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
    serverSide: true,                  //是否开启服务器模式
    displayLength: 10,                 //是否开启服务器模式
    stateSave: true                    //保存状态 - 在页面重新加载的时候恢复状态（页码等内容）
} );