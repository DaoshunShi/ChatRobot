/**
 * Created by wd on 2017/8/30.
 */
window.time = window.time || {};
var tForm = 'time-form';

$(function () {
    time.init();
});

time.init=function (){
    //初始化时间信息
    init_time();

    //点击确认按钮
    $('#btn-timeConfirm').click(function (){
        if($('#startTime').val()==''){
            layer.msg('请输入开始时间！', {icon: 3});
            return;
        }
        else if($('#endTime').val()==''){
            layer.msg('请输入结束时间！', {icon: 3});
            return;
        }
        else if($('#startTime').val()>$('#endTime').val()) {
            layer.msg('请输入正确开始结束时间！', {icon: 3});
            return;
        }
        else{
            var sTime=$('#startTime').val();
            var eTime=$('#endTime').val();
            var status='1';
            $.ajax({
                type: 'post',
                url: addTimeUrl,
                data:{starttime:sTime,endtime:eTime,status:status},
                success: function (data){
                    if(data=='1'){
                        layer.msg("设置时间成功", {icon: 3});
                    }

                }

            });
        }
    });

}

function init_time(hrs){
    // 若存在有效时间，读取，否则显示当前时间
}