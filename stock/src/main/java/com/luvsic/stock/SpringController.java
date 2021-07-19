package com.luvsic.stock;

import com.alibaba.fastjson.JSONObject;
import com.luvsic.stock.dao.OrderDao;
import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;
import com.luvsic.stock.entity.Overlayer;
import com.luvsic.stock.service.OrderService;
import com.sun.tools.corba.se.idl.constExpr.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
public class SpringController {


    @Autowired
    private OrderService orderService;

    @Autowired
    OrderDao orderDao;


    @Produces({MediaType.APPLICATION_JSON + "charset='utf-8'"})
    @GetMapping(value = "/getAll")
    public String getOrders() {
        List<Order> orders = orderService.getOrderList();
        Object json = JSONObject.toJSON(orders);
        return json.toString();
    }


    @Produces({MediaType.APPLICATION_JSON + "charset='utf-8'"})
    @GetMapping(value = "/getDetails/{orderNo}")
    public String getDetails(@PathVariable("orderNo") String orderNo) {
        List<OrderDetails> details = orderService.getDetails(orderNo);
        Object json = JSONObject.toJSON(details);
        return json.toString();
    }

    @PostMapping(value = "/stockIn")
    public int stockIn(@RequestBody Map<String, Object> params) {
        return orderService.stockIn((String) params.get("orderNo"), (String) params.get("detailsNo"), ((Integer) params.get("inCount")));
    }

    @GetMapping("/getLayers")
    public Map<String, List<Overlayer>> getLayers() {
        List<Overlayer> list = orderDao.getAllLayers();
//        List<Overlayer> polygons = list.stream().filter(l -> l.getType() == 1).collect(Collectors.toList());
        Map<String, List<Overlayer>> collect = list.stream().collect(Collectors.groupingBy(o -> o.getType() + o.getCname()));
        System.out.println(collect);
        return collect;
    }

    @PostMapping(value = "/save")
    public int save(@RequestBody Map<String, Object> params) {
        System.out.println(params);
        List<List<Map<String, Double>>> polygons = (List<List<Map<String, Double>>>) params.get("polygon");
        Map<String, String> circles = (Map<String, String>) params.get("circle");
        orderDao.removeAll();
        int type = 1;
        for (int i = 0; i < polygons.size(); i++) {
            List<Map<String, Double>> lm = polygons.get(i);
            int finalI = i;
            lm.forEach(l -> {
                String lat = l.get("lat") + "";
                String lng = l.get("lng") + "";
                orderDao.addLayer(1, "", lat, lng, "p" + finalI);
            });
        }

        type = 2;
        circles.forEach((k, v) -> {
            String[] kArray = k.split(",");
            String lat = kArray[0];
            String lng = kArray[1];
            String content = v;
            orderDao.addLayer(2, v, lat, lng, "circle");
        });
        return 1;
    }
}
