package com.chatRobot.service;

import com.chatRobot.model.Dept;

import java.util.List;

public interface IDeptService {

    public Dept selectDept(long deptId);

    public List<Dept> selectAll();

    public int insertDept(Dept dept);

    public int deleteDept(long deptId);

    public int updateDept(Dept dept);

}
