
$(function () {

    $('#pass').on('click', function (e) {
        $('#password-modal').modal('show');
    });

    $('#btn-password-close').on('click', function (e) {
        $('#password-modal').modal('hide');
    });
    $('#btn-password-save').on('click', function (e) {
        oldPassword = $('#oldPassword').val();
        newPassword = $('#newPassword').val();
        confirmPassword = $('#confirmPassword').val();
        if (isNullUndefineEmpty(oldPassword)) {layer.msg('原密码不可以为空!');return;}
        if (isNullUndefineEmpty(newPassword)) {layer.msg('新密码不可以为空!');return;}
        if (isNullUndefineEmpty(confirmPassword)) {layer.msg('确认新密码不可以为空!');return;}
        //if(oldPassword.length<6){layer.msg('原密码长度不可少于6位');return;}
        if(newPassword.length<6){layer.msg('新密码长度不可少于6位');return;}
        //if(oldPassword.length>15){layer.msg('原密码长度不可多于15位');return;}
        if(newPassword.length>15){layer.msg('新密码长度不可多于15位');return;}
        if (oldPassword == newPassword){layer.msg('新密码不可以和旧密码相同!');return;}
        if (confirmPassword!= newPassword) {layer.msg('两次密码输入密码不一致!');return;}

        $.ajax({
            type: request_post,
            url: baseUrl + "modify/password",
            data: {
                name: "",
                oldPassword: $('#oldPassword').val(),
                newPassword: $('#newPassword').val()
            },
            dataType: 'text',
            success: function (data, textStatus) {
                layer.msg(data);
                if (data.indexOf("错误") == -1) {
                    $('#password-modal').modal('hide');
                }
            }
        });
    });

    $('#password-modal').on('hide.bs.modal', function () {
        $('#oldPassword').val("");
        $('#newPassword').val("");
        $('#confirmPassword').val("");
    });

});
