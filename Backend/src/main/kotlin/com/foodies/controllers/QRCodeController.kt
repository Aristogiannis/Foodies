package com.foodies.controllers

import com.foodies.dto.QRCodeRequest
import com.foodies.dto.QRCodeResponse
import com.foodies.services.QRCodeService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/qr-codes")
@CrossOrigin(origins = ["http://localhost:5173", "http://localhost:3000"])
class QRCodeController(
    private val qrCodeService: QRCodeService
) {

    @PostMapping
    fun generateQRCodes(@Valid @RequestBody request: QRCodeRequest): ResponseEntity<List<QRCodeResponse>> {
        return try {
            val qrCodes = qrCodeService.generateQRCodes(request)
            ResponseEntity.ok(qrCodes)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping
    fun getAllQRCodes(@RequestParam(required = false) active: Boolean?): ResponseEntity<List<QRCodeResponse>> {
        val qrCodes = if (active == true) {
            qrCodeService.getActiveQRCodes()
        } else {
            qrCodeService.getAllQRCodes()
        }
        return ResponseEntity.ok(qrCodes)
    }

    @GetMapping("/table/{tableNumber}")
    fun getQRCodeByTable(@PathVariable tableNumber: Int): ResponseEntity<QRCodeResponse> {
        return try {
            val qrCode = qrCodeService.getQRCodeByTable(tableNumber)
            ResponseEntity.ok(qrCode)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{id}/status")
    fun updateQRCodeStatus(
        @PathVariable id: Long,
        @RequestParam isActive: Boolean
    ): ResponseEntity<QRCodeResponse> {
        return try {
            val qrCode = qrCodeService.updateQRCodeStatus(id, isActive)
            ResponseEntity.ok(qrCode)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }
}
