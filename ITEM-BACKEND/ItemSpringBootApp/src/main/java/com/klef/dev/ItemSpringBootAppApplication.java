package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ItemSpringBootAppApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(ItemSpringBootAppApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ItemSpringBootAppApplication.class, args);
        System.out.println("Running.........!");
    }
}
