/**
 * Created by user on 2015/11/20.
 */
//全局语言设置
$.extend( true, $.fn.dataTable.defaults, {
    oLanguage: {
        oPaginate: {sFirst: "首页", sLast: "末页", sNext: "下页", sPrevious: "上页"},
        sEmptyTable: "表中数据为空",
        sInfo: "显示 _START_ 到 _END_ 共 _TOTAL_ 项结果",
        sInfoEmpty: "显示 0 到 0 共 0 项结果",
        sInfoFiltered: "(从 _MAX_ 项结果过滤)",
        sLengthMenu: "显示 _MENU_ 项结果",
        LoadingRecords: "加载中...",
        sProcessing: "正在处理中...",
        sSearch: "模糊查询:",
        sZeroRecords: "没有匹配结果"
    },
    sPaginationType: "full_numbers"

} );