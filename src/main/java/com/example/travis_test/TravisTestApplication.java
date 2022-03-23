package com.example.travis_test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TravisTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravisTestApplication.class, args);
    }

}
