import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { AppDataSource } from "./data-source.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Patient Order API",
            version: "1.0.0",
            description: "API for managing patients and their orders",
        },
        servers: [
            {
                url: "http://localhost/api",
                description: "Nginx Gateway",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

// Initialize Database Connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/", routes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
