package com.foodies.services

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@Service
class FileStorageService {

    private val uploadDir: Path = Paths.get("uploads")

    init {
        try {
            Files.createDirectories(uploadDir)
        } catch (ex: Exception) {
            throw RuntimeException("Could not create upload directory!", ex)
        }
    }

    fun storeFile(file: MultipartFile): String {
        // Normalize file name
        val originalFileName = file.originalFilename ?: "unknown"
        val fileName = UUID.randomUUID().toString() + "_" + originalFileName

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw RuntimeException("Filename contains invalid path sequence $fileName")
            }

            // Copy file to the target location (Replacing existing file with the same name)
            val targetLocation = uploadDir.resolve(fileName)
            Files.copy(file.inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING)

            return "/uploads/$fileName"
        } catch (ex: IOException) {
            throw RuntimeException("Could not store file $fileName. Please try again!", ex)
        }
    }

    fun loadFileAsResource(fileName: String): Path {
        try {
            val filePath = uploadDir.resolve(fileName).normalize()
            if (Files.exists(filePath)) {
                return filePath
            } else {
                throw RuntimeException("File not found $fileName")
            }
        } catch (ex: Exception) {
            throw RuntimeException("File not found $fileName", ex)
        }
    }
}
