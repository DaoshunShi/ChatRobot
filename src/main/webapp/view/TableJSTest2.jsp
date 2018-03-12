<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/3/12
  Time: 18:46
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

    <div id="main"  style="width: 600px;height:400px;"></div>
</div>

<script type="text/javascript">
    var dept1;
    var dept2;
    var dept3;
    var dept4;
    var resultList ;
    // List<Map<String, Object>> value;

    $(function(){
        $.ajax({
            type: "POST",
            url: "goods/countByGroup",
            dataType: "json",
            success: function (data) {
                dept1 = data[0];
                dept2 = data[1];
                dept3 = data[2];
                dept4 = data[3];
                resultList = data;

                var n  ={};
                var xa = [];
                var xb = [];
                for (var x in resultList) {
                    n[resultList[x]["groups"]] = resultList[x]["counts"]
                    console.log(n);
                    // console.log(resultList[0]["groups"])
                    xa.push(resultList[x]["groups"]);
                    xb.push(resultList[x]["counts"]);
                    // console.log(n.get(xa[x]));
                }

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
                    xAxis: {data:xa},
                    yAxis:{},
                    series: [{
                        name: "部门备注",
                        type: 'bar',
                        data: xb
                    }]
                };

                //使用刚指定的配置项和数据显示图标
                myChart.setOption(option);
            }
        })
    });
</script>
</body>
</html>
