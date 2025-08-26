# Use the official OpenJDK 17 image
FROM openjdk:17-jdk-slim

# Install curl for downloading gradle wrapper
RUN apt-get update && apt-get install -y curl && apt-get clean

# Set working directory
WORKDIR /app

# Copy gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Download gradle wrapper jar if it doesn't exist
RUN if [ ! -f "gradle/wrapper/gradle-wrapper.jar" ]; then \
        curl -L -o gradle/wrapper/gradle-wrapper.jar \
        https://github.com/gradle/gradle/raw/v8.5.0/gradle/wrapper/gradle-wrapper.jar; \
    fi

# Make gradlew executable
RUN chmod +x ./gradlew

# Copy source code
COPY src src

# Build the application
RUN ./gradlew build -x test

# Create uploads directory
RUN mkdir -p uploads qr-codes

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "build/libs/foodies-backend-0.0.1-SNAPSHOT.jar"]
