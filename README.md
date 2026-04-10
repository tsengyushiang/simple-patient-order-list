# Full-Stack Patient & Order Management System

This project is a containerized full-stack application featuring a React frontend, Node.js backend with TypeORM, PostgreSQL database, and Nginx as a reverse proxy.

## 🚀 Quick Start

Ensure you have [Docker](https://www.docker.com/products/docker-desktop/) installed and running.

1. **Clone or download** this repository.
2. **Open a terminal** in the project root.
3. **Run the following command**:
   ```bash
   docker compose up -d --build
   ```
4. **Access the application**:
   - **Frontend**: [http://localhost](http://localhost)
   - **Backend API**: [http://localhost/api](http://localhost/api)

## 🏗️ Folder Architecture

```text
.
├── backend/                # Node.js + Express + TypeORM source
│   ├── src/
│   │   ├── entities.js     # TypeORM Entity schemas (Patient, Order)
│   │   └── index.js        # Express server & DB initialization
│   ├── Dockerfile          # Backend container definition
│   └── package.json        # Node dependencies
├── frontend/               # React + Material UI source
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Main UI component with MUI
│   │   └── index.js        # React entry point
│   ├── Dockerfile          # Multi-stage build (Build -> Nginx)
│   └── package.json        # React dependencies (MUI included)
├── nginx/                  # Edge Routing configuration
│   └── nginx.conf          # Reverse proxy rules (/api -> backend, / -> frontend)
└── docker-compose.yml      # Service orchestration (db, backend, frontend, nginx)
```

## 🛠️ Tech Stack

- **Frontend**: React (Create-React-App), Material UI (MUI).
- **Backend**: Node.js, Express, TypeORM.
- **Database**: PostgreSQL 15.
- **Proxy/Web Server**: Nginx.
- **Infrastructure**: Docker & Docker Compose.

## ⚙️ Features

- **Automated Healthchecks**: The backend waits for the PostgreSQL database to be fully "Ready" before attempting to connect.
- **Seed Data**: Automatically populates the `patients` table with initial data if empty.
- **Reverse Proxy**: Unified entry point via port 80, routing traffic seamlessly between frontend and backend.
