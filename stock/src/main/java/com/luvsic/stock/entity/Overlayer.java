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
@XmlRootElement(name = "Overlayer")
@ToString
public class Overlayer implements Serializable {
    private int cid;
    private int type;
    private String content;
    private String lat;
    private String lng;
    private String cname;
}
