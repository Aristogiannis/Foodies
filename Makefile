# Foodies - Makefile for easy development and deployment

.PHONY: help build up down logs clean test dev prod

# Default target
help: ## Show this help message
	@echo "Foodies - Restaurant Ordering System"
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Quick aliases
start: start-all ## Alias for start-all
run: start-all   ## Alias for start-all

# Development commands
dev: ## Start development environment (backend only with PostgreSQL)
	docker-compose -f docker-compose.dev.yml up --build

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

# Production commands
build: ## Build all containers
	docker-compose build --no-cache

up: ## Start production environment
	docker-compose up -d

start-all: ## Start all services (frontend, backend, database) at once
	docker compose up --build

prod: ## Start production environment with build
	docker-compose up --build -d

down: ## Stop all containers
	docker-compose down

logs: ## Show logs for all services
	docker-compose logs -f

# Utility commands
clean: ## Remove all containers, volumes, and images
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -af

test-backend: ## Run backend tests
	cd Backend && ./gradlew test

test-frontend: ## Run frontend tests
	cd Frontend && npm test

# Database commands
db-reset: ## Reset database (removes all data)
	docker-compose down postgres
	docker volume rm foodies_postgres_data
	docker-compose up -d postgres

db-shell: ## Connect to database shell
	docker-compose exec postgres psql -U foodies_user -d foodies

# Individual service commands
backend-only: ## Start only backend with database
	docker-compose up -d postgres backend

frontend-only: ## Start only frontend
	docker-compose up -d frontend

# Monitoring
status: ## Show status of all containers
	docker-compose ps

# Quick commands
restart: down up ## Restart all services
quick-start: build up logs ## Quick start for demos
