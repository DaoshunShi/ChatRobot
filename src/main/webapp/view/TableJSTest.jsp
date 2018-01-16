<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/1/16
  Time: 15:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
        <div id="tb1"></div>
    </div>

    <%--写入表格script--%>
    <script type="text/javascript" src="js/table.js"></script>
</body>
</html>
