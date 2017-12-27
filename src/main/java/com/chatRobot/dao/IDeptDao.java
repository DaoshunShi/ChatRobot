package com.chatRobot.dao;

import com.chatRobot.model.Dept;

import java.util.List;
import java.util.Map;

public interface IDeptDao {

    List<Dept> selectByFy(Map<String, Object> param);

    Dept selectDept(long id);

    List<Dept> selectAll();

    int insertDept(Dept dept);

    int deleteDept(long id);

    int updateDept(Dept dept);

}
