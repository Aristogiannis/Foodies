package com.foodies.services

import com.foodies.models.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*

@Service
class JwtService {

    @Value("\${jwt.secret}")
    private lateinit var secret: String

    @Value("\${jwt.expiration}")
    private var expiration: Long = 0

    private fun getSigningKey(): Key {
        val keyBytes = secret.toByteArray()
        return Keys.hmacShaKeyFor(keyBytes)
    }

    fun generateToken(user: User): String {
        val claims = mapOf(
            "userId" to user.id,
            "username" to user.username,
            "role" to user.role.name
        )

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.email)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + expiration * 1000))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    fun extractClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .body
    }

    fun extractUsername(token: String): String {
        return extractClaims(token).subject
    }

    fun extractUserId(token: String): Long {
        val userIdClaim = extractClaims(token)["userId"]
        return when (userIdClaim) {
            is Long -> userIdClaim
            is Int -> userIdClaim.toLong()
            is Number -> userIdClaim.toLong()
            is String -> userIdClaim.toLong()
            else -> throw IllegalArgumentException("Invalid userId claim type: ${userIdClaim?.javaClass}")
        }
    }

    fun isTokenValid(token: String): Boolean {
        return try {
            extractClaims(token)
            !isTokenExpired(token)
        } catch (e: Exception) {
            false
        }
    }

    private fun isTokenExpired(token: String): Boolean {
        return extractClaims(token).expiration.before(Date())
    }
}
