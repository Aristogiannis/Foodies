package com.foodies.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class MenuItemRequest(
    @field:NotBlank(message = "Name is required")
    val name: String,

    @field:NotBlank(message = "Description is required")
    val description: String,

    @field:NotNull(message = "Price is required")
    @field:DecimalMin(value = "0.0", message = "Price must be positive")
    val price: BigDecimal,

    @field:NotBlank(message = "Category is required")
    val category: String,

    val ingredients: List<String> = listOf(),
    val isAvailable: Boolean = true
)

data class MenuItemResponse(
    val id: Long,
    val name: String,
    val description: String,
    val price: BigDecimal,
    val imageUrl: String?,
    val category: String,
    val ingredients: List<String>,
    val isAvailable: Boolean
)
