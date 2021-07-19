package com.luvsic.stock;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;
import org.springframework.stereotype.Controller;

@Controller
@MapperScan("com.luvsic.stock.dao")
@SpringBootApplication
@ImportResource(locations = {"classpath:cxf-config.xml"})
public class StockApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockApplication.class, args);
    }

}
