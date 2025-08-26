package com.foodies.services

import com.foodies.dto.MenuItemRequest
import com.foodies.dto.MenuItemResponse
import com.foodies.models.MenuItem
import com.foodies.repositories.MenuItemRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime

@Service
@Transactional
class MenuItemService(
    private val menuItemRepository: MenuItemRepository,
    private val fileStorageService: FileStorageService
) {

    fun getAllMenuItems(): List<MenuItemResponse> {
        return menuItemRepository.findAll().map { toResponse(it) }
    }

    fun getAvailableMenuItems(): List<MenuItemResponse> {
        return menuItemRepository.findByIsAvailable(true).map { toResponse(it) }
    }

    fun getMenuItemsByCategory(category: String): List<MenuItemResponse> {
        return menuItemRepository.findByCategoryAndIsAvailable(category, true).map { toResponse(it) }
    }

    fun getMenuItemById(id: Long): MenuItemResponse {
        val menuItem = menuItemRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Menu item not found with id: $id") }
        return toResponse(menuItem)
    }

    fun createMenuItem(request: MenuItemRequest, imageFile: MultipartFile?): MenuItemResponse {
        val imageUrl = imageFile?.let { fileStorageService.storeFile(it) }

        val menuItem = MenuItem(
            name = request.name,
            description = request.description,
            price = request.price,
            imageUrl = imageUrl,
            category = request.category,
            ingredients = request.ingredients,
            isAvailable = request.isAvailable
        )

        val savedMenuItem = menuItemRepository.save(menuItem)
        return toResponse(savedMenuItem)
    }

    fun updateMenuItem(id: Long, request: MenuItemRequest, imageFile: MultipartFile?): MenuItemResponse {
        val existingMenuItem = menuItemRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Menu item not found with id: $id") }

        val imageUrl = imageFile?.let { fileStorageService.storeFile(it) } ?: existingMenuItem.imageUrl

        val updatedMenuItem = existingMenuItem.copy(
            name = request.name,
            description = request.description,
            price = request.price,
            imageUrl = imageUrl,
            category = request.category,
            ingredients = request.ingredients,
            isAvailable = request.isAvailable,
            updatedAt = LocalDateTime.now()
        )

        val savedMenuItem = menuItemRepository.save(updatedMenuItem)
        return toResponse(savedMenuItem)
    }

    fun deleteMenuItem(id: Long) {
        if (!menuItemRepository.existsById(id)) {
            throw IllegalArgumentException("Menu item not found with id: $id")
        }
        menuItemRepository.deleteById(id)
    }

    fun toggleAvailability(id: Long): MenuItemResponse {
        val menuItem = menuItemRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Menu item not found with id: $id") }

        val updatedMenuItem = menuItem.copy(
            isAvailable = !menuItem.isAvailable,
            updatedAt = LocalDateTime.now()
        )

        val savedMenuItem = menuItemRepository.save(updatedMenuItem)
        return toResponse(savedMenuItem)
    }

    private fun toResponse(menuItem: MenuItem): MenuItemResponse {
        return MenuItemResponse(
            id = menuItem.id,
            name = menuItem.name,
            description = menuItem.description,
            price = menuItem.price,
            imageUrl = menuItem.imageUrl,
            category = menuItem.category,
            ingredients = menuItem.ingredients,
            isAvailable = menuItem.isAvailable
        )
    }
}
