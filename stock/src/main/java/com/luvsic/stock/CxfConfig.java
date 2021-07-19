package com.luvsic.stock;

//import org.glassfish.jersey.jackson.internal.jackson.jaxrs.json.JacksonJsonProvider;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.luvsic.stock.serviceImpl.OrderServiceImpl;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.apache.cxf.transport.servlet.CXFServlet;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.xml.ws.Endpoint;

@Configuration
public class CxfConfig {

    @Bean
    public ServletRegistrationBean newServlet() {
        return new ServletRegistrationBean(new CXFServlet(), "/cxf/*");
    }

    @Bean(name = Bus.DEFAULT_BUS_ID)
    public SpringBus springBus() {
        return new SpringBus();
    }


    @Bean
    @Qualifier("orderServiceImpl") // 注入webService
    public Endpoint endpoint(OrderServiceImpl orderServiceImpl) {
        EndpointImpl endpoint = new EndpointImpl(springBus(), orderServiceImpl);
        endpoint.publish("/orderService");// 暴露webService api
        return endpoint;
    }
    @Bean("jsonProvider") // 构造一个json转化bean，用于将student转化为json
    public JacksonJsonProvider getJacksonJsonProvider() {
        return new JacksonJsonProvider();

    }
}