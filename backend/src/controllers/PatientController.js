import { AppDataSource } from "../data-source.js";
import Patient from "../entities/Patient.js";

class PatientController {
    static async getAll(req, res, next) {
        try {
            const patientRepository = AppDataSource.getRepository(Patient);
            const patients = await patientRepository.find({ relations: ["orders"] });
            
            res.json({
                status: "success",
                message: "Hello from Backend API (ES Modules)",
                timestamp: new Date().toISOString(),
                patients: patients
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }
}

export default PatientController;
