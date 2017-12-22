package com.chatRobot.controller;

import com.chatRobot.model.Dept;
import com.chatRobot.service.IDeptService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/dept")
public class DeptController {

    @Resource
    private IDeptService deptService;

    @RequestMapping("/selectDept.do")
    public void selectDept (HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        long deptId = Long.parseLong(request.getParameter("id"));
        Dept dept = this.deptService.selectDept(deptId);
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(dept));
        response.getWriter().close();
    }

    @RequestMapping("/selectAll.do")
    public void selectAll (HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        List<Dept> deptList = this.deptService.selectAll();
        ObjectMapper mapper = new ObjectMapper();
        for (Dept dept : deptList) {
            response.getWriter().write(mapper.writeValueAsString(dept));
        }
        response.getWriter().close();
    }

    @RequestMapping("/insertDept.do")
    public void insertDept (HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

//        Dept dept = new Dept();
//        dept.setId(4);
//        dept.setName("部门名称4");
//        dept.setComment("备注4");
        long id = Long.parseLong(request.getParameter("id"));
        String name = request.getParameter("name");
        String comment = request.getParameter("comment");
        Dept dept = new Dept();
        dept.setId(id);
        dept.setName(name);
        dept.setComment(comment);

        int result = this.deptService.insertDept(dept);
        ObjectMapper mappter = new ObjectMapper();
        response.getWriter().write(mappter.writeValueAsString(result));
        if (result > 0) {
            response.getWriter().write(mappter.writeValueAsString("写入成功m"));
            response.getWriter().write("写入成功");
        }
        else {
            response.getWriter().write(mappter.writeValueAsString("写入失败m"));
            response.getWriter().write("写入失败");
        }
        response.getWriter().close();

    }

    @RequestMapping("/deleteDept.do")
    public void deleteDept (HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        long deptId = Long.parseLong((request.getParameter("id")));
        System.out.println("deptId=" + deptId);
        int result = this.deptService.deleteDept(deptId);
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(result));
        response.getWriter().write(result>0?"删除成功":"删除失败");
        response.getWriter().write(mapper.writeValueAsString(result>0?"删除成功":"删除失败"));
        response.getWriter().close();

    }

    @RequestMapping("/updateDept.do")
    public void updateDept (HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        long deptId = Long.parseLong((request.getParameter("id")));
        String name = request.getParameter("name");
        String comment = request.getParameter("comment");
        Dept dept = new Dept();
        dept.setId(deptId);
        dept.setName(name);
        dept.setComment(comment);
        int result = this.deptService.updateDept(dept);
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(result));
        response.getWriter().write(result>0? "更新成功":"更新失败");
        response.getWriter().write(mapper.writeValueAsString(result>0? "更新成功":"更新失败"));
        response.getWriter().close();
    }
}
