# Elysium OS API Documentation

Welcome to the Elysium OS API documentation. This document provides detailed information about the APIs available in the Elysium OS platform, including endpoints, request/response formats, and usage examples.

## Authentication

### POST /auth/login
Authenticates a user and returns an `authToken`.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/register
Registers a new user.

**Request:**
```json
{
  "username": "newuser@example.com",
  "password": "password123",
  "profile": {
    "name": "New User",
    "preferences": {}
  }
}
```

**Response:**
```json
{
  "message": "User registered successfully."
}
```

## User Management

### GET /user/profile
Retrieves the profile of the authenticated user.

**Headers:**
```
Authorization: Bearer <authToken>
```

**Response:**
```json
{
  "userProfile": {
    "name": "User",
    "preferences": {}
  }
}
```

## Marketplace

### GET /marketplace/products
Lists all products available in the marketplace.

**Response:**
```json
{
  "products": [
    {
      "id": "product-123",
      "name": "Product Name",
      "description": "Product Description",
      "price": 0.05,
      "currency": "ETH"
    }
  ]
}
```

### POST /marketplace/purchase
Initiates a purchase of a product.

**Headers:**
```
Authorization: Bearer <authToken>
```

**Request:**
```json
{
  "productId": "product-123"
}
```

**Response:**
```json
{
  "message": "Purchase successful.",
  "transactionId": "tx-456"
}
```

## Game Management

### POST /game/create
Creates a new game session.

**Headers:**
```
Authorization: Bearer <authToken>
```

**Request:**
```json
{
  "gameData": {
    "name": "New Game",
    "rules": {}
  }
}
```

**Response:**
```json
{
  "message": "Game created successfully.",
  "gameId": "game-789"
}
```

### GET /game/sessions
Lists all active game sessions.

**Response:**
```json
{
  "games": [
    {
      "id": "game-789",
      "name": "Existing Game",
      "players": ["user-1", "user-2"]
    }
  ]
}
```

## Butler/Consigliere

### POST /butler/tasks
Creates a new task for the Butler/Consigliere to handle.

**Headers:**
```
Authorization: Bearer <authToken>
```

**Request:**
```json
{
  "task": {
    "description": "Schedule a meeting",
    "details": {
      "participants": ["user-1", "user-2"],
      "datetime": "2023-04-05T09:00:00Z"
    }
  }
}
```

**Response:**
```json
{
  "message": "Task scheduled successfully."
}
```

## Error Handling

All API endpoints follow a standard error response format.

**Response:**
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description."
  }
}
```

This documentation is a living document and will be updated as new features are added and existing features are improved. For more detailed information on specific implementations, please refer to the respective feature implementation documentation files, such as `Butler_Consigliere_Implementation.md`, `Arena_Implementation.md`, `Automation_Station_Implementation.md`, `Marketplace_Implementation.md`, `Converging_Paths_Implementation.md`, and `Metarealms_Clash_Implementation.md`.