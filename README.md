# Full-Stack Patient & Order Management System

This project is a fully containerized full-stack application featuring a React frontend, a Node.js backend with TypeORM, PostgreSQL database, and Nginx as a reverse proxy. It follows modern structural patterns optimized for Docker deployments.

## 🚀 Quick Start

Ensure you have [Docker](https://www.docker.com/products/docker-desktop/) installed and running.

1. **Clone or download** this repository.
2. **Open a terminal** in the project root.
3. **Run the following command**:
   ```bash
   docker compose up -d --build
   ```
   > **Note:** If you are rebuilding the environment and want to ensure the latest database schema and seed data run successfully, always purge the old volume first: `docker compose down -v`

4. **Access the application**:
   - **Frontend UI**: [http://localhost](http://localhost)
   - **Backend API**: [http://localhost/api](http://localhost/api)

## 🏗️ Folder Architecture

```text
.
├── backend/                # Node.js + Express + TypeORM source
│   ├── src/
│   │   ├── controllers/    # API Request Handlers (e.g. PatientController)
│   │   ├── entities/       # Database Schema Rules (Patient, Order)
│   │   ├── middleware/     # Global Handlers (e.g. errorHandler)
│   │   ├── routes/         # Express Router Configuration 
│   │   ├── data-source.js  # DB Configuration & TypeORM initialization
│   │   └── index.js        # Express Server Entrypoint
│   ├── Dockerfile          # Backend container wrapper
│   └── package.json        
├── db/                     
│   └── init.sql            # Explicit DB schema & Seed data (Mounted via Docker)
├── frontend/               # React + Material UI source
│   ├── src/                
│   │   └── App.js          # Main Application code
│   └── Dockerfile          # Multi-stage automated production builder
├── nginx/                  
│   └── nginx.conf          # Reverse proxy mapping rules
└── docker-compose.yml      # Service orchestration
```

## 🛠️ Tech Stack

- **Frontend**: React (Create-React-App), Material UI (MUI).
- **Backend**: Node.js, Express, TypeORM.
- **Syntax**: Native ES6 Modules (`import` / `export`).
- **Database**: PostgreSQL 15.
- **Proxy/Web Server**: Nginx.
- **Infrastructure**: Docker & Docker Compose.

## ⚙️ Features

- **Automated Healthchecks**: The backend container dynamically pauses operation until it detects that the Postgres service is healthy.
- **MVC Structural Pattern**: Codebase strictly separates Routes, Logic (Controllers), and Models (Entities), making scaling drastically easier.
- **Global Error Handling**: Express natively routes internal failures directly to a centralized middleware handler, catching stack-traces gracefully.
- **Volume Driven Initialization**: Data seeding and table synchronization run entirely separated from runtime APIs.
- **Unified Proxy Setup**: Web access is restricted explicitly via an Nginx edge-router—meaning `CORS` logic is completely unnecessary!
