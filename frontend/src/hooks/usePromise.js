import { useState, useCallback } from 'react';

export const usePromise = (promiseFn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await promiseFn(...args);
      setData(result);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [promiseFn]);

  return { data, isLoading, error, execute };
};
