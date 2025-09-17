package com.foodies.controllers

import com.foodies.dto.MenuItemRequest
import com.foodies.dto.MenuItemResponse
import com.foodies.services.MenuItemService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.math.BigDecimal

@RestController
@RequestMapping("/menu-items")
@CrossOrigin(origins = ["http://localhost:5173", "http://localhost:3000"])
class MenuItemController(
    private val menuItemService: MenuItemService
) {

    @GetMapping
    fun getAllMenuItems(@RequestParam(required = false) available: Boolean?): ResponseEntity<List<MenuItemResponse>> {
        val menuItems = if (available == true) {
            menuItemService.getAvailableMenuItems()
        } else {
            menuItemService.getAllMenuItems()
        }
        return ResponseEntity.ok(menuItems)
    }

    @GetMapping("/{id}")
    fun getMenuItemById(@PathVariable id: Long): ResponseEntity<MenuItemResponse> {
        return try {
            val menuItem = menuItemService.getMenuItemById(id)
            ResponseEntity.ok(menuItem)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/category/{category}")
    fun getMenuItemsByCategory(@PathVariable category: String): ResponseEntity<List<MenuItemResponse>> {
        val menuItems = menuItemService.getMenuItemsByCategory(category)
        return ResponseEntity.ok(menuItems)
    }

    @PostMapping(consumes = ["multipart/form-data"])
    fun createMenuItem(
        @RequestParam name: String,
        @RequestParam description: String,
        @RequestParam price: BigDecimal,
        @RequestParam category: String,
        @RequestParam(required = false) ingredients: List<String>?,
        @RequestParam(required = false) isAvailable: Boolean?,
        @RequestParam(required = false) photo: MultipartFile?
    ): ResponseEntity<MenuItemResponse> {
        return try {
            val request = MenuItemRequest(
                name = name,
                description = description,
                price = price,
                category = category,
                ingredients = ingredients ?: emptyList(),
                isAvailable = isAvailable ?: true
            )
            val menuItem = menuItemService.createMenuItem(request, photo)
            ResponseEntity.ok(menuItem)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }

    @PutMapping("/{id}")
    fun updateMenuItem(
        @PathVariable id: Long,
        @Valid @RequestBody request: MenuItemRequest,
        @RequestParam(required = false) photo: MultipartFile?
    ): ResponseEntity<MenuItemResponse> {
        return try {
            val menuItem = menuItemService.updateMenuItem(id, request, photo)
            ResponseEntity.ok(menuItem)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteMenuItem(@PathVariable id: Long): ResponseEntity<Void> {
        return try {
            menuItemService.deleteMenuItem(id)
            ResponseEntity.noContent().build()
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }

    @PatchMapping("/{id}/toggle-availability")
    fun toggleAvailability(@PathVariable id: Long): ResponseEntity<MenuItemResponse> {
        return try {
            val menuItem = menuItemService.toggleAvailability(id)
            ResponseEntity.ok(menuItem)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }
}
