package com.foodies.models

import jakarta.persistence.*
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

@Entity
@Table(name = "menu_items")
data class MenuItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    @NotBlank(message = "Name is required")
    val name: String,

    @Column(nullable = false, length = 500)
    @NotBlank(message = "Description is required")
    val description: String,

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    val price: BigDecimal,

    @Column(name = "image_url")
    val imageUrl: String? = null,

    @Column(nullable = false)
    @NotBlank(message = "Category is required")
    val category: String,

    @ElementCollection
    @CollectionTable(name = "menu_item_ingredients", joinColumns = [JoinColumn(name = "menu_item_id")])
    @Column(name = "ingredient")
    val ingredients: List<String> = listOf(),

    @Column(name = "is_available")
    val isAvailable: Boolean = true,

    @Column(name = "created_at")
    val createdAt: java.time.LocalDateTime = java.time.LocalDateTime.now(),

    @Column(name = "updated_at")
    val updatedAt: java.time.LocalDateTime = java.time.LocalDateTime.now()
)
