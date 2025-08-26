package com.foodies.services

import com.foodies.dto.*
import com.foodies.models.Order
import com.foodies.models.OrderItem
import com.foodies.models.OrderStatus
import com.foodies.repositories.MenuItemRepository
import com.foodies.repositories.OrderRepository
import com.foodies.repositories.OrderItemRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal

@Service
@Transactional
class OrderService(
    private val orderRepository: OrderRepository,
    private val menuItemRepository: MenuItemRepository,
    private val orderItemRepository: OrderItemRepository
) {

    fun createOrder(request: OrderRequest): OrderResponse {
        var totalPrice = BigDecimal.ZERO
        val orderItems = mutableListOf<OrderItem>()

        // Validate and calculate total price
        for (itemRequest in request.items) {
            val menuItem = menuItemRepository.findById(itemRequest.menuItemId)
                .orElseThrow { IllegalArgumentException("Menu item not found with id: ${itemRequest.menuItemId}") }

            if (!menuItem.isAvailable) {
                throw IllegalArgumentException("Menu item '${menuItem.name}' is not available")
            }

            val itemPrice = menuItem.price.multiply(BigDecimal.valueOf(itemRequest.quantity.toLong()))
            totalPrice = totalPrice.add(itemPrice)
        }

        totalPrice = totalPrice.add(request.tip)

        // Create order
        val order = Order(
            totalPrice = totalPrice,
            status = OrderStatus.PENDING,
            tip = request.tip,
            notes = request.notes,
            tableNumber = request.tableNumber,
            customerName = request.customerName
        )

        val orderWithItems = order.copy(items = orderItems)
        val savedOrder = orderRepository.save(orderWithItems)

        // Create order items and associate them with the saved order
        for (itemRequest in request.items) {
            val menuItem = menuItemRepository.findById(itemRequest.menuItemId).get()
            val orderItem = OrderItem(
                order = savedOrder,
                menuItem = menuItem,
                quantity = itemRequest.quantity,
                priceAtTime = menuItem.price
            )
            // Add to the mutable list
            savedOrder.items.add(orderItem)
        }

        // Save the order with items
        val finalSavedOrder = orderRepository.save(savedOrder)

        return toResponse(finalSavedOrder)
    }

    fun getAllOrders(): List<OrderResponse> {
        return orderRepository.findAllOrderByTimestampDesc().map { toResponse(it) }
    }

    fun getActiveOrders(): List<OrderResponse> {
        val activeStatuses = listOf(
            OrderStatus.PENDING,
            OrderStatus.CONFIRMED,
            OrderStatus.PREPARING,
            OrderStatus.READY
        )
        return orderRepository.findByStatusInOrderByTimestampDesc(activeStatuses).map { toResponse(it) }
    }

    fun getOrderById(id: Long): OrderResponse {
        val order = orderRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Order not found with id: $id") }
        return toResponse(order)
    }

    fun updateOrderStatus(id: Long, request: OrderStatusUpdateRequest): OrderResponse {
        val order = orderRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Order not found with id: $id") }

        val newStatus = try {
            OrderStatus.valueOf(request.status.uppercase())
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid order status: ${request.status}")
        }

        val updatedOrder = order.copy(status = newStatus)
        val savedOrder = orderRepository.save(updatedOrder)

        return toResponse(savedOrder)
    }

    fun getOrdersByTable(tableNumber: Int): List<OrderResponse> {
        return orderRepository.findByTableNumber(tableNumber).map { toResponse(it) }
    }

    private fun toResponse(order: Order): OrderResponse {
        return OrderResponse(
            id = order.id,
            items = order.items.map { toOrderItemResponse(it) },
            totalPrice = order.totalPrice,
            status = order.status.name,
            timestamp = order.timestamp,
            tip = order.tip,
            notes = order.notes,
            tableNumber = order.tableNumber,
            customerName = order.customerName
        )
    }

    private fun toOrderItemResponse(orderItem: OrderItem): OrderItemResponse {
        return OrderItemResponse(
            id = orderItem.id,
            menuItem = MenuItemResponse(
                id = orderItem.menuItem.id,
                name = orderItem.menuItem.name,
                description = orderItem.menuItem.description,
                price = orderItem.menuItem.price,
                imageUrl = orderItem.menuItem.imageUrl,
                category = orderItem.menuItem.category,
                ingredients = orderItem.menuItem.ingredients,
                isAvailable = orderItem.menuItem.isAvailable
            ),
            quantity = orderItem.quantity,
            priceAtTime = orderItem.priceAtTime
        )
    }
}
