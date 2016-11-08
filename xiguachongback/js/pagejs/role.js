/**
 * Created by vaio on 2015/10/22.
 */
$(document).ready(function(){
    $('#roleTable').DataTable({

        columnDefs: [ {
            targets: 0,
            orderable: null
        },{
            targets: 1,
            visible: false
        }],
        columns:[{
            title:"<input type='checkbox' id='checkAll'/>",
            data: null,
            "createdCell": function(nTd,sData){
                $(nTd).html("<input type='checkbox' name='checkList' value='"+sData+"'>")  ;
            }
        },{
            data:'id',
            title:'ID'
        },{
            data:'name',
            title:'名称'
        },{
            data:'isEffect',
            title:'是否生效'
        },{
            data:'isDelete',
            title:'是否删除'
        }]
    });
});


