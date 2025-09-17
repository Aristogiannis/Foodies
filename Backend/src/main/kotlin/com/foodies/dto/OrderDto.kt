package com.foodies.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal
import java.time.LocalDateTime

data class OrderItemRequest(
    @field:NotNull(message = "Menu item ID is required")
    val menuItemId: Long,

    @field:Min(value = 1, message = "Quantity must be at least 1")
    val quantity: Int = 1
)

data class OrderRequest(
    @field:NotEmpty(message = "Order must contain at least one item")
    val items: List<OrderItemRequest>,

    @field:DecimalMin(value = "0.0", message = "Tip must be positive")
    val tip: BigDecimal = BigDecimal.ZERO,

    val notes: String? = null,
    val tableNumber: Int? = null,
    val customerName: String? = null
)

data class OrderResponse(
    val id: Long,
    val items: List<OrderItemResponse>,
    val totalPrice: BigDecimal,
    val status: String,
    val timestamp: LocalDateTime,
    val tip: BigDecimal,
    val notes: String?,
    val tableNumber: Int?,
    val customerName: String?
)

data class OrderItemResponse(
    val id: Long,
    val menuItem: MenuItemResponse,
    val quantity: Int,
    val priceAtTime: BigDecimal
)

data class OrderStatusUpdateRequest(
    val status: String
)
