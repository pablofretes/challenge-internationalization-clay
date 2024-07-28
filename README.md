# Project Name

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Testing](#testing)
6. [Running with Docker](#running-with-docker)
   - [Docker Compose](#docker-compose)

## Introduction

This project consists of a backend and a frontend application. The backend is built with Node.js and TypeScript, and the frontend is built with Vite and React. The applications can be run independently or together using Docker.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Docker (if you plan to use Docker)
- Docker Compose (if you plan to use Docker Compose)

## Installation

To get started, clone the repository and install the dependencies for both the backend and the frontend.

git clone https://github.com/pablofretes/challenge-internationalization-clay.git
cd project-name

### Backend

1. Navigate to the backend directory:

    cd backend

2. Install the dependencies:

    npm install

### Frontend

1. Navigate to the frontend directory:

    cd ../frontend

2. Install the dependencies:

    npm install

## Running the Application

### Backend

To start the backend server, you have multiple options.
But beforehand please remember to setup your .env files
to contain values that correspond with the env.example
files in both directories

#### Development Mode

In development mode, the server will restart automatically when code changes are detected:

cd backend
npm run dev

#### Production Mode

In production mode, the code will be built and then served:

cd backend
npm start

### Frontend

To start the frontend application, you have multiple options.

#### Development Mode

In development mode, the frontend will run with hot-reloading:

cd frontend
npm run dev

#### Production Mode

In production mode, the frontend will be built and then served:

cd frontend
npm run build
npm start

## Testing

### Backend

To run tests for the backend:

cd backend
npm test

## Running with Docker

If you prefer to use Docker, you can start both the backend and the frontend using Docker Compose. Ensure Docker and Docker Compose are installed on your machine.

### Docker Compose

1. Ensure you are in the root directory of the project (where the `docker-compose.yml` file is located).

2. Build and run the services defined in the `docker-compose.yml` file:

    docker-compose up --build

This command will build the Docker images and start the services. The backend and frontend will be accessible at their respective ports defined in the `docker-compose.yml` file.

If you have been able to run the program you can use this user
  - username: pablo
  - password: 123456