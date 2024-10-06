import { useState } from 'react';
import axios from 'axios';
const useApi = (baseURL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const request = async (method, url, body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${baseURL}${url}`,
        data: body,
        headers, 
      });
      setData(response.data);
      return response.data; 
    } catch (err) {
      setError(err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };
  const get = (url, headers) => request('GET', url, null, headers); 
  const post = (url, body) => request('POST', url, body);
  const put = (url, body) => request('PUT', url, body);
  const del = (url) => request('DELETE', url);
  return { loading, error, data, get, post, put, del };
};
export default useApi;
