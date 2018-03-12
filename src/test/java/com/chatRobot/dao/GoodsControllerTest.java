package com.chatRobot.dao;

import com.chatRobot.controller.GoodsController;
import com.chatRobot.service.IGoodsService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

// 加载spring配置文件
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis.xml"})
public class GoodsControllerTest {
    @Autowired
    private IGoodsService goodsService;

    @Test
    public void countByControllerTest() {
        List<Map<String, Object>> list = goodsService.countByGroups();
        for (Map<String, Object> map : list) {
            String key = (String) map.keySet().iterator().next();
            Object value = map.get(key);
            System.out.println(key + " " + value.toString());
        }
    }
}
