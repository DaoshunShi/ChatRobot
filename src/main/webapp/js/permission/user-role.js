/**
 * Created by ss on 2017/4/21.
 */
window.userRole = window.userRole || {};
$mainTable = $('#user-role-table');
mainModal = 'user-role-modal';
mainForm = 'user-role-form';
modalTitle = 'userRoleModelTitle';
mainData = "";

$(function () {
    userRole.init()
});

userRole.init = function () {
    init_select('belongAcademy', selectAcademyAllUrl, null, null,null,jwcArr);
    userRoleTable();
    $('#btn-base-refresh').click(function () {
        var academy = $('#belongAcademy').find('option:selected').text();
        refreshStatus(academy);
    });
    $('#belongAcademy').on('rendered.bs.select', function (e) {
        var academy = $(e.currentTarget).find('option:selected').text();
        refreshStatus(academy);
    });

    $('#btn-base-edit').click(function () {
        var hrs = $mainTable.bootstrapTable('getSelections');
        if (hrs.length < 1) {
            layer.msg('请选择一行进行编辑'), {icon: 3};
            return;
        }
        if (hrs.length > 1) {
            layer.msg('每次只能编辑一条记录'), {icon: 3};
            return;
        }
        $('#' + modalTitle).html("选择角色");
        var hrs = $mainTable.bootstrapTable('getSelections');
        $('#user-number').val(hrs[0].number);
        $('#user-name').val(hrs[0].name);
        $('#user-academy').val(hrs[0].academyName);


        var params = {
            type: "POST",
            url: getAjaxUrl,
            dataType: "html",
            async: true,
            traditional: true,
            data: {id: hrs[0].number},
        }
        var options = {success: successFn2};
        ajax(params, options);

    });
    $('#btn-role-save').click(function () {
        //var checked = $("#"+mainModal+" :checked");
        //var  radioCheck = $('input:radio[name="role"]:checked').val();
       //var roleIdList = [];
       //roleIdList.push(radioCheck);
        /*$.each(checked, function () {
            roleIdList.push($.trim($(this).val()));
        });*/
        //id = $('#user-number').val();
        params = {id: $('#user-number').val(),idList: $('input:radio[name="role"]:checked').val()};
        executAjax(addAjaxUrl, refreshMainTable, params, request_post, "json");
    });
    $('#btn-role-close').click(function () {
        $('#' + mainModal).modal('hide');
    });
    $('#btn-search').click(function () {
        var thName = $('#th-name').val().trim();
        if (thName == '') {
            layer.msg('请输入教师姓名再查询！', {icon: 3});
            return;
        }
        executAjax(getUserRoleUrl, refreshMainTable, {
            academy:  null,
            word: thName
        }, request_post,'json');
    })
}

function successFn2(data, params) {
    var html = "";
    $.each($.parseJSON(data), function () {
        html = html + "<div>";
        html = html + "<label class='radio'>";//"<label class='checkbox'>";
        html = html + "<input type='radio' name='role' value='" + this.id + "'";//"<input type='checkbox' value='" + this.id + "'";

        if (this.marker!='0') {
            html = html + " checked='checked'";
        }

        html = html + "/>";
        html = html + this.name;
        html = html + "</label>";
        html = html + "</div>";
    });

    $('#'+mainModal).find('#modal-content').html(html);
    showModal(mainModal, null, addAjaxUrl, editTitleFlag, modalTitle);
}


function userRoleTable() {
    $mainTable.bootstrapTable({
        data: mainData,
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
        pageSize: 10,            //每页的记录行数（*）
        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
        strictSearch: true,
        clickToSelect: true,        //是否启用点击选中行
        singleSelect:true,          //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
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
            title: '用户名'
        }, {
            field: 'email',
            title: '邮箱'
        }, {
            field: 'status',
            title: '状态'
        }, {
            field: 'academyName',
            title: '所属学院'
        }, {
            field: 'roleNames',
            title: '拥有角色'
        }],
        onClickCell: function (field, value, row, $element) {

        },
        onLoadSuccess: function () {  //加载成功时执行

        },
        onLoadError: function () {  //加载失败时执行

        }
    });
   /* executAjax(getUserRoleUrl, refreshMainTable, {
        academy:  $('#belongAcademy').find('option:selected').text(),
        word: null
    }, request_post);*/
}

/**
 * 返回ajax请求返回的json数据，配合$.ajax用
 */
function refreshMainTable(data, status) {
    $("#"+mainModal).modal('hide');
    $mainTable.bootstrapTable('load', data);
}

function refreshStatus(academy) {
    executAjax(getUserRoleUrl, refreshMainTable, {
        academy: academy,
        word: null
    }, request_post, "json");
}