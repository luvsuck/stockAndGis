package com.luvsic.stock.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement(name = "Order")
@ToString
public class Order implements Serializable {
    private String orderNo;
    private Date addTime;
}
