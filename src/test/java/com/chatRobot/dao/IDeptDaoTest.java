package com.chatRobot.dao;

import com.chatRobot.model.Dept;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 加载spring配置文件
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis.xml"})
public class IDeptDaoTest {

    @Autowired
    private IDeptDao dao;

    @Test
    public void testSelectDept () throws Exception {
        long id = 1;
        Dept dept = dao.selectDept(id);
        System.out.println(dept.getName());
    }

    @Test
    public void testSelectAll() throws Exception {
        List<Dept> deptList = dao.selectAll();
        System.out.println(deptList.size());
        for (Dept dept : deptList) {
            System.out.println(dept.getName());
        }
    }

    @Test
    public void testInsertDept() throws Exception {
        Dept dept = new Dept();
        dept.setId(4l);
        dept.setName("部门名称4Test");
        dept.setComment("备注4Test");
        int result = dao.insertDept(dept);
        System.out.println(result);
        System.out.println(result>0?"写入成功":"写入失败");
    }

//    @Test
//    public void testDeleteDept() throws Exception {
//        long id = 4;
//        int result = dao.deleteDept(id);
//        System.out.println(result);
//        System.out.println(result>0?"删除成功":"删除失败");
//    }

    @Test
    public void testUpdateDept() throws Exception {
        Dept dept = new Dept();
        dept.setId(4);
        dept.setName("部门名称4 Test update");
        dept.setComment("备注4 Test update");
        int result = dao.updateDept(dept);
        System.out.println(result);
        System.out.println(result>0? "更新成功":"更新失败");
    }

    @Test
    public void testSelectByFy() throws Exception {

        /*所需参数*/
//        Map<String, Object> param=new HashMap<String, Object>();
//        int a=(pageNumber-1)*pageSize;
//        int b=pageSize;
//        param.put("a", a);
//        param.put("b", b);
//        param.put("name", name);
//        param.put("id", id);
//        param.put("comment", comment);
//        return deptService.selectByFy(param);

        Map<String, Object> param = new HashMap<String, Object>();
        int a = 1;
        int b = 4;
        param.put("a", a);
        param.put("b", b);
        param.put("name", null);
        param.put("id", null);
        String comment = "备注";
        comment = "%" + comment + "%";
        param.put("comment", comment);
        List<Dept> deptList = dao.selectByFy(param);
        for (Dept dept : deptList) {
            System.out.println(dept.getId() + " " + dept.getName() + " " + dept.getComment());
        }

    }


}
