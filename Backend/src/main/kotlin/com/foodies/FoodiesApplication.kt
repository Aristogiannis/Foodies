package com.foodies

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FoodiesApplication

fun main(args: Array<String>) {
    runApplication<FoodiesApplication>(*args)
}
