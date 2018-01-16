<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/1/16
  Time: 20:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 引入 echarts.js -->
    <script type="text/javascript" src="echarts.min.js"></script>
</head>
<body>
    <div id="main" style="width: 600px; height:400px;"></div>
    <script type="text/javascript">
        var myChart = echarts.init(document.getElementById('main'));

        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            yAxis: {},
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
