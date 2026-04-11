import { AppDataSource } from "../data-source.js";
import Patient from "../entities/Patient.js";

/**
 * Fetch all patients with their related orders.
 * @returns {Promise<Array>}
 */
export const getAllPatients = async () => {
    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.find();
};

/**
 * Fetch a patient by ID.
 * @param {number} id 
 * @returns {Promise<Object|null>}
 */
export const getPatientById = async (id) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.findOneBy({ id });
};
