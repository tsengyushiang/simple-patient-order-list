import { AppDataSource } from "../data-source.js";
import Patient from "../entities/Patient.js";

export const getAllPatients = async () => {
    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.find();
};

export const getPatientById = async (id) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.findOneBy({ id });
};
