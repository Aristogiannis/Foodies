#!/bin/bash

# Foodies - Start All Services Script
echo "🍽️  Starting Foodies Restaurant Ordering System..."
echo ""
echo "Starting all services:"
echo "  📱 Frontend (React + Nginx) - http://localhost:3000"
echo "  🔧 Backend (Kotlin + Spring Boot) - http://localhost:8080/api"
echo "  🗄️  Database (PostgreSQL) - localhost:5432"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start all services with Docker Compose
echo "🚀 Building and starting containers..."
docker compose up --build

# Note: This will run in foreground showing logs
# To run in background, use: docker compose up --build -d
