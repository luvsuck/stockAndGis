package com.luvsic.stock.resource;

import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;
import com.luvsic.stock.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/")
public class OrderInterfaceImpl implements OrderInterface {
    @Autowired
    OrderService orderService;

    @Override
    @GET
    @Path("/getOrders")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Order> getOrderList() {
        System.out.println("1?");
        return orderService.getOrderList();
    }

    @Override
    @GET
    @Path("/getDetails/{orderNo}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<OrderDetails> getDetailsByNo(@PathParam("orderNo") String orderNo) {
        return orderService.getDetails(orderNo);
    }
}
