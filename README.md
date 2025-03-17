# Project Setup Guide

This README provides step-by-step instructions for setting up and deploying the project.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Postman](https://www.postman.com/)
- [MySQL](https://www.mysql.com/)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

### 2. Install Dependencies
```bash
npm install    # or npm i
```

### 3. Start the Project
- Start the backend:
```bash
npm start
```
- Start the frontend:
```bash
npm run dev
```

## Database Setup

### Set Up MySQL Database
1. Create a new database:
```sql
CREATE DATABASE node_project_db;
```

2. Create necessary tables:
```sql
USE node_project_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Third-Party Services

### Stripe Integration
1. Sign up for a [Stripe account](https://stripe.com/)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/)
3. Configure in your project:
```js
const stripe = require('stripe')('your-stripe-secret-key');
```

### Cloudinary Setup
1. Sign up for a [Cloudinary account](https://cloudinary.com/)
2. Get your API credentials from the [Cloudinary Dashboard](https://cloudinary.com/console)
3. Configure in your project:
```js
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
});
```

## Test Account

For testing purposes, you can use the following admin account:
- **Email**: admin@gmail.com
- **Password**: 1234
- **Role**: admin

## Deployment

1. Set up your production environment (Heroku, AWS, DigitalOcean, etc.)
2. Configure environment variables
3. Push your code to the server
4. Run build steps (e.g., `npm run build` for React frontend)
5. Start the project on your server

## Testing

Use Postman to test API endpoints (GET, POST, PUT, DELETE requests).

## Documentation

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Cloudinary API Documentation](https://cloudinary.com/documentation)

---

With these steps, your project should be fully set up and ready for both development and production environments.
