require("reflect-metadata");
const express = require("express");
const { DataSource } = require("typeorm");
const cors = require("cors");
const { Patient, Order } = require("./entities");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "db",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "app_db",
    synchronize: true,
    logging: false,
    entities: [Patient, Order],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
        // Seed initial patient data if not exists
        const patientRepository = AppDataSource.getRepository(Patient);
        const count = await patientRepository.count();
        if (count === 0) {
            console.log("No patients found, inserting initial data...");
            const firstPatient = patientRepository.create({
                name: "John Doe",
                age: 35
            });
            await patientRepository.save(firstPatient);
            console.log("Initial patient saved.");
        }

    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

// Simple GET route
app.get("/", async (req, res) => {
    try {
        const patientRepository = AppDataSource.getRepository(Patient);
        const patients = await patientRepository.find({ relations: ["orders"] });
        res.json({
            status: "success",
            message: "Hello from Backend API",
            timestamp: new Date().toISOString(),
            patients: patients
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
