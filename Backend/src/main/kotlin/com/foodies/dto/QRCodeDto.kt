package com.foodies.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class QRCodeRequest(
    @field:NotBlank(message = "Menu URL is required")
    val menuUrl: String,

    @field:NotNull(message = "Number of tables is required")
    @field:Min(value = 1, message = "Number of tables must be at least 1")
    @field:Max(value = 100, message = "Number of tables cannot exceed 100")
    val numTables: Int
)

data class QRCodeResponse(
    val id: Long,
    val tableNumber: Int,
    val qrCodeData: String,
    val menuUrl: String,
    val isActive: Boolean
)
