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
  const get = (url,body, headers) => request('GET', url, body, headers); 
  const post = (url, headers,body) => request('POST', url,headers, body);
  const put = (url,headers, body) => request('PUT', url, headers,body);
  const del = (url,headers,body) => request('DELETE', url,headers,body);
  return { loading, error, data, get, post, put, del };
};
export default useApi;
