so.init(function () {
    // 全选
    so.id('btn-del-all').on('click', function () {
        var checkeds = $('[name="checkboxItem"]:checked');

        if (!checkeds.length) {
            return;
        }

        var array = [];

        checkeds.each(function () {
            array.push(this.value);
        });

        return deleteById(array);
    });
    $('.js_allocation').click(function () {
        var academyId = $(this).attr("academyId");
        var number = $(this).attr("number");

        var params = {
            type: "POST",
            url: getAjaxUrl,
            dataType: "html",
            async: true,
            traditional: true,
            data: {number: number, academyId: academyId},
        }
        var options = {success: successFn2};
        ajax(params, options);
    });
    $('#add-modal-option-cancel').click(function () {
        $('#add-modal').modal("hide");
    });
    $('#add-modal-option-ok').click(function(){

        var checked = $("#add-modal-content :checked");
        var academyId = $('#add-modal').find('#add-modal-content').attr('academyId');
        var number = $('#add-modal').find('#add-modal-content').attr('number');
        var majorIdList = [];
        $.each(checked, function () {
            majorIdList.push($.trim($(this).val()));
        });

        var params = {
            type: "POST",
            url: addAjaxUrl,
            dataType: "html",
            async: true,
            traditional: true,
            data: {academyId: academyId, number: number, majorIdList: majorIdList},
            action: "选择",
            redirectUrl: redirectUrl,
            modalId: "add-modal"
        }
        var options = {success: successDefaultFn};
        ajax(params, options);
    });

 /*   $('#btn-search').click(function () {
        var params = {
            type: "get",
            url: redirectUrl,
            dataType: "html",
            async: true,
            traditional: true,
            data: {word: $('#th-name').val().trim()}
        }
        var options = {success: successDefaultFn};
        ajax(params, options);
    });*/

});




function successFn2(data, params) {//TODO 修改样式
    var html = "";
   $.each($.parseJSON(data), function () {
        html = html + "<div>";
        html = html + "<label class='checkbox'>";
        html = html + "<input type='checkbox' value='" + this.majorId + "'";

        if (this.status) {
            html = html + " checked='checked'";
        }

        html = html + "/>";
        html = html + this.majorName;
        html = html + "</label>";
        html = html + "</div>";
    });

    $('#add-modal').find('#add-modal-content').attr('academyId', params.data.academyId);
    $('#add-modal').find('#add-modal-content').attr('number', params.data.number);
    $('#add-modal').find('#add-modal-content').html(html);
    $('#add-modal').modal("show");
}





/*$('#add-modal').on('click', '', function () {
    $("#add-modal").modal("close");
});*/

