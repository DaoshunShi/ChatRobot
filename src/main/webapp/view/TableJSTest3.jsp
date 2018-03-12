<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/3/12
  Time: 20:38
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
    var resultList ;

    $(function(){
        $.ajax({
            type: "POST",
            url: "goods/countByGroup",
            dataType: "json",
            success: function (data) {
                resultList = data;

                var jsonstr="[]";
                var jsonarray = eval('('+jsonstr+')');
                var leg = [];
                for (var x in resultList) {
                    leg.push(resultList[x]["groups"])
                    var arr = {
                        name : resultList[x]["groups"],
                        value: resultList[x]["counts"]
                    }
                    jsonarray.push(arr);
                }
                console.log(jsonarray);


                //给予准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'), 'light');

                // app.title = '环形图';
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:leg
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:jsonarray
                        }
                    ]
                };


                // var option = {
                //     backgroundColor: '#2c343c',
                //
                //     title: {
                //         text: 'Customized Pie',
                //         left: 'center',
                //         top: 20,
                //         textStyle: {
                //             color: '#ccc'
                //         }
                //     },
                //
                //     tooltip : {
                //         trigger: 'item',
                //         formatter: "{a} <br/>{b} : {c} ({d}%)"
                //     },
                //
                //     visualMap: {
                //         show: false,
                //         min: 80,
                //         max: 600,
                //         inRange: {
                //             colorLightness: [0, 1]
                //         }
                //     },
                //     series : [
                //         {
                //             name:'访问来源',
                //             type:'pie',
                //             radius : '55%',
                //             center: ['50%', '50%'],
                //             data:jsonarray.sort(function (a, b) { return a.value - b.value; }),
                //             roseType: 'radius',
                //             label: {
                //                 normal: {
                //                     textStyle: {
                //                         color: 'rgba(255, 255, 255, 0.3)'
                //                     }
                //                 }
                //             },
                //             labelLine: {
                //                 normal: {
                //                     lineStyle: {
                //                         color: 'rgba(255, 255, 255, 0.3)'
                //                     },
                //                     smooth: 0.2,
                //                     length: 10,
                //                     length2: 20
                //                 }
                //             },
                //             itemStyle: {
                //                 normal: {
                //                     color: '#c23531',
                //                     shadowBlur: 200,
                //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //                 }
                //             },
                //
                //             animationType: 'scale',
                //             animationEasing: 'elasticOut',
                //             animationDelay: function (idx) {
                //                 return Math.random() * 200;
                //             }
                //         }
                //     ]
                // };

                //使用刚指定的配置项和数据显示图标
                myChart.setOption(option);
            }
        })
    });
</script>
</body>
</html>
