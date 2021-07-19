package com.luvsic.stock.service;

import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML}) // 返回类型
@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML}) // 请求类型
@WebService
public interface OrderService {
    @WebMethod
    public List<Order> getOrderList();

    @WebMethod
    public List<OrderDetails> getDetails(@WebParam(name = "orderNo") String orderNo);

    @WebMethod
    public int stockIn(@WebParam(name = "orderNo") String orderNo, @WebParam(name = "detailsNo") String detailsNo, @WebParam(name = "amount") int amount);
}
