package com.foodies.models

import jakarta.persistence.*
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "orders")
data class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @OneToMany(mappedBy = "order", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val items: MutableList<OrderItem> = mutableListOf(),

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Total price is required")
    @DecimalMin(value = "0.0", message = "Total price must be positive")
    val totalPrice: BigDecimal,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: OrderStatus = OrderStatus.PENDING,

    @Column(nullable = false)
    val timestamp: LocalDateTime = LocalDateTime.now(),

    @Column(precision = 10, scale = 2)
    @DecimalMin(value = "0.0", message = "Tip must be positive")
    val tip: BigDecimal = BigDecimal.ZERO,

    @Column(length = 500)
    val notes: String? = null,

    @Column(name = "table_number")
    val tableNumber: Int? = null,

    @Column(name = "customer_name")
    val customerName: String? = null
)

@Entity
@Table(name = "order_items")
data class OrderItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    val order: Order? = null,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_item_id")
    val menuItem: MenuItem,

    @Column(nullable = false)
    val quantity: Int = 1,

    @Column(nullable = false, precision = 10, scale = 2)
    val priceAtTime: BigDecimal
)

enum class OrderStatus {
    PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED
}
