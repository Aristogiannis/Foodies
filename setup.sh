#!/bin/bash

# Foodies Setup Script
echo "🍽️  Setting up Foodies Restaurant Ordering System..."

# Download Gradle Wrapper JAR
echo "📦 Downloading Gradle Wrapper..."
cd Backend
# Check if it's a real jar file (size > 1000 bytes) or just a placeholder
if [ ! -f "gradle/wrapper/gradle-wrapper.jar" ] || [ $(stat -f%z "gradle/wrapper/gradle-wrapper.jar" 2>/dev/null || stat -c%s "gradle/wrapper/gradle-wrapper.jar" 2>/dev/null || echo 0) -lt 1000 ]; then
    curl -L -o gradle/wrapper/gradle-wrapper.jar https://github.com/gradle/gradle/raw/v8.5.0/gradle/wrapper/gradle-wrapper.jar
    echo "✅ Gradle wrapper downloaded"
else
    echo "✅ Gradle wrapper already exists"
fi

# Make gradlew executable
chmod +x gradlew
echo "✅ Made gradlew executable"

cd ..

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p Backend/uploads Backend/qr-codes
echo "✅ Created upload and QR code directories"

# Check Docker installation
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available (either as plugin or standalone)
if ! docker compose version &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker with Compose plugin."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Quick Start Options:"
echo ""
echo "1. Full Production Setup:"
echo "   docker-compose up --build"
echo "   Then visit: http://localhost:3000"
echo ""
echo "2. Development Setup (Backend only):"
echo "   make dev"
echo "   Then start frontend separately: cd Frontend && npm run dev"
echo ""
echo "3. Using Makefile (recommended):"
echo "   make help          # Show all available commands"
echo "   make quick-start   # Quick demo setup"
echo ""
echo "Default test accounts:"
echo "  Business: admin@foodies.com / admin123"
echo "  User: user@foodies.com / user123"
echo ""
echo "Happy coding! 🚀"
