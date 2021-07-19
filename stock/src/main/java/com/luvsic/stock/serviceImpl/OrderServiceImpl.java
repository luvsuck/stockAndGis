package com.luvsic.stock.serviceImpl;

import com.luvsic.stock.dao.OrderDao;
import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;
import com.luvsic.stock.service.OrderService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@Component
@WebService(endpointInterface = "com.luvsic.stock.service.OrderService") // webservice接口的全类名
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;

    @Override
    public List<Order> getOrderList() {
        return orderDao.getAllOrderFromTable();
    }

    @Override
    public List<OrderDetails> getDetails(String orderNo) {
        return orderDao.getDetailsByNo(orderNo);
    }

    @Override
    public int stockIn(@WebParam(name = "orderNo") String orderNo, @WebParam(name = "detailsNo") String detailsNo, @WebParam(name = "amount") int amount) {
        OrderDetails orderDetails = orderDao.getDetailByDetailId(orderNo, detailsNo);
        if (orderDetails.getAmounts() >= (orderDetails.getStockAmount() + amount)) {
            int ans = orderDao.stockIn(orderNo, detailsNo, amount);
            try {
                Thread.sleep(30000L);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return ans;
        }
        return -1;
    }
}
