import { eventDispatcher } from './eventDispatcher';
import { traceAsync } from './tracker';

const coreFetch = async (url, options = {}) => {
  const { successMessage, failureMessage, ...fetchOptions } = options;

  try {
    const response = await traceAsync('invoke-api', () => fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    }),{
      url,
    })

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (successMessage) {
      eventDispatcher.dispatch('toast', {
        type: 'success',
        text: successMessage
      });
    }

    return data;
  } catch (error) {
    const errorText = failureMessage || error.message || 'An unexpected error occurred';

    eventDispatcher.dispatch('toast', {
      type: 'error',
      text: errorText
    });

    throw error;
  }
};

export const invokeApi = {
  get: (url, options = {}) => coreFetch(url, { ...options, method: 'GET' }),
  post: (url, body, options = {}) => coreFetch(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url, body, options = {}) => coreFetch(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url, options = {}) => coreFetch(url, { ...options, method: 'DELETE' }),
};
