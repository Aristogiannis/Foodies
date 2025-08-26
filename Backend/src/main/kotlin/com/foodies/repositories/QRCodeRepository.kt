package com.foodies.repositories

import com.foodies.models.QRCode
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface QRCodeRepository : JpaRepository<QRCode, Long> {
    fun findByTableNumber(tableNumber: Int): Optional<QRCode>
    fun findByQrCodeData(qrCodeData: String): Optional<QRCode>
    fun findByIsActive(isActive: Boolean): List<QRCode>
    fun existsByTableNumber(tableNumber: Int): Boolean
}
