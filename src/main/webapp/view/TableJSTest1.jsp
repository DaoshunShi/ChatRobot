<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/3/12
  Time: 10:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<html>
<head>
    <meta charset="utf-8">
    <title>JS写入Table数据1</title>
    <!-- jq -->
    <script type="text/javascript" src="js/jquery-3.2.0.min.js"></script>

    <!-- bootstrap -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

    <!-- 分页插件 -->
    <link rel="stylesheet" href="bootstrap-table/bootstrap-table.min.css">
    <script type="text/javascript" src="bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="bootstrap-table/bootstrap-table-locale-all.min.js"></script>

    <%--ECharts--%>
    <%--<script type="text/javascript" src="js/zrender.js"></script>--%>
    <%--<scirpt type="text/javascript" src="js/echarts.min.js"></scirpt>--%>
    <script type="text/javascript" src="js/echarts.js"></script>
</head>
<body>
<div>
    <!-- 表格 -->
    <%--<div class="col-xs-12">--%>
    <%--<table id="tb1" class="table table-striped table-bordered table-hover" ></table>--%>
    <%--</div>--%>
    <%--<table>--%>
    <%--<THEAD><TR><TH>姓名</TH><TH>性别</TH></TR></THEAD>--%>
    <%--<TBODY id='tb1'></TBODY>--%>
    <%--</table>--%>
    <div id="main"  style="width: 600px;height:400px;"></div>
</div>

<%--写入表格script--%>
<script type="text/javascript">
    // var myChart = echarts.init(document.getElementById('tb1'));
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis:{},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    myChart.setOption(option);

</script>

<%--显示数据表格 bootstrap--%>
<div class="container" style="margin-top:100px">
    <div class="row">
        <!-- 搜索框 -->
        <div class="col-xs-6 pull-right">
            <div class="input-group">
                <input type="text" class=" form-control" name="id" placeholder="请输入ID">
                <input type="text" class=" form-control" name="name" placeholder="请输入部门名称">
                <input type="text" class=" form-control" name="comment" placeholder="请输入备注">
                <span class="input-group-btn">
                            <button class="btn btn-default search" type="button">Go!</button>
                        </span>
            </div>
        </div>
        <!-- 表格 -->
        <div class="col-xs-12">
            <table id="tb" class="table table-striped table-bordered table-hover" ></table>
        </div>

    </div>
</div>
<%--<script type="text/javascript" src="js/table.js"></script>--%>
<script type="text/javascript" >

    var bstpTable = $('.table');

    function tableInit(searchArgs) {

        // bstpTable.destroy();
        bstpTable.bootstrapTable('destroy');
        // bootstrapTable('destroy');
        //---初始化表格,动态从服务器加载数据---
        bstpTable.bootstrapTable({
            //【发出请求的基础信息】
            url: 'dept/selectByFy',
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
                {field: 'id',title: '部门编号'},
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

    $(".search").click(function(){
        var searchArgs={
            name:$("input[name='name']").val(),
            id:$("input[name='id']").val(),
            comment:$("input[name='comment']").val()
        }
        tableInit(searchArgs)
    })

    tableInit({});
</script>

<input type="button" value="显示信息 echarts json">
<script type="text/javascript">
    var dept1;
    var dept2;
    var dept3;
    var dept4;
    // $(function(){
    //     $("input:button").on("click", function() {
    //         $.ajax({
    //             type: "POST",
    //             url: "dept/getAllJson1",
    //             dataType: "json",
    //             success: function (data) {
    //                 dept1 = data[0];
    //                 dept2 = data[1];
    //                 dept3 = data[2];
    //                 dept4 = data[3];
    //
    //                 //给予准备好的dom，初始化echarts实例
    //                 var myChart = echarts.init(document.getElementById('main'), 'light');
    //                 //指定图标的配置和数据
    //                 var option = {
    //                     //设置全局调色板
    //                     //color: [‘#c23531‘,‘#2f4554‘, ‘#61a0a8‘, ‘#d48265‘, ‘#91c7ae‘,‘#749f83‘,  ‘#ca8622‘, ‘#bda29a‘,‘#6e7074‘, ‘#546570‘, ‘#c4ccd3‘],
    //                     title: {text: 'My First ECharts'},
    //                     tooltip: {},
    //                     legend: {
    //                         data: ['部门']
    //                     },
    //                     xAxis: {data:["部门1", "部门2", "部门3", "部门4"]},
    //                     yAxis:{},
    //                     series: [{
    //                         name: "部门备注",
    //                         type: 'bar',
    //                         data: [dept1.comment, dept2.comment, dept3.comment, dept4.comment]}]
    //                 };
    //
    //                 //使用刚指定的配置项和数据显示图标
    //                 myChart.setOption(option);
    //             }
    //         })
    //
    //     });
    // });
    $(function(){
        $.ajax({
            type: "POST",
            url: "dept/getAllJson1",
            dataType: "json",
            success: function (data) {
                dept1 = data[0];
                dept2 = data[1];
                dept3 = data[2];
                dept4 = data[3];

                //给予准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'), 'light');
                //指定图标的配置和数据
                var option = {
                    //设置全局调色板
                    //color: [‘#c23531‘,‘#2f4554‘, ‘#61a0a8‘, ‘#d48265‘, ‘#91c7ae‘,‘#749f83‘,  ‘#ca8622‘, ‘#bda29a‘,‘#6e7074‘, ‘#546570‘, ‘#c4ccd3‘],
                    title: {text: 'My First ECharts'},
                    tooltip: {},
                    legend: {
                        data: ['部门']
                    },
                    xAxis: {data:["部门1", "部门2", "部门3", "部门4"]},
                    yAxis:{},
                    series: [{
                        name: "部门备注",
                        type: 'bar',
                        data: [dept1.comment, dept2.comment, dept3.comment, dept4.comment]}]
                };

                //使用刚指定的配置项和数据显示图标
                myChart.setOption(option);
            }
        })
    });
</script>
</body>
</html>
