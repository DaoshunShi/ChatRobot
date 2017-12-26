window.common=window.common||{};

var hasPass="通过";
/#########成果状态##########/
var unSubmit="未提交";
var hasSubmit="已提交";
var hasReject="驳回";
var isChecking = "正在审核";
var overCheck = "审核完成";
/###########教师查询自己是否审核##############/
var unCheck="未审核";
var hasCheck="已审核";
var all ="全部";

/###########modal框标题前缀#############/
var editTitleFlag = '编辑';
var addTitleFlag = '添加';
var lookTitleFlag = '查看';

/##########ajax请求方式#################/
var request_post = 'POST';
var request_get = 'GET';

/######课程名称######################/
var two_scroe = ['创新创业大作业','创新实践'];
/**
 * 设置成果标题样式
 * @returns {{css: {color: string, text-decoration: string, cursor: string}}}
 */
function getTitleStyle() {
    return {
        css: {
            "color": "blue",
            "text-decoration": "underline",
            "cursor": "pointer"
        }
    }
}

function getStatusStyle(value, row, index, field) {
    if(value==hasSubmit|| value==isChecking)
    {
        return {css: {"color": "blue"}};
    }
    if(value==overCheck)
    {
        return {css: {"color": "green"}};
    }
    if(value==hasReject)
    {
        return {css: {"color": "red"}};
    }
    return {css:{"color":"black"}};
}

function displayScore(value,row,index) {
    if(row.courseName==null||row.courseName==''){
        return '';
    }
    if(contains(two_scroe,row.courseName)){
        return '2';
    }
    else{
        return '1';
    }
}