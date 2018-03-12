package com.chatRobot.dao;

import com.chatRobot.model.Goods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IGoodsDao {

    List<Map<String, Object>> countByGroups ();
    List<Goods> selectAll();
}
