package com.matthewchhay.employeeCreator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class HelloWorld {
    @GetMapping("/test")
    public String test() {
        return "Hello world!";
    }
}
