import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useHttp = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      const data = await response.json();
      console.log(data.message,'th')

      if (!response.ok) {
        throw new Error(data.message || 'Request failed!');
      }

      // Handle redirection based on the received data
      if (data.message=='Invalid Token') {
        navigation('/userlogin');
      } else if (data.role === 'Admin') {
        navigation('/AdminPanel'); // Fixed typo: changed AdminPan; to AdminPan
      } else if (data.role == 'User') {
        navigation('./userlogin');
      }

      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong!');
      throw err; // Re-throwing the error for further handling
    }
  }, [navigation]); // Added navigation to dependency array

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useHttp;
