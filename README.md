# Foodies - Restaurant Ordering System

A modern restaurant ordering system that allows customers to scan QR codes at tables to view menus and place orders digitally. Business owners can manage menus, generate QR codes, and track orders through an admin interface.

## Features

### Customer Features
- **QR Code Ordering**: Scan table QR codes to access digital menu
- **Digital Menu**: Browse menu items with descriptions, prices, and ingredients
- **Easy Ordering**: Add items to cart and place orders
- **Real-time Updates**: View order status in real-time

### Business Features
- **Menu Management**: Add, edit, and remove menu items
- **QR Code Generation**: Generate QR codes for restaurant tables
- **Order Management**: View and update order statuses
- **User Authentication**: Secure login system for business owners
- **File Upload**: Upload images for menu items

## Technology Stack

### Backend (Kotlin + Spring Boot)
- **Spring Boot 3.2.0**: Main framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Database operations
- **H2/PostgreSQL**: Database (H2 for development, PostgreSQL for production)
- **JWT**: Token-based authentication
- **ZXing**: QR code generation
- **Gradle**: Build tool

### Frontend (React + TypeScript)
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **CSS3**: Styling

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Web server for frontend
- **PostgreSQL**: Production database

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Foodies
   ```

2. **Start All Services (Choose any one)**
   ```bash
   # Option 1: Using the start script
   ./start.sh
   
   # Option 2: Using Make command
   make start-all
   # or simply
   make start
   # or
   make run
   
   # Option 3: Direct Docker Compose
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Database: PostgreSQL on localhost:5432

## Development Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose (for containerized setup)

### Backend Development
1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```

2. Run the application:
   ```bash
   ./gradlew bootRun
   ```

3. Access H2 Console (development): http://localhost:8080/api/h2-console
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

### Frontend Development
1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Access the application: http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Menu Management
- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items?available=true` - Get available menu items
- `POST /api/menu-items` - Create menu item (auth required)
- `PUT /api/menu-items/{id}` - Update menu item (auth required)
- `DELETE /api/menu-items/{id}` - Delete menu item (auth required)

### Order Management
- `POST /api/orders` - Place new order
- `GET /api/orders` - Get all orders (auth required)
- `GET /api/orders?active=true` - Get active orders (auth required)
- `PUT /api/orders/{id}/status` - Update order status (auth required)

### QR Code Management
- `POST /api/qr-codes` - Generate QR codes (auth required)
- `GET /api/qr-codes` - Get all QR codes (auth required)

## Default Credentials

For testing purposes, the application comes with sample data:

**Business Owner Account:**
- Email: admin@foodies.com
- Password: admin123

**Regular User Account:**
- Email: user@foodies.com  
- Password: user123

## Project Structure

```
Foodies/
├── Backend/                 # Kotlin Spring Boot API
│   ├── src/main/kotlin/
│   │   └── com/foodies/
│   │       ├── controllers/ # REST controllers
│   │       ├── services/    # Business logic
│   │       ├── models/      # JPA entities
│   │       ├── repositories/# Data access
│   │       ├── dto/         # Data transfer objects
│   │       ├── config/      # Configuration
│   │       └── security/    # Security components
│   ├── src/main/resources/
│   │   ├── application.yml  # Main config
│   │   ├── application-docker.yml # Docker config
│   │   └── data.sql        # Sample data
│   └── Dockerfile
├── Frontend/               # React TypeScript app
│   ├── src/
│   │   ├── pages/         # React components/pages
│   │   ├── models/        # TypeScript models
│   │   ├── context/       # React context
│   │   └── services/      # CSS files
│   ├── nginx.conf         # Nginx configuration
│   └── Dockerfile
├── docker-compose.yml     # Multi-container setup
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
