import { trace } from '@opentelemetry/api';
import { AppDataSource } from "../data-source.js";
import Patient from "../entities/Patient.js";

const tracer = trace.getTracer('my-node-service');

export const getAllPatients = async () => {
    return tracer.startActiveSpan('service', async (span) => {
    try {
      span.setAttributes({
        function: 'getAllPatients',
      });

    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.find();
    } finally {
      span.end();
    }
  });
};

export const getPatientById = async (id) => {
    const patientRepository = AppDataSource.getRepository(Patient);
    return await patientRepository.findOneBy({ id });
};
