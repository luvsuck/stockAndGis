package com.luvsic.stock.resource;

import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public interface OrderInterface {
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/getOrders")
    public List<Order> getOrderList();

    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/getDetails/{orderNo}")
    public List<OrderDetails> getDetailsByNo(@PathParam("orderNo") String orderNo);
}