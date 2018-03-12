package com.chatRobot.controller;

import com.chatRobot.service.IGoodsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/goods")
public class GoodsController {

    @Resource
    private IGoodsService goodsService;

    @RequestMapping(value = "countByGroup")
    @ResponseBody
    private List<Map<String, Object>> countByGroups() {
        List<Map<String, Object>> list = goodsService.countByGroups();
        return list;
    }
}
