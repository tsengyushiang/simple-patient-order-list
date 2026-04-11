import { invokeApi } from '../helper/invokeApi';

export const getApiData = async () => {
  return invokeApi.get('/api', {
    failureMessage: 'Failed to fetch patients from the server.'
  });
};
