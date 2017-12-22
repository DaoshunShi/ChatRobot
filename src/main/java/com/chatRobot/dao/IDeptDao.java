package com.chatRobot.dao;

import com.chatRobot.model.Dept;

import java.util.List;

public interface IDeptDao {

    Dept selectDept(long id);

    List<Dept> selectAll();

    int insertDept(Dept dept);

    int deleteDept(long id);

    int updateDept(Dept dept);

}
