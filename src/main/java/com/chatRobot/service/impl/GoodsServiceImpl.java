package com.chatRobot.service.impl;

import com.chatRobot.dao.IGoodsDao;
import com.chatRobot.service.IGoodsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("goodsService")
public class GoodsServiceImpl implements IGoodsService {
    @Resource
    private IGoodsDao goodsDao;

    public List<Map<String, Object>> countByGroups() {
        return goodsDao.countByGroups();
    }
}
