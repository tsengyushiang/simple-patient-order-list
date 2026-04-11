import { invokeApi } from '../helper/invokeApi';

/**
 * Fetch all patients.
 */
export const fetchPatients = async () => {
  return invokeApi.get('/api/patients', {
    failureMessage: 'Failed to fetch patients.'
  });
};
