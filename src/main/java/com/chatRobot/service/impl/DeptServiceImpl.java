package com.chatRobot.service.impl;

import com.chatRobot.dao.IDeptDao;
import com.chatRobot.model.Dept;
import com.chatRobot.service.IDeptService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("deptService")
public class DeptServiceImpl implements IDeptService {

    @Resource
    private IDeptDao deptDao;

    public Dept selectDept(long deptId) {
        return this.deptDao.selectDept(deptId);
    }

    public List<Dept> selectAll() {
        return this.deptDao.selectAll();
    }

    public int insertDept(Dept dept) {
        return this.deptDao.insertDept(dept);
    }

    public int deleteDept(long deptId) {
        return this.deptDao.deleteDept(deptId);
    }

    public int updateDept(Dept dept) {
        return this.deptDao.updateDept(dept);
    }
}
