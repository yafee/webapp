/**
 * Created by vaio on 2015/10/22.
 */
$(document).ready(function(){
    //$('#advTable').DataTable({
    //    processing: true,
    //    serverSide: true,
    //    ajax:[{
    //        url:"http://www.datatables.net/examples/server_side/scripts/server_processing.php",
    //        dataType:"jsonp",
    //    }]
    //
    //});

    $('#advTable').DataTable({
        ajax:"",
        columnDefs: [ {
            targets: 0,
            orderable: null
        },{
            targets: 1,
            visible: false
        }],

        "columns":[{
            title:"<input type='checkbox' id='checkAll'/>",
            data: null,
            "createdCell": function(nTd,sData,oData,iRow,iCol){
                $(nTd).html("<input type='checkbox' name='checkList' value='"+sData+"'>")  ;
            }
        },{
            data:'id',
            title:'ID'
        },{
            data:'tmpl',
            title:'tmpl'
        },{
            data:'advId',
            title:'广告ID'
        },{
            data:'code',
            title:'代码'
        },{
            data:'isEffect',
            title:'是否生效'
        },{
            data:'name',
            title:'名称'
        },{
            data:'relId',
            title:'关系ID'
        },{
            data:'rel_Table',
            title:'关系表'
        }]
    });

});

//点击添加按钮，表格消失，添加界面显示
$('#Add').click(function () {
    $('#showpanel').css('display','none');
    $('#addpanel').css('display','block');
});