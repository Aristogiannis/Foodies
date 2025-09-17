package com.foodies.services

import com.foodies.dto.*
import com.foodies.models.User
import com.foodies.models.UserRole
import com.foodies.repositories.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            .orElseThrow { IllegalArgumentException("Invalid email or password") }

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("Invalid email or password")
        }

        val token = jwtService.generateToken(user)
        return AuthResponse(
            token = token,
            user = UserResponse(
                id = user.id,
                username = user.username,
                email = user.email,
                role = user.role.name
            )
        )
    }

    fun signup(request: SignupRequest): AuthResponse {
        if (request.password != request.confirmPassword) {
            throw IllegalArgumentException("Passwords do not match")
        }

        if (userRepository.existsByEmail(request.email)) {
            throw IllegalArgumentException("Email already exists")
        }

        if (userRepository.existsByUsername(request.username)) {
            throw IllegalArgumentException("Username already exists")
        }

        val user = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password),
            role = UserRole.USER
        )

        val savedUser = userRepository.save(user)
        val token = jwtService.generateToken(savedUser)

        return AuthResponse(
            token = token,
            user = UserResponse(
                id = savedUser.id,
                username = savedUser.username,
                email = savedUser.email,
                role = savedUser.role.name
            )
        )
    }
}
