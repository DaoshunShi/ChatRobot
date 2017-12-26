(function ($) {
    'use strict';


    $(function () {
        $(".datepicker").datetimepicker({
            locale: moment.locale('zh-cn'),
            ignoreReadonly:true,
            format: 'YYYY-MM-DD'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
        });
        $('.uploadAlert').text(uploadAlert);


        $('ul li').click(function(){
             var liContent = $(this).text();

        });


      /*  var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function () {
            $.AMUI.fullscreen.toggle();
        });

        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function () {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });*/


    });
})(jQuery);

/**
 * @author sojson.com
 * @ps 你可以当作是一个闭包 | 封装的Demo
 */
(function (o, w) {
    if (!w.so)w.so = {};
    return (function (so) {
        so.$1 = !0,//true
            so.$0 = !1;//false
        /**
         * 全选
         */
        so.checkBoxInit = function (prentCheckbox, childCheckbox) {
            childCheckbox = o(childCheckbox), prentCheckbox = o(prentCheckbox);
            //先取消全选。
            //childCheckbox.add(prentCheckbox).attr('checked',!1);
            //全选
            prentCheckbox.on('click', function () {
                childCheckbox.attr('checked', this.checked);
            });
            //子选择
            childCheckbox.on('click', function () {
                prentCheckbox.attr('checked', childCheckbox.length === childCheckbox.end().find(':checked').not(prentCheckbox).length);
            });
        },
            //初始化
            so.init = function (fn) {
                o(function () {
                    fn()
                });
            }
        so.id = function (id) {
            return o('#' + id);
        }
        so.default = function () {
        }

    })(so);
})($, window);

/**
 * ajax请求封装
 *
 * @param params
 * @param options
 */
function ajax(params, options) {
    $.ajax({
        type: params.type,
        url: params.url,
        dataType: params.dataType,
        async: params.async,
        traditional: params.traditional,
        data: params.data,
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data) {
            if (options.success) {
                options.success(data, params);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // 完成
            if (options.complete) {
                options.complete(XMLHttpRequest, textStatus);
            }
        },
        error: function (error) {
            // 错误处理
            if (options.error) {
                options.error(error);
            }
        }
    });
}

/**
 * 判断所选记录是否已经审核
 * @param selectRows
 * @returns {开始审核,已提交,未提交}
 */
function checkStatus(selectRows) {
    for (var i=0;i<selectRows.length;i++){
        if(selectRows[i].status.indexOf(isChecking)!=-1||selectRows[i].status.indexOf(overCheck)!=-1){
            return isChecking;
        }
        if(selectRows[i].status.indexOf(hasSubmit)!=-1){
            return hasSubmit;
        }
        if(selectRows[i].status.indexOf(hasReject)!=-1){
            return unSubmit;
        }
    }
    return unSubmit;
}


//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl,mainModal) {

    $('#'+ctrlName).on('filebatchuploadsuccess', function(event, data, previewId, index) {
        $('#' + mainModal).modal('hide');
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
        uploadExtraData:function(previewId, index) {   //额外参数的关键点
            return getFileUploadExtraData();
        },
        //allowedFileTypes: ['image'],
        allowedFileExtensions : ['jpg', 'png','gif','pdf','bmp'],//接收的文件后缀
        showUpload : false,
        showRemove : false,
        //showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-default", //按钮样式
        maxFileCount: 1,
        enctype: 'multipart/form-data',
        dropZoneEnabled: false,//是否显示拖拽区域
        validateInitialCount:true,
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值({m})！",
        uploadAsync: false, //默认异步上传
        maxFileSize: 5000,//单位为kb，如果为0表示不限制文件大小
        layoutTemplates:{
            actionUpload:''
        }
    });
}
/**
 * 获取选中行idList
 * @param hrs 选中行
 * @returns {Array}
 */
function getSelectIdList(hrs) {
    var idList = [];
    for (var i=0;i<hrs.length;i++){
        idList.push(hrs[i].id);
    }
    return idList;
}

/**
 * 删除或提交封装
 * @param idList
 * @param url
 */
function deleteOrSubmit(mainTable,idList,courseId,url,modal) {
    $.ajax({
        url:url,
        type:request_post,
        traditional: true,  //阻止深度序列化，向后台传送数组
        data:{idList:idList,courseId:courseId},
        dataType:'text',
        success:function(msg,textStatus){
            if(!courseId) {
                layer.msg("删除" + msg + "条记录成功！", {icon: 1});
            }
            else{
                $('#'+modal).modal('hide');
                layer.msg("提交成功！",{icon:1});
            }
            if(textStatus=="success")
                refreshBootstrapTable(mainTable);
        }
    })
}

/**
 * 执行提交
 * @param mainTable
 * @param url
 */
function toSubmit(mainTable,url) {
    var hrs =mainTable .bootstrapTable('getSelections');
    if (hrs.length < 1) {
        layer.msg('请选择一条数据进行提交！', {icon: 2});
        return;
    }
    if(hrs.length > 1){
        layer.msg('每次只能提交一条数据！',{icon:2});
        return;
    }
    if(checkStatus(hrs)!=unSubmit){
        layer.msg('所选择记录已提交,不可以再次提交！', {icon: 2});
        return;
    }
    if(isNullUndefineEmpty(hrs[0].attachName)){
        layer.msg('所选记录没有上传附件，请先编辑上传附件再提交！', {icon: 2});
        return;
    }
           showModal("select-course-modal",'select-course-form', url,"选择课程", 'selectCourseModalTitle');
}

function doSubmit(mainTable,selectNameId,url,selectModalId) {
    var hrs = mainTable.bootstrapTable('getSelections');
    var cs = $('#'+selectNameId).val();
    if (!isNullUndefineEmpty(cs)) {
        deleteOrSubmit(mainTable, getSelectIdList(hrs), $('#courseNameSelect').val(), url, selectModalId);
    }
    else{
        layer.msg(submitAlert);
    }
}


/**
 * 执行编辑
 * @param mainTable
 * @param url
 */
function toEdit(mainTable,editAjaxUrl,mainModalId,mainFormId,modalTitleId) {
    var hrs =mainTable .bootstrapTable('getSelections');
    if (hrs.length < 1) {
        layer.msg('请选择一条数据进行编辑！', {icon: 2});
        return;
    }
    if(hrs.length > 1){
        layer.msg('每次只能编辑一条数据！',{icon:2});
        return;
    }
    var status =checkStatus(hrs);
    if(status!=unSubmit&&status!=hasReject){
        layer.msg('所选择记录已提交,不可以编辑！', {icon: 2});
        return;
    }
    showModal( mainModalId, mainFormId, editAjaxUrl,  editTitleFlag,modalTitleId);
    //showModal("edit-modal", null, editAjaxUrl, null, "编辑");
    //deleteOrSubmit(mainTable,getSelectIdList(hrs),url);
}

/**
 * 执行删除
 * @param mainTable
 * @param url
 */
function toDelete(mainTable,url) {
    var hrs =mainTable .bootstrapTable('getSelections');
    if (hrs.length < 1) {
        layer.msg('请选择一条或多条数据进行删除！', {icon: 2});
        return;
    }
    if(checkStatus(hrs)==isChecking){
        layer.msg('您提交的记录包含已经开始审核的记录，无法删除！', {icon: 2});
        return;
    }
    layer.confirm('您确定要删除所选择记录吗？', {icon: 3, title:'提示'}, function(index){
        deleteOrSubmit(mainTable,getSelectIdList(hrs),null,url);
        layer.close(index);
    });
}
/**
 * 查看审核状态
 * @param mainTable
 * @param url
 */
function toCheck(mainTable,url) {
    var hrs =mainTable.bootstrapTable('getSelections');
    if (hrs.length < 1) {
        layer.msg('请选择一条数据进行查看！', {icon: 2});
        return;
    }
    if(hrs.length > 1){
        layer.msg('每次只能查看一条数据！',{icon:2});
        return;
    }
    if(checkStatus(hrs)==unSubmit||checkStatus(hrs)==hasSubmit){
        layer.msg('所选记录还没有开始审核！', {icon: 2});
        return;
    }
    init_check_modal_input(hrs);
    executAjax(checkAjaxUrl,getAjaxJsonData,{id: hrs[0].id},request_get);
    //get_checkTable_data(hrs[0].id);
    //layer.msg(checkTableData);

}

/**
 * 刷新Table
 * @param b_table
 */
function refreshBootstrapTable(b_table) {
    b_table.bootstrapTable('refresh');
}

/**
 * 打开modal
 * @param modalId
 */
function showModal(modalId,formId,formAction,formTitle,titleId) {
    var $myModal =$('#' + modalId);
    var $myForm;
    if(!isNullUndefineEmpty(formId)) {
        $myForm = $('#' + formId);
        $myForm.attr("action", formAction);
    }
    $('#'+titleId).html(formTitle);
    $myModal.modal('show');

}

function successFn(data, params) {
    if (data == "success") {
        $('#option-status-modal').find('.am-modal-bd').text(params.action + '成功！');
    } else {
        $('#option-status-modal').find('.am-modal-bd').text(params.action + '失败！');
    }
    $('#' + params.modalId).modal("close");
    $('#option-status-modal').modal("open");
    setTimeout('$("#option-status-modal").modal("close")', 1000);
    setTimeout(function () {
        window.location.href = params.redirectUrl;
    }, 1500);
}

function successDefaultFn(data, params) {
    if (data == "success") {
        if(params.action!='') {
            layer.msg(params.action + '成功！', function () {
                window.location.href = params.redirectUrl;
            });
        }
        else{
            window.location.href = params.redirectUrl;
        }

    } else {
        if(params.action!='') {
            layer.msg(params.action + '失败！');
        }
    }
    if(params.modalId!='') {
        $('#' + params.modalId).modal("hide");
    }
}



/**
 * 初始化按键
 * @param mainTable
 */
function init_button(mainTable,mainModalId,mainFormId,checkTable,modalTitleId){
    $('#btn-add').click(function () {
        showModal( mainModalId, mainFormId, addAjaxUrl,  addTitleFlag,modalTitleId);
    });
    $('#btn-refresh').click(function(){
        refreshBootstrapTable(mainTable);
    });
    $('#btn-delete').click(function() {
        toDelete(mainTable,delAjaxUrl);
    });
    $('#btn-submit').click(function () {
        toSubmit(mainTable,submitAjaxUrl);
    });
    $('#btn-edit').click(function () {
        toEdit(mainTable,editAjaxUrl,mainModalId,mainFormId,modalTitleId);
    });
    $('#btn-status').click(function () {
        toCheck(mainTable,checkAjaxUrl);
    });
    $('#btn-modal-close').click(function () {
        //layer.confirm('确定不保存修改数据，直接关闭当前窗口吗?', {icon: 3, title:'提示'}, function(index){
           // layer.close(index);
            $('#'+mainModalId).modal('hide');
       // });
    });



}

/**
 * 初始化select标签
 * @param selectId：select标签的id
 * @param action:select标签需要的url
 * @param params:传给url的参数用json的方式，没有可以填null
 * @param value：要显示的默认值,没有可以填 null
 * @param withEmpty:是否要带下空选项，没有可以填 null
 * @param afterContents:需要添加的内容，为一个list,没有可以填 null
 */
function init_select(selectId,action,params,value,withEmpty,afterContents) {
    selectId = $('#'+selectId);

    var selectContent="";
    if(withEmpty==true) {
        selectContent = "<option value='0'>" + "</option>";
    }
    $.ajax({
        type:"post",
        url:action,
        data:params,
        datatype:'json',
        success:function(data){
            //var myData= eval('('+data+')');
            var myData= data;
            for(var i = 0;i<myData.length;i++){
                if(myData[i].name!=undefined) {
                    selectContent += "<option value='" + myData[i].name + "'>" + myData[i].name + "</option>";
                }
                else{
                    selectContent += "<option value='" + myData[i] + "'>" + myData[i] + "</option>";
                }
            }
            if(afterContents!=null&&afterContents!=undefined){
                for(i in afterContents) {
                    selectContent += "<option value='" + afterContents[i] + "'>" + afterContents[i] + "</option>";
                }
            }
            selectId.empty();
            selectId.append(selectContent);
            if(value){
                selectId.val(value)
            }

            selectId.selectpicker('refresh');
        }
    });
}

/**
 * 初始化审核结果Table
 * @param $checkTable
 * @param queryParams
 * @param url
 */
function init_check_table() {
    $('#check_table').bootstrapTable({
        data: checkTableData,
        pagination: false,          //是否显示分页（*）
        sortable: false,           //是否启用排序
        silent: true,
        detailView: false,
        columns: [
            {field: 'shType', title: ''},
            {field: 'name', title: '审核教师'},
            {field: 'shStatus', title: '审核结果'},
            {field: 'shTime', title: '审核时间'}

        ],
        onClickcell: function (field, value, row, $element) {

        },
        onLoadSuccess: function () {  //加载成功时执行
            // alert("加载成功");
        },
        onLoadError: function () {  //加载失败时执行
            // alert("加载数据失败");
        }

    });
}

/**
 * 返回ajax请求返回的json数据，配合$.ajax用
 */
function getAjaxJsonData(data,status) {
    $('#check_table').bootstrapTable('load',data);
    refreshBootstrapTable($('#check_table'));
    showModal("check-modal", null, null, null, "查看");
}


/**
 * 获取封闭ajax请求
 * @param url 请求action
 * @param successFn 成功后调用方法
 * @param data 要传的数据
 */
function executAjax(url,successFn,data,method,dataType) {
    var params = {
        type: method,
        url: url,
        dataType: dataType,
        data: data
    }
    var options = {success: successFn};
    ajax(params, options);
}
/**
 * 获取记录id
 * @returns {{id: *}}
 */
function getFileUploadExtraData() {
    return {id:upId};
}