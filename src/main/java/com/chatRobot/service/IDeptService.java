package com.chatRobot.service;

import com.chatRobot.model.Dept;

import java.util.List;
import java.util.Map;

public interface IDeptService {

    public Map<String,Object> selectByFy(Map<String, Object> param);

    public Dept selectDept(long deptId);

    public List<Dept> selectAll();

    public int insertDept(Dept dept);

    public int deleteDept(long deptId);

    public int updateDept(Dept dept);

}
