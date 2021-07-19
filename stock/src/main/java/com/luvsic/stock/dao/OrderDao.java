package com.luvsic.stock.dao;

import com.luvsic.stock.entity.Order;
import com.luvsic.stock.entity.OrderDetails;
import com.luvsic.stock.entity.Overlayer;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import javax.jws.WebParam;
import java.util.List;

@Repository
public interface OrderDao {
    List<Order> getAllOrderFromTable();

    List<OrderDetails> getDetailsByNo(@Param("orderNo") String orderNo);

    int stockIn(@WebParam(name = "orderNo") String orderNo, @WebParam(name = "detailsNo") String detailsNo, @WebParam(name = "amount") int amount);

    OrderDetails getDetailByDetailId(@WebParam(name = "orderNo") String orderNo, @WebParam(name = "detailsNo") String detailsNo);

    int removeAll();


    int addLayer(@WebParam(name = "type") int type, @WebParam(name = "content") String content, @WebParam(name = "lat") String lat, @WebParam(name = "lng") String lng, @WebParam(name = "cname") String cname);

    List<Overlayer> getAllLayers();
}
