$mainTable = $('#role-list-table');
mainModal = 'role-modal';
mainForm = 'role-form';
modalTitle = 'roleModelTitle';
so.init(function () {
    // 全选
    roleTable();
    $('#btn-base-refresh').click(function () {
        refreshBootstrapTable($mainTable);
    });
    $('#btn-base-add').click(function () {
        showModal(mainModal, mainForm, addAjaxUrl, addTitleFlag, modalTitle);
    });
    $('#btn-base-delete').click(function () {
        var hrs = $mainTable.bootstrapTable('getSelections');
        if (hrs.length < 1) {
            layer.msg('请选择一条或多条数据进行删除！', {icon: 2});
            return;
        }
        idList = getSelectIdList(hrs);
        layer.confirm('您确定要删除所选择记录吗？', {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                url: delAjaxUrl,
                traditional: true,  //阻止深度序列化，向后台传送数组
                data: {idList: idList},
                dataType: 'text',
                success: function (msg, textStatus) {
                    if (msg == 'success') {
                        layer.msg("删除成功！", {icon: 1});
                        refreshBootstrapTable($mainTable);
                    }
                }
            })
            layer.close(index);
        });

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
        showModal(mainModal, mainForm, addAjaxUrl, editTitleFlag, modalTitle);

    });
    $('#btn-role-save').click(function () {
        if ($('#role-name').val().trim() == '') {
            layer.msg('角色名称不可以为空', {icon: 2});
            return;
        }

        params = {id: $('#role-id').val(), name: $('#role-name').val().trim(), type: $('#role-type').val().trim()}
        doAddOrEdit(params, '保存');
    });
    $('#btn-role-close').click(function () {
        if($('#role-name').val().trim()==''){
            $('#' + mainModal).modal('hide');
        }
        else {
            layer.confirm('确定不保存修改数据，直接关闭当前窗口吗?', {icon: 3, title: '提示'}, function (index) {
                layer.close(index);
                $('#' + mainModal).modal('hide');
            });
        }
    });


    $('#' + mainModal).on('show.bs.modal', function () {

        if ($('#' + modalTitle).html().length == 2) {
            $('#' + modalTitle).html($('#' + modalTitle).html() + "用户角色");
        }
        if ($('#' + modalTitle).html().indexOf(addTitleFlag) != -1) {
            //init_add_modal_select();
        }
        else {
            var hrs = $mainTable.bootstrapTable('getSelections');
            $('#role-id').val(hrs[0].id);
            $('#role-name').val(hrs[0].name);
            $('#role-type').val(hrs[0].type);
        }
    });
    $('#' + mainModal).on('hide.bs.modal', function () {
        document.getElementById(mainForm).reset();
    });

});
    function doAddOrEdit(pm, action) {
        if ($('#role-name').val().trim() == '') {
            layer.msg('角色名称不可以为空', {icon: 2});
            return;
        }
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

    function roleTable() {
        $mainTable.bootstrapTable({
            url: getRoleDataUrl,
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
                field: 'name',
                title: '角色名称'
            }, {
                field: 'type',
                title: '角色类型'
            }],
            onClickCell: function (field, value, row, $element) {

            },
            onLoadSuccess: function () {  //加载成功时执行

            },
            onLoadError: function () {  //加载失败时执行

            }
        });
    }
