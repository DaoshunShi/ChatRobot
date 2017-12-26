/**
 * Created by wd on 2017/5/2.
 */
window.literature = window.literature || {};
//var userNumber = userSession.userNumber;
var queryParams = {number: userNumber,navContent:$('#nav-content').text()};
var $mainTable = $('#literature_table');
var $checkTable =$('#check_table');
var uploadFile='attachNameLiterature';
var mainModal = 'literature-modal';
var mainModalForm = 'literature-form';
var attachNameDownloadId = 'attacheLiteratureDownLoad';
var modalTitle = 'literatureModelTitle';

literature.init = function () {
    init_main_table();
    init_button($mainTable,mainModal,mainModalForm,$checkTable,modalTitle);
    init_check_table();
    initFileInput(uploadFile,fileUplaodUrl,mainModal);

    $('#'+mainModal).on('shown.bs.modal', function () {

        if($('#'+modalTitle).html().length==2) {
            $('#'+modalTitle).html($('#'+modalTitle).html() + pidName);
        }
        if($('#'+modalTitle).html().indexOf(addTitleFlag)!=-1) {
            init_add_modal_select();
            $('#'+attachNameDownloadId).text('无');
            $('#'+attachNameDownloadId).attr('href','#');
            $('#btn-modal-save').css('visibility','visible');
            $('#'+uploadFile).fileinput('enable');
        }
        else{
            var hrs =$mainTable .bootstrapTable('getSelections');
            init_edit_modal_select(hrs);
            init_edit_modal_input(hrs);
            if(hrs[0].attachName!=""){
                $('#'+attachNameDownloadId).text(hrs[0].attachName);
                $('#'+attachNameDownloadId).attr('href',downloadfile + "?attachName=" + hrs[0].attachName + "&attachPath=" + hrs[0].attachPath);
            }
            else{
                $('#' + attachNameDownloadId).text('无');
                $('#' + attachNameDownloadId).attr('href', '#');
            }
            if($('#'+modalTitle).html().indexOf(lookTitleFlag)!=-1){
                $('#btn-modal-save').css('visibility','hidden');
                $('#'+uploadFile).fileinput('disable');
            }
            else{
                $('#btn-modal-save').css('visibility','visible');
                $('#'+uploadFile).fileinput('enable');

            }
        }
    });

    $('#'+mainModal).on('hide.bs.modal', function () {
        document.getElementById(mainModalForm).reset();
        refreshBootstrapTable($mainTable);
        $('#'+uploadFile).fileinput('clear');
    });


    $('#select-course-modal').on('show.bs.modal', function () {
        init_select('courseNameSelect', selectCourseUrl, getSelectCourseParams(), null);//初始化
    });

    $('#btn-modal-save').click(function () {
        if ($('#cnNameLiterature').val() == '') {
            layer.msg('中文名称不可以为空!', {icon: 5})
            return;
        }
        if ($('#enNameLiterature').val() == '') {
            layer.msg('英文名称不可以为空!', {icon: 5})
            return;
        }
        if ($('#achieveTypeLiterature').val() == '') {
            layer.msg('成果类型不可以为空!', {icon: 5})
            return;
        }
        if ($('#authorRankLiterature').val() == '') {
            layer.msg('作者排序不可以为空!', {icon: 5})
            return;
        }
        if($('#literatureNameLiterature').val()==''){
            layer.msg('期刊名称不可以为空!',{icon: 5})
            return;
        }
        if ($('#literatureLevelLiterature').val() == '') {
            layer.msg('期刊级别不可以为空!', {icon: 5})
            return;
        }
        if ($('#literatureTypeLiterature').val() == '') {
            layer.msg('体裁不可以为空!', {icon: 5})
            return;
        }
        if ($('#postedTimeLiterature').val() == '') {
            layer.msg('出版日期不可以为空!', {icon: 5})
            return;
        }
        if ($('#literatureCountryLiterature').val() == '') {
            layer.msg('出版国家不可以为空!', {icon: 5})
            return;
        }
        if ($('#literatureLanguageLiterature').val() == '') {
            layer.msg('语言不可以为空!', {icon: 5})
            return;
        }
        if ($('#postedNumberLiterature').val() == '') {
            layer.msg('国际出版书号不可以为空!', {icon: 5})
            return;
        }
        if ($('#literatureSumLiterature').val() == '') {
            layer.msg('总字数不可以为空!', {icon: 5})
            return;
        }
        if ($('#belongAcademyLiterature').val() == '') {
            layer.msg('归属学院不可以为空!', {icon: 5})
            return;
        }

        submitForm(mainModalForm,'保存',mainModal);
    });

    $('#btn-submit-confirm').click(function () {
        doSubmit($mainTable,'courseNameSelect',submitAjaxUrl,'select-course-modal') ;
    })

};

function submitForm(myForm,info,modal) {

    var form = $('#'+myForm);
    var fileUpLoad = $('#'+uploadFile);
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function (data) {
            if(data.length==undefined){
                if(data.errorMsg!=undefined){
                    layer.msg(data.errorMsg);
                    return;
                }
            }
            if(data.length!=36) {
                info = JSON.parse(data);
                if (info[0].defaultMessage != undefined) {
                    layer.msg(info[0].defaultMessage);
                    return;
                }
            }
            count = fileUpLoad.fileinput('getFilesCount');
            filePath = fileUpLoad.val();
            if(filePath!=''||count!=0){
                if(data!=null&&data!="") {
                    upId = data;
                    fileUpLoad.fileinput('upload');
                }
                else{
                    $('#' + modal).modal('hide');
                    layer.msg("保存失败!");
                }
            }
            else {
                $('#' + modal).modal('hide');
                layer.msg("保存成功!");
            }
            refreshBootstrapTable($mainTable)
        }
    });
}

function saveInfo() {
    var params = {
        cnName: $('#cnNameLiterature').val().trim()
    }
}

function init_add_modal_select() {
    init_select('authorRankLiterature', selectAuthorRankUrl, {pidName: pidName}, null);
    init_select('literatureLevelLiterature', selectRewardLevelAllUrl, null,null);
    init_select('belongAcademyLiterature', selectAcademyAllUrl, null, userAcademyName);
    init_select('literatureCountryLiterature', selectCountryAllUrl, null,null);
    init_select('literatureLanguageLiterature', selectLanguageAllUrl, null,null);
}

function init_edit_modal_select(hrs) {
    init_select('authorRankLiterature', selectAuthorRankUrl, {pidName: pidName}, hrs[0].authorRank);
    init_select('literatureLevelLiterature', selectRewardLevelAllUrl, null,hrs[0].literatureLevel);
    init_select('belongAcademyLiterature', selectAcademyAllUrl, null, hrs[0].belongAcademy);
    init_select('literatureCountryLiterature', selectCountryAllUrl, null,hrs[0].literatureCountry);
    init_select('literatureLanguageLiterature', selectLanguageAllUrl, null,hrs[0].literatureLanguage);
}

function init_edit_modal_input(hrs) {
    $('#cnNameLiterature').val(hrs[0].cnName);
    $('#enNameLiterature').val(hrs[0].enName);
    $('#literature-id').val(hrs[0].id);
    $('#literatureTypeLiterature').val(hrs[0].literatureType);
    $('#literatureNameLiterature').val(hrs[0].literatureName);
    $('#postedTimeLiterature').val(hrs[0].postedTime);
    $('#postedNumberLiterature').val(hrs[0].postedNumber);
    $('#literatureSumLiterature').val(hrs[0].literatureSum);
    $('#commentLiterature').val(hrs[0].comment);
    //TODO 加上传文件 的信息
}
function init_check_modal_input(hrs) {
    $('#cnNameCheck').val(hrs[0].cnName);
    $('#achieveTypeCheck').val(hrs[0].achieveType);

}

function getSelectCourseParams() {
    var hrs = $mainTable.bootstrapTable('getSelections');
    var params = {achieveType: hrs[0].achieveType, classify_level: hrs[0].literatureLevel, classify_type:null};
    return params;
}

$(function () {
    literature.init()
});

/**
 * 初始化bootstarpTable
 */
function init_main_table() {
    $mainTable.bootstrapTable({
        url: dataUrl,
        method: 'get',           //请求方式（*）
        toolbar: '#toolbar',        //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,          //是否显示分页（*）
        sortable: false,           //是否启用排序
        sortOrder: "asc",          //排序方式
        queryParams: queryParams,//传递参数（*）
        //sidePagination: "client",      //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,            //初始化加载第一页，默认第一页
        pageSize: 10,            //每页的记录行数（*）
        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
        strictSearch: true,
        clickToSelect: true,        //是否启用点击选中行
        //height: 450,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        singleSelect:true,
        uniqueId: "id",           //每一行的唯一标识，一般为主键列
        cardView: false,          //是否显示详细视图
        silent: true,
        detailView: false,
        columns: [{
            field: 'state',
            title:'选择',
            checkbox: true
        }, {
            field: 'id',
            title: '编号',
            visible: false
        }, {
            field: 'cnName',
            title: '项目名称',
            cellStyle: getTitleStyle()
        },  {field: 'enName',title:'英文名称'},
            {field: 'achieveType', title: '成果类型'},
            {field: 'authorRank', title: '作者排序'},
            {field: 'postedTime', title: '出版日期'},
            {field: 'literatureType', title:'体裁'},
            {field: 'literatureName', title: '报刊名称'},
            {field: 'literatureLevel', title: '报刊级别'},
            {                 field: 'status', title: '成果状态',                 cellStyle: function (value, row, index, field) {                     return getStatusStyle(value, row, index, field);                 }             },
            {field: 'comment', title: '成果说明'},
            {field: 'attachName', title: '附件名称'},
            {field: 'belongAcademy', title: '归属学院'},
            {field: 'courseName', title: '课程名称'},
            {field:'score',title:'学分',formatter:function (value,row,index) {
                return displayScore(value,row,index);
            }}
        ],
        onClickCell: function (field, value, row, $element) {
            if(field=='cnName') {
                showModal( mainModal, null, null,  lookTitleFlag,modalTitle);
            }
        }
    });
}
