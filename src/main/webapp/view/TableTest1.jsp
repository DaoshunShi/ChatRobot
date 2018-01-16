<%@ taglib prefix="c" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: DossS
  Date: 2018/1/16
  Time: 15:45
  To change this template use File | Settings | File Templates.
  完成了以JS function的形式动态写入Bootstrap Table
  JS文件存放在/js/table.js
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>JS写入Bootstrap Table数据</title>
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
<script type="text/javascript" src="js/table.js">

</script>
</body>
</html>

