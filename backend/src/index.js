import express from "express";
import { AppDataSource } from "./data-source.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

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

// API Routes
app.use("/", routes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
