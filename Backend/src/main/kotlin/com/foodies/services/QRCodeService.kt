package com.foodies.services

import com.foodies.dto.QRCodeRequest
import com.foodies.dto.QRCodeResponse
import com.foodies.models.QRCode
import com.foodies.repositories.QRCodeRepository
import com.google.zxing.BarcodeFormat
import com.google.zxing.EncodeHintType
import com.google.zxing.MultiFormatWriter
import com.google.zxing.client.j2se.MatrixToImageWriter
import com.google.zxing.common.BitMatrix
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.io.ByteArrayOutputStream
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Service
@Transactional
class QRCodeService(
    private val qrCodeRepository: QRCodeRepository
) {

    fun generateQRCodes(request: QRCodeRequest): List<QRCodeResponse> {
        val qrCodes = mutableListOf<QRCodeResponse>()

        for (tableNumber in 1..request.numTables) {
            // Check if QR code for this table already exists
            if (qrCodeRepository.existsByTableNumber(tableNumber)) {
                continue // Skip if already exists
            }

            val qrCodeData = "${request.menuUrl}?table=$tableNumber"
            
            // Generate QR code image
            generateQRCodeImage(qrCodeData, tableNumber)

            val qrCode = QRCode(
                tableNumber = tableNumber,
                qrCodeData = qrCodeData,
                menuUrl = request.menuUrl
            )

            val savedQRCode = qrCodeRepository.save(qrCode)
            qrCodes.add(toResponse(savedQRCode))
        }

        return qrCodes
    }

    fun getAllQRCodes(): List<QRCodeResponse> {
        return qrCodeRepository.findAll().map { toResponse(it) }
    }

    fun getActiveQRCodes(): List<QRCodeResponse> {
        return qrCodeRepository.findByIsActive(true).map { toResponse(it) }
    }

    fun getQRCodeByTable(tableNumber: Int): QRCodeResponse {
        val qrCode = qrCodeRepository.findByTableNumber(tableNumber)
            .orElseThrow { IllegalArgumentException("QR code not found for table: $tableNumber") }
        return toResponse(qrCode)
    }

    fun updateQRCodeStatus(id: Long, isActive: Boolean): QRCodeResponse {
        val qrCode = qrCodeRepository.findById(id)
            .orElseThrow { IllegalArgumentException("QR code not found with id: $id") }
        
        val updatedQrCode = qrCode.copy(isActive = isActive)
        val savedQrCode = qrCodeRepository.save(updatedQrCode)
        return toResponse(savedQrCode)
    }

    private fun generateQRCodeImage(data: String, tableNumber: Int) {
        try {
            val hints = mapOf(
                EncodeHintType.CHARACTER_SET to "UTF-8",
                EncodeHintType.MARGIN to 1
            )

            val bitMatrix: BitMatrix = MultiFormatWriter().encode(
                data,
                BarcodeFormat.QR_CODE,
                300,
                300,
                hints
            )

            // Create qr-codes directory if it doesn't exist
            val qrCodesDir = Paths.get("qr-codes")
            Files.createDirectories(qrCodesDir)

            // Save QR code image
            val outputPath = qrCodesDir.resolve("table_$tableNumber.png")
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", outputPath)

        } catch (e: Exception) {
            throw RuntimeException("Failed to generate QR code for table $tableNumber", e)
        }
    }

    private fun toResponse(qrCode: QRCode): QRCodeResponse {
        return QRCodeResponse(
            id = qrCode.id,
            tableNumber = qrCode.tableNumber,
            qrCodeData = qrCode.qrCodeData,
            menuUrl = qrCode.menuUrl,
            isActive = qrCode.isActive
        )
    }
}
