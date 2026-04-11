import { eventDispatcher } from './eventDispatcher';

const coreFetch = async (url, options = {}) => {
  const { successMessage, failureMessage, ...fetchOptions } = options;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

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

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = null; 
    }

    if (successMessage) {
      eventDispatcher.dispatch('toast', {
        type: 'success',
        text: successMessage
      });
    }

    return data;
  } catch (error) {
    let errorText = failureMessage || error.message || 'An unexpected error occurred';
    
    if (!failureMessage && error.name === 'TypeError' && error.message === 'Failed to fetch') {
      errorText = 'Network error or unable to connect to server.';
    }

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
