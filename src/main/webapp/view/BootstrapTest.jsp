<%--
  Created by IntelliJ IDEA.
  User: doss
  Date: 17-12-26
  Time: 下午1:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8"%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>SSM + Bootstrap 测试</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
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
                document.getElementById("tableTest").innerHTML = xmlhttp.responseText;
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

    <p id="tableTest">这里是输出位置</p>

    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span12">
                <h3>
                    h3. 这是一套可视化布局系统.
                </h3>
                <div class="row-fluid">
                    <div class="span6">
                        <blockquote>
                            <p>
                                github是一个全球化的开源社区.
                            </p> <small>关键词 <cite>开源</cite></small>
                        </blockquote>
                    </div>
                    <div class="span6">
                        <dl>
                            <dt>
                                Rolex
                            </dt>
                            <dd>
                                劳力士创始人为汉斯.威尔斯多夫，1908年他在瑞士将劳力士注册为商标。
                            </dd>
                            <dt>
                                Vacheron Constantin
                            </dt>
                            <dd>
                                始创于1775年的江诗丹顿已有250年历史，
                            </dd>
                            <dd>
                                是世界上历史最悠久、延续时间最长的名表之一。
                            </dd>
                            <dt>
                                IWC
                            </dt>
                            <dd>
                                创立于1868年的万国表有“机械表专家”之称。
                            </dd>
                            <dt>
                                Cartier
                            </dt>
                            <dd>
                                卡地亚拥有150多年历史，是法国珠宝金银首饰的制造名家。
                            </dd>
                        </dl>
                    </div>
                </div>
                <p>
                    <em>Git</em>是一个分布式的版本控制系统，最初由<strong>Linus Torvalds</strong>编写，用作Linux内核代码的管理。在推出后，Git在其它项目中也取得了很大成功，尤其是在Ruby社区中。
                </p>
                <div class="carousel slide" id="carousel-328965">
                    <ol class="carousel-indicators">
                        <li data-slide-to="0" data-target="#carousel-328965">
                        </li>
                        <li data-slide-to="1" data-target="#carousel-328965" class="active">
                        </li>
                        <li data-slide-to="2" data-target="#carousel-328965">
                        </li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="item">
                            <img alt="" src="img/1.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    棒球
                                </h4>
                                <p>
                                    棒球运动是一种以棒打球为主要特点，集体性、对抗性很强的球类运动项目，在美国、日本尤为盛行。
                                </p>
                            </div>
                        </div>
                        <div class="item active">
                            <img alt="" src="img/2.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    冲浪
                                </h4>
                                <p>
                                    冲浪是以海浪为动力，利用自身的高超技巧和平衡能力，搏击海浪的一项运动。运动员站立在冲浪板上，或利用腹板、跪板、充气的橡皮垫、划艇、皮艇等驾驭海浪的一项水上运动。
                                </p>
                            </div>
                        </div>
                        <div class="item">
                            <img alt="" src="img/3.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    自行车
                                </h4>
                                <p>
                                    以自行车为工具比赛骑行速度的体育运动。1896年第一届奥林匹克运动会上被列为正式比赛项目。环法赛为最著名的世界自行车锦标赛。
                                </p>
                            </div>
                        </div>
                    </div> <a data-slide="prev" href="#carousel-328965" class="left carousel-control">‹</a> <a data-slide="next" href="#carousel-328965" class="right carousel-control">›</a>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span2">
                <div class="btn-group">
                    <button class="btn" type="button" onclick="selectAllDept()">查询所有dept<em class="icon-align-left"></em></button>
                    <button class="btn" type="button">查询输入id的dept<em class="icon-align-center"></em></button>
                    <button class="btn" type="button">按钮3<em class="icon-align-right"></em></button>
                    <button class="btn" type="button">按钮4<em class="icon-align-justify"></em></button>
                </div>
            </div>

            <div class="span6">
                <table class="table" id="tableTest1">
                    <thead>
                    <tr>
                        <th>
                            *
                        </th>
                        <th>
                            部门ID
                        </th>
                        <th>
                            部门名称
                        </th>
                        <th>
                            备注
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            01/04/2012
                        </td>
                        <td>
                            Default
                        </td>
                    </tr>
                    <tr class="success">
                        <td>
                            1
                        </td>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            01/04/2012
                        </td>
                        <td>
                            Approved
                        </td>
                    </tr>
                    <tr class="error">
                        <td>
                            2
                        </td>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            02/04/2012
                        </td>
                        <td>
                            Declined
                        </td>
                    </tr>
                    <tr class="warning">
                        <td>
                            3
                        </td>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            03/04/2012
                        </td>
                        <td>
                            Pending
                        </td>
                    </tr>
                    <tr class="info">
                        <td>
                            4
                        </td>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            04/04/2012
                        </td>
                        <td>
                            Call in to confirm
                        </td>
                    </tr>
                    </tbody>
                </table>
                <%--<div class="pagination">--%>
                    <%--<ul>--%>
                        <%--<li>--%>
                            <%--<a href="#">上一页</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">1</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">2</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">3</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">4</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">5</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">下一页</a>--%>
                        <%--</li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
            </div>

            <div class="span4">
                <form class="form-search">
                    <input class="input-medium search-query" type="text" /> <button type="submit" class="btn">查找</button>
                </form>
            </div>
        </div>
    </div>


</body>
</html>