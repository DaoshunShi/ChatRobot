/**
 * Created by ss on 2017/5/4.
 */
main={
    form:baseId+'-form',
    modal:baseId+'-modal',
    table:baseId+'-table',
    title:baseId+'ModelTitle',
    data:''
};
$mainTable = $('#'+main.table);
var mainModal = "upload-modal";
var uploadFile = "attachNameTeachers";
$(function(){
    initeTable();
    init_select('academy', selectAcademyAllUrl, null, null,null,jwcArr);
    inite_teacher_btn();
    initeOnFunction();
    initFileInput(uploadFile,fileUplaodUrl,mainModal);
    $('#'+main.modal).on('shown.bs.modal', function () {

        if($('#'+main.title).html().length==2) {
            $('#'+main.title).html($('#teacherModelTitle').html() + "教师");
        }
        if($('#'+main.title).html().indexOf(addTitleFlag)!=-1) {
            init_add_modal_select();
            $('#btn-modal-save').css('visibility','visible');
        }
        else{
            var hrs =$mainTable .bootstrapTable('getSelections');
            init_edit_modal_select(hrs);
            init_edit_modal_input(hrs);

            if($('#'+main.title).html().indexOf(lookTitleFlag)!=-1){
                $('#btn-modal-save').css('visibility','hidden');
            }
            else{
                $('#btn-modal-save').css('visibility','visible');
            }
        }
    });

    $('#'+main.modal).on('hide.bs.modal', function () {
        document.getElementById(main.form).reset();
        refreshBootstrapTable($mainTable);
    });

    $("button#btn-base-upload").click(function () {
        $('#upload-modal').modal("show");
    });

    $("button#btn-modal-upload").click(function () {
        var fileUpLoad = $('#'+uploadFile);
        fileUpLoad.fileinput('upload');
    });

    $("button#btn-modal-cancle").click(function () {
        $('#upload-modal').modal("hide");
    });

    $('#btn-modal-save').click(function () {

        if (isNullUndefineEmpty($('#name').val())) {
            layer.msg('姓名不可以为空!', {icon: 5})
            return;
        }
        if (isNullUndefineEmpty($('#modal-number').val())) {
            layer.msg('工号不可以为空!', {icon: 5})
            return;
        }
        if (isNullUndefineEmpty($('#academyName').val())) {
            layer.msg('学院不可以为空!', {icon: 5})
            return;
        }

        submitForm(main.form,'保存',main.modal);
    });
    $('#btn-modal-close').on('click',function () {
       $('#'+main.modal).modal('hide');
    });

    //测试代码
    $('#test-download').click(function () {
        $.fileDownload("/download/file", {
            data:{attachName: "123", attachPath: "/Users/denglinjie/image/d4e50a5d-ce5c-4811-b105-06b1fc632b04.pdf"},
            successCallback: function (url) {
                alert("success");
            },
            failCallback: function (html, url) {
                alert("fail");
            }
        })
    });

    //测试代码
    $('#test-download2').click(function () {
        $.fileDownload("/download/file", {
            data:{attachName: "123", attachPath: "/Users/denglinjie/image/d4e50a5d-ce5c-sdfsdf4811-b105-06b1fc632b04.pdf"},
            successCallback: function (url) {
                alert("success");
            },
            failCallback: function (html, url) {
                alert("fail");
            }
        })
    });
});

function inite_teacher_btn(){
    $('#btn-base-add').on('click',function (e) {
        showModal( main.modal, main.form, addAjaxUrl,  addTitleFlag,main.title);
    });
    $('#btn-base-edit').on('click',function (e) {
        var hrs =$mainTable.bootstrapTable('getSelections');
        if (hrs.length < 1) {
            layer.msg('请选择一条数据进行编辑！', {icon: 2});
            return;
        }
        if(hrs.length > 1){
            layer.msg('每次只能编辑一条数据！',{icon:2});
            return;
        }
        showModal( main.modal, main.form, addAjaxUrl,  editTitleFlag,main.title);
    });
    $('#btn-base-delete').on('click',function (e) {

        var hrs =$('#'+main.table) .bootstrapTable('getSelections');
        if (hrs.length < 1) {
            layer.msg('请选择一条或多条数据进行删除！', {icon: 2});
            return;
        }
        var idList=getSelectIdList(hrs);

        layer.confirm('您确定要删除所选择记录吗？', {icon: 3, title:'提示'}, function(index){

            $.ajax({
                url:delAjaxUrl,
                type:request_post,
                traditional: true,  //阻止深度序列化，向后台传送数组
                data:{idList:idList,academyName:$('#academy').find('option:selected').text()},
                dataType:'json',
                success:function(data,textStatus){
                    if(textStatus=="success")
                        refreshMainTable(data,textStatus);
                }
            })




            //deleteOrSubmit($('#'+main.table),getSelectIdList(hrs),null,delAjaxUrl);
            layer.close(index);
        });
    });
    $('#btn-base-refresh').on('click',function (e) {
        executAjax(getDataUrl, refreshMainTable, {
            academyName: $('#academy').find('option:selected').text(),
            majorName: null,
            number: null
        }, request_post);
    });
}

function submitForm(myForm,info,modal) {

    var form = $('#'+myForm);
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function (data,status) {
            if(data==null||data==""){
                $('#' + modal).modal('hide');
                layer.msg("保存失败!");
                
                
            }
            else {
                $('#' + modal).modal('hide');
                layer.msg("保存成功!");
            }
            refreshMainTable(data,status);
        }
    });
}

function init_add_modal_select() {
    init_select('academyName', selectAcademyAllUrl, null, $('#academy').find('option:selected').text(),null,jwcArr);
}

function init_edit_modal_select(hrs) {
    init_select('academyName', selectAcademyAllUrl, null, hrs[0].academyName,null,jwcArr);
}

function init_edit_modal_input(hrs) {
    $('#name').val(hrs[0].name);
    $('#teacher-id').val(hrs[0].id);
    $('#modal-number').val(hrs[0].number);
    $('#title').val(hrs[0].title);
    $('#sex').val(hrs[0].sex);
    $('#identityCard').val(hrs[0].identityCard);
    $('#phoneNumber').val(hrs[0].phoneNumber);
    $('#email').val(hrs[0].email);
}

function initeOnFunction() {
    $('#academy').on('rendered.bs.select', function (e) {
        var academy = $(e.currentTarget).find('option:selected').text();
        executAjax(getDataUrl, refreshMainTable, {
            academyName: academy,
            majorName: null,
            number: null
        }, request_post);
    });

    $('#btn-base-refresh').on('click',function (e) {
        var academy =  $('#academy').find('option:selected').text();
        executAjax(getDataUrl, refreshMainTable, {
            academyName: academy,
            majorName: null,
            number: null
        }, request_post);
    });

    $('#btn-search').on('click',function (e) {
        if($('#number').val().trim()==''){
            layer.msg("请输入教师工号");
            return;
        }

        executAjax(getDataUrl, refreshMainTable, {
            academyName: null,
            majorName: null,
            number: $('#number').val().trim()
        }, request_post);
    })


}

//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl,mainModal) {

    $('#'+ctrlName).on('filebatchuploadsuccess', function(event, data, previewId, index) {
        $('#' + mainModal).modal('hide');
        $('#btn-base-refresh').click();
        layer.msg("保存成功!");
    });

    $('#'+ctrlName).on('fileuploaderror', function(event, data, msg) {
        layer.msg(msg);
        $('#'+ctrlName).fileinput('clear');
    });

    var control = $('#' + ctrlName);

    control.fileinput({
        showPreview:true,
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        allowedPreviewTypes: ['image'],
        // uploadExtraData:function(previewId, index) {   //额外参数的关键点
        //     return getFileUploadExtraData();
        // },
        //allowedFileTypes: ['image'],
        allowedFileExtensions : ['xls', 'xlsx'],//接收的文件后缀
        showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-default", //按钮样式
        maxFileCount: 1,
        enctype: 'multipart/form-data',
        dropZoneEnabled: false,//是否显示拖拽区域
        validateInitialCount:true,
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值({m})！",
        uploadAsync: false, //默认异步上传
        maxFileSize: 50000,//单位为kb，如果为0表示不限制文件大小
    });
}


function initeTable() {
    $mainTable.bootstrapTable({
        data: main.data,
        method: 'get',           //请求方式（*）
        toolbar: '#toolbar',        //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,          //是否显示分页（*）
        sortable: false,           //是否启用排序
        sortOrder: "asc",          //排序方式
        queryParams: {},//传递参数（*）
        sidePagination: "client",      //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,            //初始化加载第一页，默认第一页
        pageSize: 20,            //每页的记录行数（*）
        pageList: [20, 40, 60, 80],    //可供选择的每页的行数（*）
        strictSearch: true,
        clickToSelect: true,        //是否启用点击选中行
        //height: 450,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",           //每一行的唯一标识，一般为主键列
        cardView: false,          //是否显示详细视图
        silent: true,
        detailView: false,
        columns: [{
            field: 'state',
            title: '选择',
            checkbox: true
        }, {
            field: 'id',
            title: '编号',
            visible: false
        }, {
            field: 'number',
            title: '工号'
        }, {
            field: 'name',
            title: '姓名'
        }, {
            field: 'academyName',
            title: '学院'
        }, {
            field: 'title',
            title: '职称'
        }, {
            field: 'sex',
            title: '性别'
        }, {
            field: 'email',
            title: '邮箱'
        }, {
            field: 'phoneNumber',
            title: '电话'
        },{
            field: 'loginTime',
            title: '上次登录时间',
            visible: false,
            formatter:function (value,row,index) {
                return ConvertTime(value);
            }
        }],
        onClickCell: function (field, value, row, $element) {

        },
        onLoadSuccess: function () {  //加载成功时执行

        },
        onLoadError: function () {  //加载失败时执行

        }
    });
   /* executAjax(getDataUrl, refreshMainTable, {
        academyName: null,
        majorName: null,
        number: null
    }, request_post);*/
}

function refreshMainTable(data, status) {
    $mainTable.bootstrapTable('load', data);
}