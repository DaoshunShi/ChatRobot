<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/1/16
  Time: 15:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JS写入Table数据</title>
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
</body>
</html>
