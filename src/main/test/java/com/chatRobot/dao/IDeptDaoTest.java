package com.chatRobot.dao;

import com.chatRobot.model.Dept;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

// 加载spring配置文件
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis.xml"})
public class IDeptDaoTest {

    @Autowired
    private IDeptDao dao;

    @Test
    private void testSelectDept () throws Exception {
        long id = 1;
        Dept dept = dao.selectDept(id);
        System.out.println(dept.getName());
    }

}
