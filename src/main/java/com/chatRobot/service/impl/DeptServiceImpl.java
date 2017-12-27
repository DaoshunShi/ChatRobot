package com.chatRobot.service.impl;

import com.chatRobot.dao.IDeptDao;
import com.chatRobot.model.Dept;
import com.chatRobot.service.IDeptService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("deptService")
public class DeptServiceImpl implements IDeptService {

    @Resource
    private IDeptDao deptDao;

    @Override
    public Map<String,Object> selectByFy(Map<String, Object> param) {
        //bootstrap-table要求服务器返回的json须包含：totlal，rows
        Map<String,Object> result = new HashMap<String,Object>();
        int total=deptDao.selectByFy(null).size();
        List<Dept> rows=deptDao.selectByFy(param);
        result.put("total",total);
        result.put("rows",rows);
        return result;
    }

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
