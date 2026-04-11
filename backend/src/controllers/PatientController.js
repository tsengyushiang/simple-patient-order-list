import * as patientService from "../services/patientService.js";

/**
 * Controller for patient operations.
 */
export const getAll = async (req, res, next) => {
    try {
        const patients = await patientService.getAllPatients();
        
        res.json({
            status: "success",
            data: patients
        });
    } catch (error) {
        next(error);
    }
};
