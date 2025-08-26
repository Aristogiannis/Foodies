package com.foodies.repositories

import com.foodies.models.MenuItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MenuItemRepository : JpaRepository<MenuItem, Long> {
    fun findByCategory(category: String): List<MenuItem>
    fun findByIsAvailable(isAvailable: Boolean): List<MenuItem>
    fun findByCategoryAndIsAvailable(category: String, isAvailable: Boolean): List<MenuItem>
    fun findByNameContainingIgnoreCase(name: String): List<MenuItem>
}
