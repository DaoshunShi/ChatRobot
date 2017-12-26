/**
 * Created by ss on 2017/4/6.
 */
window.majorCheck = window.majorCheck || {};
//var userNumber = userSession.userNumber;
var queryParams = {number: userNumber,navContent:$('#nav-content').text()};
var $mainTable = $('#major-check-table');
var mainData = "";
var mainModal = {
    baseId: '',
    modalId: '',
    formId: '',
    titleId: '',
    closeBtnId: '',
    rejectBtnId: '',
    passBtnId: '',
    checkUrl: '',
    detailUrl: ''
};

majorCheck.init = function () {
    init_main_table();
    init_select('select-academy', selectAcademyAllUrl, null, userAcademyName, null, null);
    $('#select-status').on('rendered.bs.select', function (e) {
        var status = $(e.currentTarget).find('option:selected').text();
        if ($('#select-major').prop('disabled') == true) {
            refreshStatus(status);
        }
        else {
            var major = $('#select-major').find('option:selected').text();
            var academy = $('#select-academy').find('option:selected').text();
            refreshStatus(status, (major == undefined) ? "" : major, (academy == undefined) ? "" : academy);
        }

    });
    $('#select-academy').on('rendered.bs.select', function (e) {
        var academy = $(e.currentTarget).find('option:selected').text();
        if ($('#select-major').prop('disabled') == false) {
            init_select('select-major', selectMajorDataUrl, {academy: academy}, null, null, new Array("全部"));
        }
        else {
            refreshStatus(status);
        }

    });
    $('#select-major').on('rendered.bs.select', function (e) {
        var major = $(e.currentTarget).find('option:selected').text();
        var status = $('#select-status').find('option:selected').text();
        var academy = $('#select-academy').find('option:selected').text();
        if ($(e.currentTarget).prop('disabled') == false) {
            refreshStatus((status == undefined || status == "") ? isChecking : status, major, academy);
        }
    });
    $('#btn-check').click(function () {
        var hrs = $mainTable.bootstrapTable('getSelections');
        if (hrs.length < 1) {
            layer.msg('请选择一条数据进行审核！', {icon: 2});
            return;
        }
        if (hrs[0].status == hasReject) {
            layer.msg('该记录未提交，无法审核！', {icon: 2});
            return;
        }
        if (hrs[0].status == overCheck || hrs[0].status == isChecking) {
            layer.msg('该记录已经审核通过，无法再次审核！', {icon: 2});
            return;
        }

        executAjax(selectModalIdByAchieveType,
            openCheckModal,
            {achieveType: hrs[0].achieveType, onlyDetail: false, id: hrs[0].id},
            request_post,
            "json");
    });
    $('#btn-refresh').click(function () {
        var status = $('#select-status').find('option:selected').text();
        if ($('#select-major').prop('disabled') == true) {
            refreshStatus(status);
        }
        else {
            var major = $('#select-major').find('option:selected').text();
            var academy = $('#select-academy').find('option:selected').text();
            refreshStatus(status, (major == undefined) ? "" : major, (academy == undefined) ? "" : academy);
        }
    })
    $('#search').click(function () {
        var number = $('#number').val().trim();
        if (number == '') {
            layer.msg('请输入学号再查询！', {icon: 3});
            return;
        }
        var param = "";
        if ($('#select-major').prop('disabled') == true) {
            param = {
                status: null,
                xueNian: null,
                xueQi: null,
                number: number
            };
        }
        else if ($('#select-academy').prop('disabled') == true) {
            param = {
                status: null,
                xueNian: null,
                xueQi: null,
                number: number,
                academy: $('#select-academy').find('option:selected').text(),
                major: $('#select-major').find('option:selected').text()
            };
        }
        else {
            param = {
                status: null,
                xueNian: null,
                xueQi: null,
                number: number,
                academy: '',
                major: $('#select-major').find('option:selected').text()
            };
        }

        executAjax(refreshAjaxUrl, refreshMainTable, param, request_post, "json");
    })

}

function refreshStatus(status, major, academy) {
    if (status == unCheck) {
        status = hasSubmit;
    }
    else if (status == hasCheck) {
        status = isChecking + "&" + overCheck;
    }
    else {
        status = "";
    }
    executAjax(refreshAjaxUrl, refreshMainTable, {
        status: status,
        xueNian: null,
        xueQi: null,
        number: null,
        major: major,
        academy: academy
    }, request_post, "json");
}

function openCheckModal(data, params) {
    mainModal.baseId = data.modalId.replace('-modal', '');
    mainModal.formId = mainModal.baseId + '-form';
    mainModal.modalId = mainModal.baseId + '-modal';
    mainModal.titleId = mainModal.baseId + 'ModelTitle';
    mainModal.closeBtnId = 'btn-' + mainModal.baseId + '-modal-close';
    mainModal.passBtnId = 'btn-' + mainModal.baseId + '-modal-pass';
    mainModal.rejectBtnId = 'btn-' + mainModal.baseId + '-modal-reject';
    mainModal.checkUrl = baseCheck + mainModal.baseId + 'Check';
    mainModal.detailUrl = baseCheck + mainModal.baseId + 'Detail';
    if (params.data.onlyDetail == true) {
        $('#' + mainModal.rejectBtnId).css('visibility', 'hidden');
        $('#' + mainModal.passBtnId).css('visibility', 'hidden');
    }
    else {
        $('#' + mainModal.rejectBtnId).css('visibility', 'visible');
        $('#' + mainModal.passBtnId).css('visibility', 'visible');
    }
    $('#' + mainModal.formId + ' :input').attr('readonly', 'true');

    initeModalShow(data, params, mainModal.checkUrl);
}


function initeModalShow(data, params, checkUrl) {
    var id = params.data.id;
    switch (mainModal.baseId) {
        case 'patent':
            showDetail(mainModal.detailUrl, initePatentDetail, id);
            break;
        case 'creative':
            showDetail(mainModal.detailUrl, initeCreativeDetail, id);
            break;
        case 'skill':
            showDetail(mainModal.detailUrl, initeSkillDetail, id);
            break;
            break;
        case 'competition':
            showDetail(mainModal.detailUrl, initeCompetitionDetail, id);
            break;
            break;
        case 'paper':
            showDetail(mainModal.detailUrl, initePaperDetail, id);
            break;
            break;
        case 'chuangye':
            showDetail(mainModal.detailUrl, initeChuangyeDetail, id);
            break;
            break;
        case 'other':
            showDetail(mainModal.detailUrl, initeOtherDetail, id);
            break;
            break;
        case 'book':
            showDetail(mainModal.detailUrl, initeBookDetail, id);
            break;
            break;
        case 'literature':
            showDetail(mainModal.detailUrl, initeLiteratureDetail, id);
            break;
            break;
    }


    $('#' + mainModal.modalId).on('hide.bs.modal', function () {
        document.getElementById(mainModal.formId).reset();
    });
    $('#' + mainModal.closeBtnId).click(function () {
        $('#' + mainModal.modalId).modal('hide');
    });
    $('#' + mainModal.passBtnId).click(function () {
        layer.confirm('您确定审核通过该记录吗？', {icon: 3, title: '提示'}, function (index) {
            doCheck(mainModal.formId, id, isChecking, checkUrl);
            layer.close(index);
        });
    });
    $('#' + mainModal.rejectBtnId).click(function () {
        layer.confirm('您确定驳回该记录吗？', {icon: 3, title: '提示'}, function (index) {
            doCheck(mainModal.formId, id, hasReject, checkUrl);
            layer.close(index);
        });
    });
}
function showDetail(detailUrl, initeDetail, id) {
    executAjax(detailUrl,
        initeDetail,
        {id: id},
        request_post,
        "json");
}
function patentDetail(id) {
    executAjax(patentDetailAjaxUrl,
        initePatentDetail,
        {id: id},
        request_post,
        "json");
}

function doCheck(myForm, id, status, checkUrl) {

    var form = $('#' + myForm);
    $.ajax({
        type: request_post,
        traditional: true,
        url: checkUrl,
        data: {id: id, status: status},
        dataType: 'text',
        success: function (data, status) {
            layer.msg('审核完成！', {icon: 1});
            $('#' + mainModal.modalId).modal('hide');
            var status = $('#select-status').find('option:selected').text();
            $('#btn-refresh').click();
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (error) {

        }
    });
}

function initePatentDetail(data, status) {
    $('#cnNamePatent').val(data.cnName);
    $('#patent-id').val(data.id);
    $('#patentCode').val(data.patentCode);
    $('#patentBookNum').val(data.patentBookNum);
    $('#ipplyPersonPatent').val(data.ipplyPerson);
    $('#authorizationTimePatent').val(data.authorizationTime);
    $('#patentInfo').val(data.patentInfo);
    $('#achieveTypePatent').val(data.achieveType);
    $('#authorRankPatent').val(data.authorRank);
    $('#belongAcademyPatent').val(data.belongAcademy);
    $('#lawStatusPatent').val(data.lawStatus);
    $('#InfoPatent').val(data.infoPatent);
    $('#attachNamePatent').val(data.attachName);
    $('#attachePatentDownLoad').text(data.attachName);
    $('#attachePatentDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, patentCheck, data.achieveType, mainModal.titleId);

}

function initeCreativeDetail(data, status) {
    $('#cnNameCreative').val(data.cnName);
    $('#projectNumberCreative').val(data.projectNumber);
    $('#achieveTypeCreative').val(data.achieveType);
    $('#projectLevelCreative').val(data.projectLevel);
    $('#authorRankCreative').val(data.authorRank);
    $('#projectStatusCreative').val(data.status);
    $('#belongAcademyCreative').val(data.belongAcademy);
    $('#projectStarttimeCreative').val(data.projectStartTime);
    $('#projectEndtimeCreative').val(data.projectEndTime);
    $('#projectTeacherCreative').val(data.projectTeacher);
    $('#projectInfoCreative').val(data.projectInfo);
    $('#attacheCreativeDownLoad').text(data.attachName);
    $('#attacheCreativeDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, creativeCheck, data.achieveType, mainModal.titleId);
}
function initeSkillDetail(data, status) {
    $('#cnNameSkill').val(data.cnName);
    $('#achieveTypeSkill').val(data.achieveType);
    $('#authorRankSkill').val(data.authorRank);
    $('#skillTimeSkill').val(data.skillTime);
    $('#belongAcademySkill').val(data.belongAcademy);
    $('#skillInfoSkill').val(data.skillInfo);
    $('#attacheSkillDownLoad').text(data.attachName);
    $('#attacheSkillDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, skillCheck, data.achieveType, mainModal.titleId);
}
function initeCompetitionDetail(data, status) {
    $('#cnNameCompetition').val(data.cnName);
    $('#achieveTypeCompetition').val(data.achieveType);
    $('#competitionLevelCompetition').val(data.competitionLevel);
    $('#rewardLevelCompetition').val(data.rewardLevel);
    $('#authorRankCompetition').val(data.authorRank);
    $('#certificateNumberCompetition').val(data.certificateNumber);
    $('#awardCompanyCompetition').val(data.awardCompany);
    $('#teacherCompetition').val(data.teacher);
    $('#belongAcademyCompetition').val(data.belongAcademy);
    $('#rewardInfoCompetition').val(data.rewardInfo);
    $('#attacheCompetitionDownLoad').text(data.attachName);
    $('#attacheCompetitionDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, competitionCheck, data.achieveType, mainModal.titleId);
}
function initePaperDetail(data, status) {
    $('#cnNamePaper').val(data.cnName);
    $('#enNamePaper').val(data.enName);
    $('#paperNamePaper').val(data.paperName);
    $('#achieveTypePaper').val(data.achieveType);
    $('#authorRankPaper').val(data.authorRank);
    $('#paperIdPaper').val(data.paperId);
    $('#paperLevelPaper').val(data.paperLevel);
    $('#paperJuanhaoPaper').val(data.paperJuanhao);
    $('#paperQihaoPaper').val(data.paperQihao);
    $('#postedTimePaper').val(data.postedTime);
    $('#pageNumberPaper').val(data.pageNumber);
    $('#paperCountryPaper').val(data.paperCountry);
    $('#paperLanguagePaper').val(data.paperLanguage);
    $('#belongAcademyPaper').val(data.belongAcademy);
    $('#commentPaper').val(data.comment);
    $('#attachePaperDownLoad').text(data.attachName);
    $('#attachePaperDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, paperCheck, data.achieveType, mainModal.titleId);
}
function initeChuangyeDetail(data, status) {
    $('#cnNameChuangye').val(data.cnName);
    $('#achieveTypeChuangye').val(data.achieveType);
    $('#authorRankChuangye').val(data.authorRank);
    $('#companyAddrChuangye').val(data.companyAddr);
    $('#companyNumberChuangye').val(data.companyNumber);
    $('#companyTimeChuangye').val(data.companyTime);
    $('#belongAcademyChuangye').val(data.belongAcademy);
    $('#commentChuangye').val(data.comment);
    $('#attacheChuangyeDownLoad').text(data.attachName);
    $('#attacheChuangyeDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, chuangyeCheck, data.achieveType, mainModal.titleId);
}
function initeOtherDetail(data, status) {
    $('#cnNameOther').val(data.cnName);
    $('#achieveTypeOther').val(data.achieveType);
    $('#authorRankOther').val(data.authorRank);
    $('#otherTimeOther').val(data.otherTime);
    $('#belongAcademyOther').val(data.belongAcademy);
    $('#chieveInfoOther').val(data.chieveInfo);
    $('#attacheOtherDownLoad').text(data.attachName);
    $('#attacheOtherDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, otherCheck, data.achieveType, mainModal.titleId);
}
function initeBookDetail(data, status) {
    $('#cnNameBook').val(data.cnName);
    $('#enNameBook').val(data.enName);
    $('#achieveTypeBook').val(data.achieveType);
    $('#bookTypeBook').val(data.bookType);
    $('#authorRankBook').val(data.authorRank);
    $('#postedTimeBook').val(data.postedTime);
    $('#publishNameBook').val(data.publishName);
    $('#postedNumberBook').val(data.postedNumber);
    $('#publishLevelBook').val(data.publishLevel);
    $('#bookCountryBook').val(data.bookCountry);
    $('#bookLanguageBook').val(data.bookLanguage);
    $('#belongAcademyBook').val(data.belongAcademy);
    $('#bookSumBook').val(data.bookSum);
    $('#commentBook').val(data.comment);
    $('#attacheBookDownLoad').text(data.attachName);
    $('#attacheBookDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, bookCheck, data.achieveType, mainModal.titleId);
}
function initeLiteratureDetail(data, status) {
    $('#cnNameLiterature').val(data.cnName);
    $('#enNameLiterature').val(data.enName);
    $('#achieveTypeLiterature').val(data.achieveType);
    $('#authorRankLiterature').val(data.authorRank);
    $('#literatureNameLiterature').val(data.literatureName);
    $('#literatureLevelLiterature').val(data.literatureLevel);
    $('#literatureTypeLiterature').val(data.literatureType);
    $('#postedTimeLiterature').val(data.postedTime);
    $('#literatureCountryLiterature').val(data.literatureCountry);
    $('#literatureLanguageLiterature').val(data.literatureLanguage);
    $('#postedNumberLiterature').val(data.postedNumber);
    $('#literatureSumLiterature').val(data.literatureSum);
    $('#belongAcademyLiterature').val(data.belongAcademy);
    $('#commentLiterature').val(data.comment);
    $('#attacheLiteratureDownLoad').text(data.attachName);
    $('#attacheLiteratureDownLoad').attr('href', downloadfile + "?attachName=" + data.attachName + "&attachPath=" + data.attachPath);
    showModal(mainModal.modalId, mainModal.formId, literatureCheck, data.achieveType, mainModal.titleId);
}

$(function () {
    majorCheck.init()
});

/**
 * 初始化bootstrapTable
 */
function init_main_table() {

    $mainTable.bootstrapTable({
        data: mainData,
        method: 'post',           //请求方式（*）
        toolbar: '#major-check-toolbar',        //工具按钮用哪个容器
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
        singleSelect: true,
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
            field: 'cnName',
            title: '成果名称',
            cellStyle: getTitleStyle()
        },
            {field: 'achieveType', title: '成果类型'},
            {field: 'studentId', title: '学 号'},
            {field: 'studentName', title: '姓 名'},
            {field: 'authorRank', title: '作者排序'},
            {
                field: 'status', title: '成果状态', cellStyle: function (value, row, index, field) {
                return getStatusStyle(value, row, index, field);
            }
            },
            {field: 'belongAcademy', title: '所属学院'},
            {
                field: 'attachName', title: '附件名称',
                formatter: function (value, row, index) {
                    if (value != "") {
                        return "<a target='_blank' href='" + baseUrl + "view/file?attachName=" + row.attachName + "&attachPath=" + row.attachPath + "'>" + value + "</a>";
                    }
                }
            },
            {field: 'courseName', title: '申请课程'}
        ],
        onClickCell: function (field, value, row, $element) {
            if (field == 'cnName') {
                executAjax(selectModalIdByAchieveType,
                    openCheckModal,
                    {achieveType: row.achieveType, onlyDetail: true, id: row.id},
                    request_post,
                    "json");
            }
        },
        onLoadSuccess: function () {  //加载成功时执行
            // msg("加载成功");
        },
        onLoadError: function () {  //加载失败时执行
            // msg("加载数据失败");
        }
    });
    /*    executAjax(refreshAjaxUrl, refreshMainTable, {
     status: hasSubmit,
     xueNian: null,
     xueQi: null,
     number: null,
     major:major,
     academy:academy
     }, request_post);*/


}


/**
 * 返回ajax请求返回的json数据，配合$.ajax用
 */
function refreshMainTable(data, status) {
    $mainTable.bootstrapTable('load', data);
}



