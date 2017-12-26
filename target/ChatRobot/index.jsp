<!DOCTYPE html>

<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <meta charset="UTF-8">
    <title>SSM测试</title>
</head>
<script>
    function selectUser() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "user/showUser.do", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //固定查询
        // xmlhttp.send("id=1");

        //根据input查询
        var userId = document.getElementById('userId').value;
        xmlhttp.send("id=" + userId);
    }
    function selectDept() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "dept/selectDept.do", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //固定查询
        // xmlhttp.send("id=1");

        //根据input查询
        var deptId = document.getElementById('deptId').value;
        xmlhttp.send("id=" + deptId);
    }

    function selectAllDept() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "dept/selectAll.do", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("id=1");
    }
    function insertDept() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "dept/insertDept.do", true) ;
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // 固定插入
        // xmlhttp.send("id=4&&name=部门名称4 jsp&&comment=备注");

        //根据input插入
        // var deptId = $("#deptId").val();
        // var deptName = $("#deptName").val();
        // var deptComment = $("#deptComment").val();
        var deptId = document.getElementById('deptId').value;
        var deptName = document.getElementById('deptName').value;
        var deptComment = document.getElementById('deptComment').value;
        xmlhttp.send("id=" + deptId + "&&name=" + deptName + "&&comment=" + deptComment );

    }
    function deleteDept() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "dept/deleteDept.do", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //固定删除
        // xmlhttp.send("id=4");

        //根据input删除
        var deptId = document.getElementById('deptId').value;
        xmlhttp.send("id=" + deptId);
    }
    function updateDept() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("test").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "dept/updateDept.do", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //固定更新
        // xmlhttp.send("id=4&&name=部门名称4 jsp update &&comment=备注4 jsp update")

        //根据input更新
        var deptId = document.getElementById('deptId').value;
        var deptName = document.getElementById('deptName').value;
        var deptComment = document.getElementById('deptComment').value;
        xmlhttp.send("id=" + deptId + "&&name=" + deptName + "&&comment=" + deptComment );

    }
</script>
<body>
<p id="test">Hello World!</p>
<button type="button" onclick="selectUser()">查询输入id的用户</button>
<br>
<button type="button" onclick="selectDept()">查询输入id的部门</button>
<br>
<button type="button" onclick="selectAllDept()">查询所有部门</button>
<br>
<button type="button" onclick="insertDept()">插入输入框中的部门</button>
<br>
<button type="button" onclick="deleteDept()">删除输入id的部门</button>
<br>
<button type="button" onclick="updateDept()">更新输入框中的部门</button>
<br>
Dept
<br>
ID<input type="text" id="deptId">
<br>
Name<input type="text" id="deptName">
<br>
Comment<input type="text" id="deptComment">
<br>
<br>
User
<br>
ID<input type="text" id="userId">
</body>
</html>