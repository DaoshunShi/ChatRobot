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
}
