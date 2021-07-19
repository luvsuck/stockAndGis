package com.luvsic.stock.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@XmlRootElement(name = "OrderDetails")
public class OrderDetails implements Serializable {
    private String orderNo;
    private String detailsNo;
    private String descr;
    private int amounts;
    private String locationId;
    private String detailsName;
    private int stockAmount;
    private String addTime;
}
