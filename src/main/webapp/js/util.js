/**
 * Created by ss on 2017/4/24.
 */
function getfilename(path) {
    var file = path.trim();
    var pos = file.lastIndexOf("\\");
    return file.substring(pos + 1);
}
/**
 * 判断是不是空
 * @param str
 * @returns {boolean}
 */
function isNullUndefineEmpty(str) {
    if(str == undefined)
        return true;
    if(str == null)
        return true;
    if(str == '')
        return true;
}
function ConvertTime(value) {
    var date = new Date(value);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s; //呀麻碟
}

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}