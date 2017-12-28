<%--
  Created by IntelliJ IDEA.
  User: doss
  Date: 17-12-27
  Time: 上午11:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>图片上传</title>
    <!-- jq -->
    <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>

    <!-- bootstrap -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

    <!-- 分页插件 -->
    <link rel="stylesheet" href="bootstrap-table/bootstrap-table.min.css">
    <script type="text/javascript" src="bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="bootstrap-table/bootstrap-table-locale-all.min.js"></script>
</head>
<body>
<div class="container" style="margin-top:100px">
    <div class="row">
        <!-- 搜索框 -->
        <div class="col-xs-6 pull-right">
            <div class="input-group">
                <input type="text" class=" form-control" name="age" placeholder="请输入年龄">
                <input type="text" class=" form-control" name="name" placeholder="请输入姓名">
                <span class="input-group-btn">
    							<button class="btn btn-default search" type="button">Go!</button>
    						</span>
            </div>
        </div>
        <!-- 表格 -->
        <div class="col-xs-12">
            <table class="table table-striped table-bordered table-hover" ></table>
        </div>
    </div>
</div>
<script type="text/javascript">
    class BstpTable{
        constructor(obj) {
            this.obj=obj;
        }
        inint(searchArgs){
            //---先销毁表格 ---
            this.obj.bootstrapTable('destroy');
            //---初始化表格,动态从服务器加载数据---
            this.obj.bootstrapTable({
                //【发出请求的基础信息】
                url: 'dept/selectAllJson.do',
                method: 'post',
                contentType: "application/x-www-form-urlencoded",


                //【查询设置】
                /* queryParamsType的默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
                                  设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber */
                queryParamsType:'',
                queryParams: function queryParams(params) {
                    var param = {
                        pageNumber: params.pageNumber,
                        pageSize: params.pageSize
                    };
                    for(var key in searchArgs){
                        param[key]=searchArgs[key]
                    }
                    return param;
                },

                //【其它设置】
                locale:'zh-CN',//中文支持
                pagination: true,//是否开启分页（*）
                pageNumber:1,//初始化加载第一页，默认第一页
                pageSize: 3,//每页的记录行数（*）
                pageList: [2,3,4],//可供选择的每页的行数（*）
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                showRefresh:true,//刷新按钮

                //【样式设置】
                height: 300,//table的高度
                //按需求设置不同的样式：5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
                rowStyle: function (row, index) {
                    var style = "";
                    if (row.name=="小红") {style='success';}
                    return { classes: style }
                },

                //【设置列】
                columns: [
                    {field: 'id',title: '部门id'},
                    {field: 'name',title: '部门名称'},
                    {field: 'comment',title: '备注'},
                    {field: 'tool',title: '操作', align: 'center',
                        formatter:function(value,row,index){
                            var element =
                                "<a class='edit' data-id='"+row.id +"'>编辑</a> "+
                                "<a class='delet' data-id='"+row.id +"'>删除</a> ";
                            return element;
                        }
                    }
                ]
            })
        }
    }

    var bstpTable=new BstpTable($("table"));
    bstpTable.inint({})

    $(".search").click(function(){
        var searchArgs={
            name:$("input[name='name']").val(),
            id:$("input[name='id']").val()
        }
        bstpTable.inint(searchArgs)
    })
</script>
</body>
</html>
