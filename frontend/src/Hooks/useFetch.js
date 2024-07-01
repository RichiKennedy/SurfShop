import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest"; // Ensure this is your axios instance

const useFetch = (url, withAuth = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const config = withAuth ? { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } : {};
        const res = await makeRequest.get(url, config);
        setData(res.data.data);
      } catch (err) {
        console.error('Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, withAuth]);

  return { data, loading, error };
};

export default useFetch;
