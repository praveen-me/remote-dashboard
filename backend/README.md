# Mercor Backend

This is the backend for the Mercor project, built with Node.js, TypeScript, and Express. It uses Drizzle ORM and MySQL for database operations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v18 or higher)
- **npm** or **Yarn** (npm comes with Node.js)
- **MySQL** (Ensure the MySQL server is running)
- **Docker** (Ensure the Docker is running)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mercor-backend.git
cd mercor-backend
```

### 2. Install dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

or if you are using Yarn:

```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory of the project and configure the following environment variables:

```env
# Example environment variables
REMOTE_HOST= ###
REMOTE_USER= ###
REMOTE_PASSWORD= ###
REMOTE_DB= ###
LOCAL_DB= ###
LOCAL_USER= ###
LOCAL_PASSWORD= ###
DB_URI= ###
PORT= ###
```

### 4. Start the MySQL Database

If you have a script to start your MySQL container, you can use the following command:

```bash
npm run db_up
```

### 6. Seed the Database

If you want to seed the database with initial data, run the following command:

```bash
npm run seed
```

### 7. Running the Application

- **Development Mode:**

  To run the application in development mode with live reload support, use:

  ```bash
  npm run dev
  ```

- **Production Mode:**

  To build and run the application in production mode, use:

  ```bash
  npm run build
  npm start
  ```

### 8. Linting

To check and fix linting issues, run:

```bash
npm run lint
```

## Project Structure

- **src/**: Contains the source code, including routes, controllers, services, and utilities.
- **scripts/**: Contains shell scripts for database management.
- **dist/**: Contains the compiled JavaScript code (after running `npm run build`).

## Useful Commands

- `npm run drizzle_kit`: Opens the Drizzle Studio for database management.
- `npm run copy_db`: Copies the remote database to your local development environment.
- `npm run seed`: Seeds the database with initial data.
