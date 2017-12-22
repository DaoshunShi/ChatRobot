package com.chatRobot.service.impl;

import com.chatRobot.dao.IDeptDao;
import com.chatRobot.model.Dept;
import com.chatRobot.service.IDeptService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("deptService")
public class DeptServiceImpl implements IDeptService {

    @Resource
    private IDeptDao deptDao;

    public Dept selectDept(long deptId) {
        return this.deptDao.selectDept(deptId);
    }
}
