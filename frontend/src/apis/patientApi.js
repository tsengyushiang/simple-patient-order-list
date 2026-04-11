import { invokeApi } from '../helper/invokeApi';

export const fetchPatients = async () => {
  return invokeApi.get('/api/patients', {
    failureMessage: 'Failed to fetch patients.'
  });
};
