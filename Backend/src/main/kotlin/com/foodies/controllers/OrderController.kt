package com.foodies.controllers

import com.foodies.dto.OrderRequest
import com.foodies.dto.OrderResponse
import com.foodies.dto.OrderStatusUpdateRequest
import com.foodies.services.OrderService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = ["http://localhost:5173", "http://localhost:3000"])
class OrderController(
    private val orderService: OrderService
) {

    @PostMapping
    fun createOrder(@Valid @RequestBody request: OrderRequest): ResponseEntity<OrderResponse> {
        return try {
            val order = orderService.createOrder(request)
            ResponseEntity.ok(order)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping
    fun getAllOrders(@RequestParam(required = false) active: Boolean?): ResponseEntity<List<OrderResponse>> {
        val orders = if (active == true) {
            orderService.getActiveOrders()
        } else {
            orderService.getAllOrders()
        }
        return ResponseEntity.ok(orders)
    }

    @GetMapping("/{id}")
    fun getOrderById(@PathVariable id: Long): ResponseEntity<OrderResponse> {
        return try {
            val order = orderService.getOrderById(id)
            ResponseEntity.ok(order)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/table/{tableNumber}")
    fun getOrdersByTable(@PathVariable tableNumber: Int): ResponseEntity<List<OrderResponse>> {
        val orders = orderService.getOrdersByTable(tableNumber)
        return ResponseEntity.ok(orders)
    }

    @PutMapping("/{id}/status")
    fun updateOrderStatus(
        @PathVariable id: Long,
        @Valid @RequestBody request: OrderStatusUpdateRequest
    ): ResponseEntity<OrderResponse> {
        return try {
            val order = orderService.updateOrderStatus(id, request)
            ResponseEntity.ok(order)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        }
    }
}
