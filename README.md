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
│   │   ├── controllers/    # Request handlers (Parsing & Response)
│   │   ├── services/       # Business & Data logic (Isolated Layer)
│   │   ├── entities/       # Database Schema Rules (Patient, Order)
│   │   ├── middleware/     # Global Handlers (e.g. errorHandler)
│   │   ├── routes/         # Modular Routers (Patient, Order, API)
│   │   ├── data-source.js  # DB Configuration & TypeORM initialization
│   │   └── index.js        # Express Server Entrypoint
│   ├── Dockerfile          # Backend container wrapper
│   └── package.json        
├── db/                     
│   └── init.sql            # Explicit DB schema & Seed data (Mounted via Docker)
├── frontend/               # React + Material UI source
│   ├── src/                
│   │   ├── apis/           # Modular API Services (Patient, Order)
│   │   ├── components/     # Atomic UI Library (Dialog, List, AddTextfield...)
│   │   ├── features/       # Feature Orchestrators (Patient, OrderDialog)
│   │   ├── helper/         # Utilities (invokeApi, eventDispatcher)
│   │   ├── hooks/          # Hooks (usePromise)
│   │   └── App.js          # Entrypoint
│   └── Dockerfile          # Multi-stage automated production builder
├── nginx/                  
│   └── nginx.conf          # Reverse proxy mapping rules
└── docker-compose.yml      # Service orchestration
```

## 🛠️ Tech Stack

- **Frontend**: React (Hooks-based), Material UI (MUI).
- **Backend**: Node.js, Express, TypeORM.
- **Design Pattern**: MVC (Backend) & Container/Presenter (Frontend).
- **Communication**: Pub/Sub Event Dispatching for Global UI Notifications.
- **Syntax**: Native ES6 Modules (`import` / `export`).
- **Database**: PostgreSQL 15.
- **Proxy/Web Server**: Nginx.
- **Infrastructure**: Docker & Docker Compose.

## ⚙️ Features

- **MVC & Service Pattern**: Strictly separates Routes, request orchestration (Controllers), and business logic (Services).
- **Functional Programming Transition**: Replaced class-based architecture with clean, composable functional exports.
- **RESTful Resource Management**: Full CRUD support for Patient-Order relationships with resource-based URLs.
- **Swagger Documentation**: Live, interactive API docs available at `/api-docs` using JSDoc-driven specifications.
- **Data Integrity & Security**: Built-in verification for patient existence and order ownership during operations.
- **Soft Delete Support**: Orders are preserved with `deletedAt` timestamps instead of being hard-deleted.
- **Automated Healthchecks**: The backend container dynamically pauses operation until it detects that the Postgres service is healthy.
- **Modular Frontend Architecture**: Logic is cleanly separated from presentation via dedicated `features` and `components` directories.
- **Global Toast System**: A decoupled event-driven notification system handles success and error messages via a centralized `eventDispatcher`.
- **Skeleton Loading & Refresh logic**: Integrated generic `RefreshableList` component provides a native-app feel with built-in loading states.
- **Centralized API Client**: `invokeApi` provides a standardized fetch wrapper with automatic error trapping and toast publishing.
- **Strict UI Library Isolation**: All Material UI code is constrained to the `components` folder, keeping features logic-centric and portable.
- **Unified Proxy Setup**: Web access is restricted explicitly via an Nginx edge-router—meaning `CORS` logic is completely unnecessary!
- **Responsive Master-Detail Directory**: An interactive patient list that opens modal-based order management.
- **Atomic UI System**: A suite of generic building blocks (`AddTextfield`, `EditableTextfield`, `ListItem`, `Dialog`) that standardize the interface.
- **Skeleton Loading Transitions**: Seamless UX using shimmering skeletons during data fetching instead of plain text.
- **Standardized API Hooks**: Automated loading/error states across the whole app via the unified `usePromise` hook.
- **Soft Delete Support**: Secure data preservation with `deletedAt` timestamps for all order operations.
- **MVC & Service Pattern**: Backend strictly separates Routes, Orchestration (Controllers), and Business Logic (Services).
- **Swagger Documentation**: Live, interactive API documentation integrated at `/api-docs`.
- **Infrastructure Healthchecks**: The backend container dynamically pauses until the database is fully ready.
- **Unified Proxy Setup**: Web access is restricted via Nginx, making `CORS` configuration obsolete.
