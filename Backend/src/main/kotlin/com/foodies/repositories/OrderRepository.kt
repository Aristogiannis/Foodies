package com.foodies.repositories

import com.foodies.models.Order
import com.foodies.models.OrderStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface OrderRepository : JpaRepository<Order, Long> {
    fun findByStatus(status: OrderStatus): List<Order>
    fun findByTableNumber(tableNumber: Int): List<Order>
    fun findByTimestampBetween(start: LocalDateTime, end: LocalDateTime): List<Order>
    
    @Query("SELECT o FROM Order o ORDER BY o.timestamp DESC")
    fun findAllOrderByTimestampDesc(): List<Order>
    
    @Query("SELECT o FROM Order o WHERE o.status IN :statuses ORDER BY o.timestamp DESC")
    fun findByStatusInOrderByTimestampDesc(statuses: List<OrderStatus>): List<Order>
}
