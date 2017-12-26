/**
 * Created by ss on 2017/4/21.
 */
window.rolePromission = window.rolePromission || {};
$mainTable = $('#role-permission-table');
mainModal = 'role-permission-modal';
mainForm = 'role-permission-form';
modalTitle = 'rolePermissionModelTitle';

$(function () {
    rolePromission.init()
});

rolePromission.init = function () {
    rolePermissionTable();

    $('#btn-base-refresh').click(function () {
        refreshBootstrapTable($mainTable);
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
            data: {id: hrs[0].id},
        }
        var options = {success: successFn2};
        ajax(params, options);

    });
    $('#btn-role-save').click(function () {
        var checked = $("#"+mainModal+" :checked");
        var roleIdList = [];
        $.each(checked, function () {
            roleIdList.push($.trim($(this).val()));
        });

        params = {id: $mainTable.bootstrapTable('getSelections')[0].id,idList:roleIdList };
        doAddOrEdit(params, '保存');
    });
    $('#btn-role-close').click(function () {
        $('#' + mainModal).modal('hide');
    });

    function successFn2(data, params) {//TODO 修改样式
        var html = "";
        $.each($.parseJSON(data), function () {
            html = html + "<div>";
            html = html + "<label class='checkbox'>";
            html = html + "<input type='checkbox' value='" + this.id + "'";

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



/*    $('#' + mainModal).on('hide.bs.modal', function () {
        document.getElementById(mainForm).reset();
    });*/
}
function doAddOrEdit(pm, action) {

    var params = {
        type: "POST",
        url: addAjaxUrl,
        dataType: "html",
        async: true,
        traditional: true,
        data: pm,
        action: action,
        redirectUrl: redirectUrl,
        modalId: mainModal
    }
    var options = {success: successDefaultFn};
    ajax(params, options);
}

function rolePermissionTable() {
    $mainTable.bootstrapTable({
        url: getPermissionDataUrl,
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
            field: 'name',
            title: '角色名称'
        }, {
            field: 'type',
            title: '角色类型'
        }, {
            field: 'permissionNames',
            title: '拥有权限'
        }],
        onClickCell: function (field, value, row, $element) {

        },
        onLoadSuccess: function () {  //加载成功时执行

        },
        onLoadError: function () {  //加载失败时执行

        }
    });
}