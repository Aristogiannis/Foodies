package com.foodies.models

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "qr_codes")
data class QRCode(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val tableNumber: Int,

    @Column(nullable = false, unique = true)
    val qrCodeData: String,

    @Column(name = "menu_url", nullable = false)
    val menuUrl: String,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "is_active")
    val isActive: Boolean = true
)
