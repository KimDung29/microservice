# SHOPPING

## I. Introduction

This project follows a `microservice` architecture and includes three main components:

- `Client`: The web interface.
- `Gateway`: The intermediary that routes requests from the client to the respective services.
- `Services`: The backend processing services. The database uses postgres with sequelize framework

## II. Project Setup

- Step 1: Clone the project

```
git clone https://github.com/KimDung29/microservice.git
```

- Step 2: Navigate to the shopping directory

```
cd shopping
```

- Step 3: Set up the client

```
cd client
npm i
npm run dev
```

-Step 4: Set up the gateway and create database, migration, and seeding for the microservices.

```
cd gateway
npm i
npm run db:create
npm run db:migate
npm run db:seed
npm start
```

- Step 5: Set up the microservices. Navigate to the services directory

```
cd services
```

Set up the a1-user-service

```
cd a1-user-service
npm i
npm start
```

Set up the b1-auth-service

```
cd b1-auth-service
npm i
npm start
```

Set up the c1-product-service

```
cd c1-product-service
npm i
npm start
```

#### Project setup is complete (DON'T forget to create your own .env.development file)

#### You can log in using the following accounts: `admin@gmail.com` with the password: `123Ad!@#`

## III. Project Details

### Client

- Built with ReactJS.
- Features include:
  - User account creation
  - Login and logout.
  - Automatic token renewal.
  - Add, edit, delete products.

### Gateway

- Routes requests from the client to the server.
- Features include:
  - Integration of the cluster module for request handling, performance improvement, and process creation.
  - Middleware for handling authentication, role validation, and file uploads.
  - Database creation, migration, and seeding for the microservices.
  - Logging.

### Services

- Handles backend logic.
- Includes three microservices:
  - `a1-user-service`: Handles all user-related requests.
  - `b1-auth-service`: Manages authentication and token processes.
  - `c1-product-service`: Manages authentication and token processes.
