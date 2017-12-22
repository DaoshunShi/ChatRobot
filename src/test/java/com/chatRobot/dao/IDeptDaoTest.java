package com.chatRobot.dao;

import com.chatRobot.model.Dept;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

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


}
