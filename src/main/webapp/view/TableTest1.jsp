<%--
  Created by IntelliJ IDEA.
  User: doss
  Date: 17-12-26
  Time: 下午8:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <meta charset="utf-8">
    <title>图片上传</title>
    <!-- jq -->
    <script type="text/javascript" src="js/jquery-3.2.0.min.js"></script>

    <!-- bootstrap -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
    <%--<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">--%>
    <%--<link href="css/bootstrap-table.min.css" rel="stylesheet" type="text/css">--%>
    <%--<script src="/js/jquery-3.2.0.min.js"></script>--%>
    <%--<script src="js/bootstrap.min.js"></script>--%>
    <%--<script src="js/plugins/bootstrap-table.min.js"></script>--%>
    <%--<script src="js/plugins/bootstrap-table-zh-CN.js"></script>--%>

    <!-- 分页插件 -->
    <%--<link rel="stylesheet" href="/bootstrap-table/bootstrap-table.min.css">--%>
    <%--<script type="text/javascript" src="/bootstrap-table/bootstrap-table.min.js"></script>--%>
    <%--<script type="text/javascript" src="/bootstrap-table/bootstrap-table-locale-all.min.js"></script>--%>

    <script>
        function selectAllDept() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("tableTest").innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open("POST", "dept/selectAllJson.do", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("id=1");
        }
    </script>
    <script type="text/javascript">
        function initTable() {
            //先销毁表格
            $('#cusTable').bootstrapTable('destroy');
            //初始化表格,动态从服务器加载数据
            $("#cusTable").bootstrapTable({
                method: "get",  //使用get请求到服务器获取数据
                url: 'dept/selectAllJson.do', //获取数据的Servlet地址
                striped: true,  //表格显示条纹
                // pagination: false, //启动分页
                // pageSize: 2,  //每页显示的记录数
                // pageNumber:1, //当前第几页
                // pageList: [5, 10, 15, 20, 25],  //记录数可选列表
                search: false,  //是否启用查询
                showColumns: true,  //显示下拉框勾选要显示的列
                showRefresh: true,  //显示刷新按钮
                sidePagination: "server", //表示服务端请求
                //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
                //设置为limit可以获取limit, offset, search, sort, order
                queryParamsType : "undefined",
                queryParams: function queryParams(params) {   //设置查询参数
                    var param = {
                        pageNumber: params.pageNumber,
                        pageSize: params.pageSize,
                        orderNum : $("#orderNum").val()
                    };
                    return param;
                },
                onLoadSuccess: function(){  //加载成功时执行
                    layer.msg("加载成功");
                },
                onLoadError: function(){  //加载失败时执行
                    layer.msg("加载数据失败", {time : 1500, icon : 2});
                }
            });
        }


    </script>
</head>
<body>

<button class="btn" type="button" onclick="selectAllDept()">显示所有dept JSON</button>
<p id="tableTest">
    这里是输出测试
</p>

<button class="btn" type="button" onclick="initTable()">显示所有dept JSON</button>

<table class="table table-hover" id="cusTable"
       data-pagination="true"
       data-show-refresh="true"
       data-show-toggle="true"
       data-showColumns="true">
    <thead>
    <tr>
        <th  data-field="num" data-sortable="true">
            #
        </th>
        <th data-field="deptID" >
            部门ID
        </th>
        <th data-field="deptName" >
            部门名称
        </th>
        <th data-field="comment" >
            备注
        </th>
        <!-- 在此省略表格列的代码，代码和上面差不多 -->
        <%--<th class="col-xs-2" data-field="action" data-formatter="actionFormatter" data-events="actionEvents">Action</th>--%>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

</body>
</html>